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
import type { TemperaturasDto } from "../../api/features/dto"

/**
 * Props del componente {@link GraficaTemperaturas}
 */
type Props = {
  /**
   * Lista de temperaturas provenientes del backend.
   *
   * Cada elemento representa una medición en el tiempo.
   */
  temperaturas: TemperaturasDto[]

  /**
   * Clases adicionales para personalizar el contenedor raíz.
   */
  className?: string

  /**
   * Limite de temperatura para linea
   */
  limiteTemperatura?: number;
}

/**
 * Representa una fila normalizada para la gráfica.
 */
type ChartRow = {
  /** Hora de la medición (eje X) */
  hora: string

  /** Temperatura en aire de descarga */
  temperatura1: number

  /** Temperatura en aire de entrada */
  temperatura2: number

  /** Temperatura en punto medio */
  temperatura3: number

  /** Temperatura de succión */
  temperatura4: number
}

/**
 * Configuración de cada serie de la gráfica.
 */
type SeriesConfig = {
  /**
   * Clave del dato en {@link ChartRow}
   */
  key: keyof Pick<
    ChartRow,
    "temperatura1" | "temperatura2" | "temperatura3" | "temperatura4"
  >

  /**
   * Nombre visible en la leyenda
   */
  name: string

  /**
   * Color de la línea en la gráfica
   */
  color: string
}

/**
 * Configuración de las series que se renderizan en la gráfica.
 */
const series: SeriesConfig[] = [
  { key: "temperatura1", name: "Aire en Descarga", color: "#f4c95d" },
  { key: "temperatura2", name: "Aire en Entrada", color: "#f97355" },
  { key: "temperatura3", name: "Aire en Punto Medio", color: "#2ea8a0" },
  { key: "temperatura4", name: "Succion", color: "#607d8b" },
]

/**
 * Formateador numérico para mostrar temperaturas.
 */
const numberFormatter = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
})

/**
 * Normaliza un valor a número válido.
 *
 * @param value - Valor a convertir (string, number, null o undefined)
 * @returns Número válido o `0` si no es convertible
 */
function normalizeValue(value: string | number | null | undefined) {
  const parsedValue = typeof value === "number" ? value : Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : 0
}

/**
 * Transforma los datos crudos del backend en un formato consumible por la gráfica.
 *
 * @param data - Lista de temperaturas del backend
 * @returns Datos normalizados para la gráfica
 */
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
 * Tooltip personalizado para la gráfica.
 *
 * Muestra los valores de cada serie en el punto seleccionado.
 *
 * @param props - Props internas de Recharts
 * @returns Componente JSX o null si no está activo
 */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-semibold text-slate-600">{label}</p>
      <div className="mt-2 space-y-1">
        {payload
          .filter((entry: any) => typeof entry?.value === "number")
          .map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-semibold text-slate-800">
                {numberFormatter.format(entry.value)}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}

/**
 * GraficaTemperaturas
 *
 * Componente que renderiza una gráfica de líneas con múltiples series
 * de temperatura a lo largo del tiempo.
 *
 *
 * ### Uso:
 * ```tsx
 * <GraficaTemperaturas temperaturas={data} />
 * ```
 *
 * @param props - {@link Props}
 * @returns Componente JSX con la gráfica renderizada
 */
export function GraficaTemperaturas({
  temperaturas,
  className = "",
  limiteTemperatura
}: Props) {

  /**
   * Memoización de los datos transformados para evitar recalculos innecesarios.
   */
  const chartData = useMemo(
    () => buildChartData(temperaturas),
    [temperaturas]
  )

  return (
    <Card className={`flex h-full min-w-0 w-full flex-col rounded-[1.5rem] border-0 bg-white shadow-none ${className}`.trim()}>
      <CardContent className="flex min-h-0 flex-1 min-w-0 px-2 pb-3 pt-0 sm:px-4">
        <div className="min-h-0 h-full w-full">
          <ResponsiveContainer width="100%" height="100%">

            <LineChart
              key={temperaturas.length}
              data={chartData}
              margin={{ top: 14, right: 18, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d8d8d8" vertical />

              <XAxis
                dataKey="hora"
                tick={{ fill: "#607080", fontSize: 11 }}
                axisLine={{ stroke: "#9ca3af" }}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={18}
                label={{
                  value: "Tiempo",
                  position: "insideBottom",
                  fill: "#111827",
                  fontWeight: 700,
                }}
              />

              {limiteTemperatura !== undefined && (
                <ReferenceLine
                  y={limiteTemperatura}
                  stroke="#ef4444"
                  strokeDasharray="6 6"
                  strokeWidth={3}
                  label={{
                    value: `Límite (${limiteTemperatura}°C)`,
                    position: "top", 
                    offset: 12,        
                    fill: "#ef4444",
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                />
              )}

              <YAxis
                tick={{ fill: "#607080", fontSize: 11 }}
                axisLine={{ stroke: "#9ca3af" }}
                tickLine={false}
                width={42}
                domain={["dataMin - 1", "dataMax + 1"]}
                label={{
                  value: "Grados °C",
                  angle: -90,
                  position: "insideLeft",
                  offset: 4,
                  fill: "#111827",
                  fontWeight: 700,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#2ea8a0", strokeOpacity: 0.12 }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                height={30}
                iconType="line"
                wrapperStyle={{ paddingTop: 8, fontSize: 12 }}
                formatter={(value) => (
                  <span style={{ color: "#4b5563" }}>{value}</span>
                )}
              />

              <Brush
                dataKey="hora"
                height={24}
                travellerWidth={10}
                stroke="#0f766e"
                fill="#eff6f6"
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
                  dot={{ r: 2.8, strokeWidth: 1.5, fill: "#ffffff" }}
                  activeDot={{ r: 4.8, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}