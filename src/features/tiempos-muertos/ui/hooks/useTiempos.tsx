import { useEffect, useMemo, useState } from "react"
import { socket } from "@/shared/hooks/useConnetion"
import type { ParoTipo } from "../components/CardParo"

export interface TiempoMuertoDto {
  id: number
  maquina: string
  categoria: string
  descripcion: string
  fechaInicioParo: string
  fechaFinParo?: string | null
  enCurso?: boolean
  duracionSegundos?: number
  fechaCreacion?: string
}

export interface ParoUiItem {
  uiId: string
  id: string
  maquina: string
  motivo: string
  tipo: ParoTipo
  inicioEpoch: number
}

const CATEGORIA_TO_TIPO: Record<string, ParoTipo> = {
  mantenimiento: "mantenimiento",
  falla: "falla",
  material: "material",
}

function parseTipo(categoria: string): ParoTipo {
  return CATEGORIA_TO_TIPO[categoria.toLowerCase()] ?? "otro"
}

function toUiItem(dto: TiempoMuertoDto): ParoUiItem {
  const startTime = Date.parse(dto.fechaInicioParo)
  const fallbackStart = Date.now() - (dto.duracionSegundos ?? 0) * 1000
  const inicioEpoch = Number.isNaN(startTime) ? fallbackStart : startTime

  return {
    uiId: String(dto.id),
    id: String(dto.id),
    maquina: dto.maquina,
    motivo: dto.descripcion,
    tipo: parseTipo(dto.categoria),
    inicioEpoch,
  }
}

export function useTiempoMuertoSocket() {
  const [paros, setParos] = useState<ParoUiItem[]>([])

  useEffect(() => {
    if (!socket.connected) socket.connect()

    const onCreado = (data: TiempoMuertoDto) => {
      const isActive = data.enCurso ?? true
      if (!isActive) return

      const nextParo = toUiItem(data)
      setParos((current) => {
        const exists = current.some((paro) => paro.uiId === nextParo.uiId)
        if (exists) {
          return current.map((paro) => (paro.uiId === nextParo.uiId ? nextParo : paro))
        }
        return [nextParo, ...current]
      })
    }

    const onFinalizado = (data: Pick<TiempoMuertoDto, "id">) => {
      const id = String(data.id)
      setParos((current) => current.filter((paro) => paro.uiId !== id))
    }

    socket.on("tiempo-muerto:creado", onCreado)
    socket.on("tiempo-muerto:finalizado", onFinalizado)

    return () => {
      socket.off("tiempo-muerto:creado", onCreado)
      socket.off("tiempo-muerto:finalizado", onFinalizado)
    }
  }, [])

  const removeParo = (uiId: string) => {
    setParos((current) => current.filter((paro) => paro.uiId !== uiId))
  }

  return useMemo(
    () => ({
      paros,
      removeParo,
    }),
    [paros]
  )
}