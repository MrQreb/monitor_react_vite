import { useMemo } from "react"
import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ProduccionDiariaHoraDto } from "../../api/features/dto"
import { SummaryCard } from "./SummaryCard"

/**
 * Props del componente {@link GraficaProduccionHora}.
 */
type Props = {
  /**
   * Datos crudos de produccion por hora provenientes del backend.
   */
  datos: ProduccionDiariaHoraDto[]

  /**
   * Clases adicionales para personalizar el contenedor principal.
   */
  className?: string
}

/**
 * Fila transformada para renderizar la grafica por hora.
 */
type ChartRow = {
  /** Hora del dia. */
  hora: number

  /** Total de libras agrupadas en lineas automaticas (AUT) para esa hora. */
  aut: number

  /** Total de libras agrupadas en lineas IQF para esa hora. */
  iqf: number
}

/**
 * Tipado minimo para el tooltip personalizado de Recharts.
 */
type TooltipProps = {
  /** Indica si el tooltip esta activo. */
  active?: boolean

  /** Valores de las series para el punto actualmente enfocado. */
  payload?: Array<{ name?: string; value?: number; color?: string }>

  /** Valor del eje X del punto activo. */
  label?: number
}

/**
 * Formateador entero para mostrar libras en ejes, tarjetas y tooltip.
 */
const wholeNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

/**
 * Normaliza un numero para evitar NaN/Infinity en los calculos de la grafica.
 *
 * @param value Numero a validar.
 * @returns Numero valido o `0` si no es finito.
 */
function normalizeNumber(value: number) {
  return Number.isFinite(value) ? value : 0
}

/**
 * Formatea valores en notacion compacta para labels encima de los puntos.
 *
 * Ejemplos: `980`, `4.2 k`, `17 k`.
 *
 * @param value Valor numerico a formatear.
 * @returns Cadena compacta amigable para UI.
 */
function formatCompact(value: number) {
  if (Math.abs(value) < 1000) {
    return wholeNumberFormatter.format(Math.round(value))
  }

  const compact = value / 1000
  const decimals = Math.abs(compact) >= 10 ? 0 : 1
  return `${compact.toFixed(decimals)} k`
}

/**
 * Tooltip visual de la grafica de produccion por hora.
 *
 * @param props Props internas de Recharts para tooltips.
 * @returns Tooltip JSX o `null` cuando no hay estado activo.
 */
function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.45)] backdrop-blur-sm">
      <p className="text-xs font-semibold text-slate-600">Hora {label}</p>
      <div className="mt-1.5 space-y-1">
        {payload.map((entry, index) => (
          <div key={`${entry.name}-${index}`} className="flex items-center justify-between gap-5 text-xs">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-semibold text-slate-900">
              {wholeNumberFormatter.format(Math.round(Number(entry.value ?? 0)))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Grafica de lineas para produccion por hora (AUT vs IQF).
 *
 * Responsabilidades principales:
 * - Agrupar registros por hora.
 * - Calcular totales por bloque (AUT e IQF).
 * - Mostrar evolucion horaria y resumen superior.
 *
 * @param props Props del componente.
 * @returns Componente JSX listo para dashboard.
 */
export function GraficaProduccionHora({ datos, className = "" }: Props) {
  /**
   * Normaliza registros del backend y los agrega por hora.
   */
  const chartData = useMemo<ChartRow[]>(() => {
    const rows = datos
      .map((item) => ({
        linea: item.linea,
        hora: normalizeNumber(item.hora),
        totalCantidad: normalizeNumber(item.totalCantidad),
      }))
      .filter((item) => item.hora >= 0 && item.linea)

    const hourMap = new Map<number, { aut: number; iqf: number }>()

    for (const row of rows) {
      const current = hourMap.get(row.hora) ?? { aut: 0, iqf: 0 }

      if (row.linea.startsWith("AUT")) {
        current.aut += row.totalCantidad
      }

      if (row.linea.startsWith("IQF")) {
        current.iqf += row.totalCantidad
      }

      hourMap.set(row.hora, current)
    }

    return Array.from(hourMap.entries())
      .map(([hora, totals]) => ({
        hora,
        aut: totals.aut,
        iqf: totals.iqf,
      }))
      .sort((a, b) => a.hora - b.hora)
  }, [datos])

  /** Total acumulado de lineas automaticas en el periodo visible. */
  const totalAutomaticas = useMemo(
    () => chartData.reduce((acc, row) => acc + row.aut, 0),
    [chartData],
  )

  /** Total acumulado de lineas IQF en el periodo visible. */
  const totalIqf = useMemo(
    () => chartData.reduce((acc, row) => acc + row.iqf, 0),
    [chartData],
  )

  /**
   * Limite superior del eje Y con padding para mejorar lectura visual.
   */
  const yAxisMax = useMemo(() => {
    const maxValue = Math.max(
      ...chartData.flatMap((row) => [row.aut, row.iqf]),
      0,
    )

    if (maxValue <= 10000) {
      return 12000
    }

    const paddedMax = maxValue * 1.2
    return Math.ceil(paddedMax / 5000) * 5000
  }, [chartData])

  return (
    <Card
      className={`flex h-full min-w-0 w-full flex-col rounded-[1.2rem] border border-zinc-300/90 bg-linear-to-b from-zinc-100 to-zinc-200/75 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.55)] ${className}`.trim()}
    >
      <CardHeader className="space-y-3 pb-2 pt-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <SummaryCard
            title="AUTOMATICAS"
            amount={totalAutomaticas}
            accentColor="#167c2d"
            glowColor="rgba(22,124,45,0.22)"
          />
          <SummaryCard
            title="IQF"
            amount={totalIqf}
            accentColor="#f97316"
            glowColor="rgba(249,115,22,0.22)"
          />
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 min-w-0 flex-1 px-3 pb-3 pt-1">
        <div className="relative h-full min-h-115 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-b from-white to-zinc-50/80 px-2 pb-1 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_36px_-30px_rgba(15,23,42,0.35)]">
          <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-14 h-32 w-32 rounded-full bg-orange-100/60 blur-3xl" />

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 18, right: 14, left: 8, bottom: 24 }}>
              <defs>
                <linearGradient id="autLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1b7f2a" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#1b7f2a" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="iqfLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#d6dae1" vertical={false} />

              <XAxis
                dataKey="hora"
                tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: "#9aa3b2" }}
                interval={0}
                label={{
                  value: "Hora",
                  position: "insideBottom",
                  offset: -10,
                  fill: "#111827",
                  fontWeight: 700,
                }}
              />

              <YAxis
                tick={{ fill: "#475569", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#9aa3b2" }}
                width={68}
                domain={[0, yAxisMax]}
                tickFormatter={(value: number) => wholeNumberFormatter.format(value)}
                label={{
                  value: "libras",
                  angle: -90,
                  position: "insideLeft",
                  offset: 2,
                  fill: "#111827",
                  fontWeight: 700,
                }}
              />

              <Tooltip
                cursor={{ stroke: "#64748b", strokeOpacity: 0.25 }}
                content={<CustomTooltip />}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ color: "#374151", fontWeight: 700, paddingTop: "8px" }}
              />

              <Line
                type="monotone"
                dataKey="aut"
                name="AUT"
                stroke="url(#autLineGradient)"
                strokeWidth={2.8}
                dot={{ r: 3.8, fill: "#ffffff", stroke: "#1b7f2a", strokeWidth: 2 }}
                activeDot={{ r: 5.8, strokeWidth: 0, fill: "#1b7f2a" }}
                isAnimationActive
                animationDuration={800}
                animationEasing="ease-out"
              >
                <LabelList
                  dataKey="aut"
                  position="top"
                  fill="#166534"
                  fontSize={18}
                  fontWeight={600}
                  offset={10}
                  formatter={(value) => formatCompact(Number(value ?? 0))}
                />
              </Line>

              <Line
                type="monotone"
                dataKey="iqf"
                name="IQF"
                stroke="url(#iqfLineGradient)"
                strokeWidth={2.8}
                dot={{ r: 3.8, fill: "#ffffff", stroke: "#f97316", strokeWidth: 2 }}
                activeDot={{ r: 5.8, strokeWidth: 0, fill: "#f97316" }}
                isAnimationActive
                animationBegin={180}
                animationDuration={900}
                animationEasing="ease-out"
              >
                <LabelList
                  dataKey="iqf"
                  position="top"
                  fill="#c2410c"
                  fontSize={18}
                  fontWeight={600}
                  offset={10}
                  formatter={(value) => formatCompact(Number(value ?? 0))}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
