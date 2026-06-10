import { useMemo } from "react"
import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/app/providers/ThemeProvider" 
import type { TemperaturasDto } from "../../api/features/dto"

/** Para graficar los limites de la tempera */
export interface LineaTemperatura {
  limiteTemperatura?: number
  text: string
}

/**
 * Props del componente {@link GraficaTemperaturas}
 */
type Props = {
  /** Lista de temperaturas provenientes del backend. */
  temperaturas: TemperaturasDto[]

  /** Clases adicionales para personalizar el contenedor raíz. */
  className?: string

  /** Limite de temperatura para linea */
  lineaTemperatura?: LineaTemperatura

  /** Lineas a renderizar de la grafica basado en temperatura1 a temperatura4 */
  series: SeriesConfig[]
}

type ChartRow = {
  hora: string
  temperatura1: number
  temperatura2: number
  temperatura3: number
  temperatura4: number
}

export type SeriesConfig = {
  key: keyof Pick<
    ChartRow,
    "temperatura1" | "temperatura2" | "temperatura3" | "temperatura4"
  >
  name: string
  color: string
}

const numberFormatter = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
})

function normalizeValue(value: string | number | null | undefined) {
  const parsedValue = typeof value === "number" ? value : Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : 0
}

function buildChartData(data: TemperaturasDto[]): ChartRow[] {
  return data.map((item) => ({
    hora: item.hora,
    temperatura1: normalizeValue(item.temperatura1),
    temperatura2: normalizeValue(item.temperatura2),
    temperatura3: normalizeValue(item.temperatura3),
    temperatura4: normalizeValue(item.temperatura4),
  }))
}

/**
 * Tooltip personalizado adaptativo (Light / Dark)
 */
function CustomTooltip({ active, payload, label, isDark }: any) {
  if (!active || !payload?.length) return null

  const colores = {
    fondo: isDark ? "#18181b" : "#ffffff",
    borde: isDark ? "#3f3f46" : "#e4e4e7",
    textoTitulo: isDark ? "#fafafa" : "#18181b",
    textoLabel: isDark ? "#a1a1aa" : "#52525b",
    textoValor: isDark ? "#e4e4e7" : "#18181b",
  }

  return (
    <div
      className="rounded-xl border px-3 py-2 shadow-lg backdrop-blur-sm"
      style={{
        backgroundColor: colores.fondo,
        borderColor: colores.borde,
        boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.3)" : undefined,
      }}
    >
      <p className="text-xs font-semibold" style={{ color: colores.textoTitulo }}>
        {label}
      </p>
      <div className="mt-2 space-y-1">
        {payload
          .filter((entry: any) => typeof entry?.value === "number")
          .map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-2" style={{ color: colores.textoLabel }}>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-semibold" style={{ color: colores.textoValor }}>
                {numberFormatter.format(entry.value)}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}

export function GraficaTemperaturas({
  temperaturas,
  className = "",
  lineaTemperatura = undefined,
  series,
}: Props) {
  const chartData = useMemo(() => buildChartData(temperaturas), [temperaturas])

  // Consumo del Hook de manera idéntica a la gráfica de referencia
  const { theme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Paleta de colores semánticos centralizada
  const colores = {
    bordeCard: isDark ? "rgba(255, 255, 255, 0.08)" : "#e4e4e7",
    fondoCard: isDark ? "#09090b" : "#ffffff",
    cuadricula: isDark ? "#27272a" : "#e4e4e7",
    titulosEjes: isDark ? "#e4e4e7" : "#18181b",
    textoTicks: isDark ? "#a1a1aa" : "#52525b",
    leyenda: isDark ? "#d4d4d8" : "#64748b",
    brushBorder: isDark ? "#3f3f46" : "#9ca3af",
    brushFill: isDark ? "#18181b" : "#f3f4f6",
    puntoInterior: isDark ? "#09090b" : "#ffffff",
    lineaReferencia: isDark ? "#f87171" : "#ef4444", 
  }

  return (
    <Card
      className={`flex h-full min-w-0 w-full flex-col rounded-[1.5rem] border ${className}`.trim()}
      style={{
        backgroundColor: colores.fondoCard,
        borderColor: colores.bordeCard,
        boxShadow: "none",
      }}
    >
      <CardContent className="flex min-h-0 flex-1 min-w-0 px-2 pb-3 pt-4 sm:px-4">
        <div className="h-full min-h-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              key={temperaturas.length}
              data={chartData}
              margin={{ top: 14, right: 18, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colores.cuadricula} vertical />

              <XAxis
                dataKey="hora"
                tick={{ fill: colores.textoTicks, fontSize: 11 }}
                axisLine={{ stroke: colores.cuadricula }}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={18}
                label={{
                  value: "Tiempo",
                  position: "insideBottom",
                  fill: colores.titulosEjes,
                  fontWeight: 700,
                  offset: -12,
                }}
              />

              {lineaTemperatura !== undefined && (
                <ReferenceLine
                  y={lineaTemperatura.limiteTemperatura}
                  stroke={colores.lineaReferencia}
                  strokeDasharray="6 6"
                  strokeWidth={2.5}
                  label={{
                    value: `${lineaTemperatura.text}`,
                    position: "top",
                    offset: 12,
                    fill: colores.lineaReferencia,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                />
              )}

              <YAxis
                tickCount={10}
                tick={{ fill: colores.textoTicks, fontSize: 11 }}
                axisLine={{ stroke: colores.cuadricula }}
                tickLine={false}
                width={42}
                domain={["dataMin - 1", "dataMax + 1"]}
                label={{
                  value: "Grados °C",
                  angle: -90,
                  position: "insideLeft",
                  offset: 4,
                  fill: colores.titulosEjes,
                  fontWeight: 700,
                }}
              />

              <Tooltip
                content={<CustomTooltip isDark={isDark} />}
                cursor={{
                  stroke: isDark ? "#52525b" : "#cbd5e1",
                  strokeOpacity: 0.4,
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                height={30}
                iconType="line"
                wrapperStyle={{ paddingTop: 12, fontSize: 12 }}
                formatter={(value) => (
                  <span style={{ color: colores.leyenda, fontWeight: 500 }}>{value}</span>
                )}
              />

              <Brush
                dataKey="hora"
                height={24}
                travellerWidth={10}
                stroke={colores.brushBorder}
                fill={colores.brushFill}
                tickFormatter={() => ""}
              />

              {series.map((serie) => (
                <Line
                  key={serie.key}
                  type="monotone"
                  dataKey={serie.key}
                  name={serie.name}
                  stroke={serie.color}
                  strokeWidth={2.4}
                  dot={{ r: 2.8, strokeWidth: 1.5, fill: colores.puntoInterior }}
                  activeDot={{ r: 4.8, strokeWidth: 0, fill: serie.color }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}