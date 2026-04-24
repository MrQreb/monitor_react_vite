import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, Clock, Wrench, Zap, Package } from "lucide-react"

export type ParoStatus = "critico" | "advertencia" | "normal" | "resuelto"
export type ParoTipo = "mantenimiento" | "falla" | "material" | "otro"

export interface CardParoProps {
  id: string
  maquina: string
  motivo: string
  tipo?: ParoTipo
  inicioEpoch: number // timestamp en ms
  className?: string
}

const tipoConfig: Record<
  ParoTipo,
  { label: string; Icon: React.ElementType }
> = {
  mantenimiento: { label: "Mantenimiento", Icon: Wrench },
  falla: { label: "Falla", Icon: Zap },
  material: { label: "Material", Icon: Package },
  otro: { label: "Otro", Icon: AlertTriangle },
}

function getStatus(segundos: number): ParoStatus {
  if (segundos < 60 * 5) return "normal"
  if (segundos < 60 * 30) return "advertencia"
  if (segundos >= 60 * 30) return "critico"
  return "normal"
}

const statusStyles: Record<ParoStatus, string> = {
  normal: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  advertencia: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  critico: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  resuelto: "bg-zinc-700/30 border-zinc-600/30 text-zinc-400",
}

const statusDotStyles: Record<ParoStatus, string> = {
  normal: "bg-emerald-400",
  advertencia: "bg-amber-400",
  critico: "bg-rose-400",
  resuelto: "bg-zinc-500",
}

const statusLabel: Record<ParoStatus, string> = {
  normal: "En curso",
  advertencia: "Atención",
  critico: "Crítico",
  resuelto: "Resuelto",
}

function formatTime(totalSegundos: number): string {
  const esNegativo = totalSegundos < 0
  const abs = Math.abs(totalSegundos)
  const horas = Math.floor(abs / 3600)
  const minutos = Math.floor((abs % 3600) / 60)
  const segundos = abs % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${esNegativo ? "-" : ""}${pad(horas)}:${pad(minutos)}:${pad(segundos)}`
}

export function CardParo({
  id,
  maquina,
  motivo,
  tipo = "otro",
  inicioEpoch,
  className,
}: CardParoProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const tick = () => {
      const diff = Math.floor((Date.now() - inicioEpoch) / 1000)
      setElapsed(diff)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [inicioEpoch])

  const status = getStatus(elapsed)
  const { Icon } = tipoConfig[tipo]
  const timeStr = formatTime(elapsed)

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-2xl border p-5 min-w-[220px] w-full max-w-[280px]",
        "bg-zinc-900 transition-all duration-300",
        statusStyles[status],
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              status === "critico" && "bg-rose-500/20",
              status === "advertencia" && "bg-amber-500/20",
              status === "normal" && "bg-emerald-500/20",
              status === "resuelto" && "bg-zinc-700/20",
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white leading-tight">
              {maquina}
            </p>
            <p className="truncate text-xs opacity-60 leading-tight">
              {tipoConfig[tipo].label}
            </p>
          </div>
        </div>

        {/* Status pill */}
        <div
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1",
            statusStyles[status]
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full animate-pulse",
              statusDotStyles[status],
              status === "resuelto" && "animate-none"
            )}
          />
          <span className="text-[10px] font-medium uppercase tracking-wide">
            {statusLabel[status]}
          </span>
        </div>
      </div>

      {/* Motivo */}
      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
        {motivo}
      </p>

      {/* Divider */}
      <div className="h-px w-full bg-white/5" />

      {/* Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase tracking-widest">Tiempo parado</span>
        </div>
        <span
          className={cn(
            "font-mono text-lg font-bold tracking-tight tabular-nums",
            status === "critico" && "text-rose-400",
            status === "advertencia" && "text-amber-400",
            status === "normal" && "text-emerald-400",
            status === "resuelto" && "text-zinc-400",
          )}
        >
          {timeStr}
        </span>
      </div>

      {/* ID tag */}
      <span className="absolute bottom-3 left-5 text-[9px] font-mono text-zinc-700 select-none">
        #{id}
      </span>
    </div>
  )
}
