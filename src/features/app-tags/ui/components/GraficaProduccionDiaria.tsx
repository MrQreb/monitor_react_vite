import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader  } from "@/components/ui/card"
import type { ProduccionDiariaDto } from "../../api/features/dto"
import { SummaryCard } from "./SummaryCard"

/**
 * Props del componente de grafica de produccion diaria.
 */
type Props = {
  /**
   * Datos crudos provenientes del endpoint de produccion diaria por linea.
   */
  datos: ProduccionDiariaDto[]

  /**
   * Clases extra para personalizar el contenedor principal.
   */
  className?: string
}

/**
 * Fila normalizada que consume Recharts.
 */
type ChartRow = {
  /** Codigo de linea productiva (AUT01, IQF02, etc.). */
  linea: string

  /** Total de libras procesadas para la linea. */
  totalCantidad: number

  /** Color asignado a la barra para diferenciacion visual. */
  color: string
}

/**
 * Orden visual esperado de las lineas para que la grafica coincida con la vista de negocio.
 */
const LINE_ORDER = [
  "AUT01",
  "AUT02",
  "AUT03",
  "AUT04",
  "AUT05",
  "AUT06",
  "AUT07",
  "AUT08",
  "AUT09",
  "AUT10",
  "AUT11",
  "AUT12",
  "AUT13",
  "IQF01",
  "IQF02",
  "GRA01",
  "IMPOR",
  "MEZCL",
] as const

/**
 * Paleta de barras inspirada en el dashboard original.
 * Se reutiliza ciclicamente si aparecen mas lineas.
 */
const BAR_COLORS = [
  "#5a8dee",
  "#59c997",
  "#6d7f9f",
  "#f3b620",
  "#6f63e8",
  "#69b7d6",
  "#9065b5",
  "#f1963a",
  "#5f8ee6",
  "#58c997",
  "#6b81a8",
  "#e8b418",
  "#6667e8",
  "#69b5d6",
  "#9363b8",
  "#f19740",
  "#5d88de",
  "#63cba0",
]

/** Formato numerico para tooltips y etiquetas con 1 decimal maximo. */
const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
})

/** Formato numerico entero para totales y eje Y. */
const wholeNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

/**
 * Normaliza un numero para evitar NaN o Infinity dentro de la grafica.
 */
function normalizeNumber(value: number) {
  return Number.isFinite(value) ? value : 0
}

/**
 * Renderiza la grafica de produccion diaria por linea.
 *
 * Incluye:
 * - Resumen agregado de lineas AUTOMATICAS e IQF
 * - Orden de lineas fijo para mantener lectura consistente
 * - Etiquetas por barra y leyenda de total de libras
 */
export function GraficaProduccionDiaria({ datos, className = "" }: Props) {
  /** Normaliza, ordena y colorea los datos para el chart. */
  const chartData = useMemo<ChartRow[]>(() => {
    const normalizedRows = datos
      .map((item) => ({
        linea: item.linea,
        totalCantidad: normalizeNumber(item.totalCantidad),
      }))
      .filter((item) => item.linea)

    // Si llegan repetidos por linea, conserva un unico registro con el mayor total.
    const lineMap = new Map<string, number>()
    for (const row of normalizedRows) {
      const currentValue = lineMap.get(row.linea)
      if (currentValue === undefined || row.totalCantidad > currentValue) {
        lineMap.set(row.linea, row.totalCantidad)
      }
    }

    const withSafeValues = Array.from(lineMap.entries()).map(([linea, totalCantidad]) => ({
      linea,
      totalCantidad,
    }))

    withSafeValues.sort((a, b) => {
      const indexA = LINE_ORDER.indexOf(a.linea as (typeof LINE_ORDER)[number])
      const indexB = LINE_ORDER.indexOf(b.linea as (typeof LINE_ORDER)[number])
      const safeIndexA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA
      const safeIndexB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB

      if (safeIndexA === safeIndexB) {
        return a.linea.localeCompare(b.linea)
      }

      return safeIndexA - safeIndexB
    })

    return withSafeValues.map((item, index) => ({
      ...item,
      color: BAR_COLORS[index % BAR_COLORS.length],
    }))
  }, [datos])

  /** Suma global de lineas automaticas (AUTXX). */
  const totalAutomaticas = useMemo(() => {
    return chartData
      .filter((item) => item.linea.startsWith("AUT"))
      .reduce((acc, item) => acc + item.totalCantidad, 0)
  }, [chartData])

  /** Suma global de lineas IQF (IQFXX). */
  const totalIqf = useMemo(() => {
    return chartData
      .filter((item) => item.linea.startsWith("IQF"))
      .reduce((acc, item) => acc + item.totalCantidad, 0)
  }, [chartData])

  /** Calcula un maximo del eje Y con aire visual arriba de la barra mayor. */
  const yAxisMax = useMemo(() => {
    const maxValue = Math.max(...chartData.map((item) => item.totalCantidad), 0)

    if (maxValue <= 10000) {
      return 12000
    }

    const paddedMax = maxValue * 1.15
    return Math.ceil(paddedMax / 5000) * 5000
  }, [chartData])

  /**
   * Reemplaza el uso de `Cell` (deprecado) para pintar cada barra con su color.
   */
  const renderBarShape = (props: any) => {
    const row = props?.payload as ChartRow | undefined
    return (
      <Rectangle
        {...props}
        fill={row?.color ?? "#5a8dee"}
        radius={[10, 10, 0, 0]}
      />
    )
  }

  return (
    <Card
      className={`flex h-full min-w-0 w-full flex-col rounded-[1.2rem] border border-zinc-300/90 bg-linear-to-b from-zinc-100 to-zinc-200/75 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.55)] ${className}`.trim()}
    >
      <CardHeader className="space-y-3 pb-2 pt-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <SummaryCard
            title="AUTOMATICAS"
            amount={totalAutomaticas}
            accentColor="#2f6df6"
            glowColor="rgba(47,109,246,0.22)"
          />
          <SummaryCard
            title="IQF"
            amount={totalIqf}
            accentColor="#20bf8f"
            glowColor="rgba(32,191,143,0.22)"
          />
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 min-w-0 flex-1 px-3 pb-3 pt-1">
        <div className="h-full min-h-115 w-full rounded-2xl border border-zinc-200 bg-white/90 px-2 pb-1 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_36px_-30px_rgba(15,23,42,0.35)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 18, right: 14, left: 8, bottom: 24 }} barCategoryGap="24%">
              <CartesianGrid strokeDasharray="3 3" stroke="#d6dae1" vertical={false} />

              <XAxis
                dataKey="linea"
                tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: "#9aa3b2" }}
                interval={0}
              />

              <YAxis
                tick={{ fill: "#475569", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#9aa3b2" }}
                width={68}
                domain={[0, yAxisMax]}
                tickFormatter={(value: number) => wholeNumberFormatter.format(value)}
                label={{
                  value: "Libras",
                  angle: -90,
                  position: "insideLeft",
                  offset: 2,
                  fill: "#111827",
                  fontWeight: 700,
                }}
              />

              <Tooltip
                formatter={(value) => [numberFormatter.format(Number(value ?? 0)), "Total"]}
                cursor={{ fill: "rgba(15, 23, 42, 0.05)" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #d6dbe3",
                  background: "rgba(255,255,255,0.96)",
                  boxShadow: "0 12px 22px -14px rgba(15,23,42,0.45)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ color: "#374151", fontWeight: 700, paddingTop: "4px" }}
              />

              <Bar
                dataKey="totalCantidad"
                name="Total de libras"
                radius={[10, 10, 0, 0]}
                maxBarSize={62}
                animationDuration={700}
                shape={renderBarShape}
              >
                <LabelList
                  dataKey="totalCantidad"
                  position="top"
                  fill="#111827"
                  fontSize={11}
                  fontWeight={700}
                  formatter={(value) => numberFormatter.format(Number(value ?? 0))}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
