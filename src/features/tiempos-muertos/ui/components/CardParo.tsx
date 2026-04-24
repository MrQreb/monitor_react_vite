import { useEffect, useMemo, useState } from "react"
import type { ElementType } from "react"
import { AlertTriangle, Clock, Package, Trash2, Wrench, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/**
 * Estado visual del paro según el tiempo transcurrido.
 */
export type ParoStatus = "critico" | "advertencia" | "normal" | "resuelto"

/**
 * Categoría del paro.
 */
export type ParoTipo = "mantenimiento" | "falla" | "material" | "otro"

/**
 * Propiedades de la tarjeta de paro.
 */
export interface CardParoProps {
  /**
   * Identificador único del paro.
   */
  id: string
  /**
   * Nombre de la máquina.
   */
  maquina: string
  /**
   * Motivo o descripción del paro.
   */
  motivo: string
  /**
   * Tipo de paro para icono y etiqueta.
   * @defaultValue "otro"
   */
  tipo?: ParoTipo
  /**
   * Momento de inicio del paro en milisegundos (epoch).
   */
  inicioEpoch: number
  /**
   * Clases adicionales para personalizar el contenedor.
   */
  className?: string
  /**
   * Callback para eliminar la tarjeta desde el componente padre.
   */
  onDelete?: () => void
}

type TipoVisualConfig = {
  label: string
  Icon: ElementType
}

/**
 * Configuración de etiqueta e icono por tipo de paro.
 */
const TIPO_CONFIG: Record<ParoTipo, TipoVisualConfig> = {
  mantenimiento: { label: "Mantenimiento", Icon: Wrench },
  falla: { label: "Falla", Icon: Zap },
  material: { label: "Material", Icon: Package },
  otro: { label: "Otro", Icon: AlertTriangle },
}

const STATUS_NORMAL_MAX_SECONDS = 5 * 60
const STATUS_WARNING_MAX_SECONDS = 30 * 60

/**
 * Calcula el estado del paro en función del tiempo transcurrido.
 */
function getStatus(elapsedSeconds: number): ParoStatus {
  if (elapsedSeconds < STATUS_NORMAL_MAX_SECONDS) return "normal"
  if (elapsedSeconds < STATUS_WARNING_MAX_SECONDS) return "advertencia"
  return "critico"
}

/**
 * Clases del chip de estado.
 */
const STATUS_STYLES: Record<ParoStatus, string> = {
  normal: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  advertencia: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  critico: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  resuelto: "bg-zinc-700/30 border-zinc-600/30 text-zinc-400",
}

/**
 * Clases del punto animado de estado.
 */
const STATUS_DOT_STYLES: Record<ParoStatus, string> = {
  normal: "bg-emerald-400",
  advertencia: "bg-amber-400",
  critico: "bg-rose-400",
  resuelto: "bg-zinc-500",
}

/**
 * Etiquetas de texto para estado.
 */
const STATUS_LABELS: Record<ParoStatus, string> = {
  normal: "En curso",
  advertencia: "Atención",
  critico: "Crítico",
  resuelto: "Resuelto",
}

/**
 * Fondo del icono principal por estado.
 */
const STATUS_ICON_BG: Record<ParoStatus, string> = {
  normal: "bg-emerald-500/20",
  advertencia: "bg-amber-500/20",
  critico: "bg-rose-500/20",
  resuelto: "bg-zinc-700/20",
}

/**
 * Color del contador por estado.
 */
const STATUS_TIMER_TEXT: Record<ParoStatus, string> = {
  normal: "text-emerald-400",
  advertencia: "text-amber-400",
  critico: "text-rose-400",
  resuelto: "text-zinc-400",
}

/**
 * Formatea segundos a HH:mm:ss.
 */
function formatElapsedTime(totalSeconds: number): string {
  const isNegative = totalSeconds < 0
  const absoluteSeconds = Math.abs(totalSeconds)

  const hours = Math.floor(absoluteSeconds / 3600)
  const minutes = Math.floor((absoluteSeconds % 3600) / 60)
  const seconds = absoluteSeconds % 60

  const pad = (value: number) => String(value).padStart(2, "0")
  return `${isNegative ? "-" : ""}${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

/**
 * Tarjeta visual de un paro en máquina con estado dinámico por tiempo.
 */
export function CardParo({
  id,
  maquina,
  motivo,
  tipo = "otro",
  inicioEpoch,
  className,
  onDelete,
}: CardParoProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const updateElapsed = () => {
      const elapsed = Math.floor((Date.now() - inicioEpoch) / 1000)
      setElapsedSeconds(elapsed)
    }

    updateElapsed()
    const intervalId = setInterval(updateElapsed, 1000)

    return () => clearInterval(intervalId)
  }, [inicioEpoch])

  const status = useMemo(() => getStatus(elapsedSeconds), [elapsedSeconds])
  const timeText = useMemo(() => formatElapsedTime(elapsedSeconds), [elapsedSeconds])
  const { Icon, label: tipoLabel } = TIPO_CONFIG[tipo]

  return (
    <Card
      className={cn(
        "relative w-full min-w-55 max-w-70 gap-3 rounded-2xl border bg-zinc-900 p-5 text-sm transition-all duration-300",
        STATUS_STYLES[status],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              STATUS_ICON_BG[status]
            )}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-white">
              {maquina}
            </p>
            <p className="truncate text-xs leading-tight opacity-60">
              {tipoLabel}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wide",
              STATUS_STYLES[status]
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full animate-pulse",
                STATUS_DOT_STYLES[status],
                status === "resuelto" && "animate-none"
              )}
            />
            <span>{STATUS_LABELS[status]}</span>
          </Badge>

          {onDelete ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-zinc-400 hover:bg-zinc-800 hover:text-rose-400"
              aria-label={`Eliminar paro ${id}`}
              title="Eliminar"
              onClick={onDelete}
            >
              <Trash2 className="size-3.5" />
            </Button>
          ) : null}
        </div>
      </div>

      <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
        {motivo}
      </p>

      <Separator className="bg-white/5" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase tracking-widest">Tiempo parado</span>
        </div>

        <span
          className={cn(
            "font-mono text-lg font-bold tracking-tight tabular-nums",
            STATUS_TIMER_TEXT[status]
          )}
        >
          {timeText}
        </span>
      </div>

      <span className="absolute bottom-3 left-5 select-none font-mono text-[9px] text-zinc-700">
        #{id}
      </span>
    </Card>
  )
}
