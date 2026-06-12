import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTheme } from "@/app/providers/ThemeProvider"
import { cn } from "@/lib/utils"
import type { ComparativaCajasResponse } from "../../api/shared/queries/responses/comparatovaCajasResponse";

type Props = {
  cajas: ComparativaCajasResponse[]
}

/** Grafica de barras para la comparacionde las cajas que llegaron, vs las cajas recibidas
 * @param cajas - ComparativaCajasResponse[]
 * @returns Tsx component
 */
export function GraficaCajasV2({ cajas }: Props) {


  const { theme } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const valorMaximo =
    cajas.length > 0
      ? Math.max(
        ...cajas.flatMap((caja) => [
          caja.cajasEstimadas,
          caja.cajasReales,
        ])
      )
      : 100

  const colores = {
    titulo: isDark ? "#e4e4e7" : "#18181b",

    cuadricula: isDark ? "#27272a" : "#e4e4e7",

    texto: isDark ? "#a1a1aa" : "#52525b",

    etiqueta: isDark ? "#fafafa" : "#18181b",

    tooltipFondo: isDark ? "#18181b" : "#ffffff",

    tooltipBorde: isDark ? "#3f3f46" : "#e4e4e7",

    leyenda: isDark ? "#d4d4d8" : "#64748b",

    estimado: isDark ? "#60a5fa" : "#2563eb",

    real: isDark ? "#34d399" : "#059669",
  }

  return (
    <Card
      className={cn(
        "flex h-full w-full min-w-0 flex-col",
        "rounded-3xl",
        "border border-border/20"
      )}
    >
      <CardHeader className="pb-0 pt-4">
        <CardTitle
          className="text-center text-base font-bold"
          style={{ color: colores.titulo }}
        >
          Estimado y Real
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 px-3 pb-4 pt-0">
        <div className="h-full min-h-0 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={cajas}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 10,
              }}
              barCategoryGap="18%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke={colores.cuadricula}
              />

              <XAxis
                dataKey="producto"
                interval={0}
                tick={{
                  fill: colores.texto,
                  fontSize: 15,
                }}
                tickLine={false}
                axisLine={{
                  stroke: colores.cuadricula,
                }}
              />

              <YAxis
                domain={[
                  0,
                  Math.ceil(valorMaximo * 1.15),
                ]}
                tick={{
                  fill: colores.texto,
                  fontSize: 15,
                }}
                tickLine={false}
                axisLine={{
                  stroke: colores.cuadricula,
                }}
              />

              <Tooltip
                cursor={{
                  fill: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.04)",
                }}
                contentStyle={{
                  backgroundColor:
                    colores.tooltipFondo,
                  border: `1px solid ${colores.tooltipBorde}`,
                  borderRadius: "12px",
                  color: colores.texto,
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={32}
                formatter={(value) => (
                  <span
                    style={{
                      color: colores.leyenda,
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </span>
                )}
              />

              <Bar
                dataKey="cajasEstimadas"
                name="Estimado"
                fill={colores.estimado}
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="cajasEstimadas"
                  position="top"
                  fill={colores.etiqueta}
                  fontSize={15}
                  fontWeight={600}
                  formatter={(value) =>
                    quantityFormatter(Number(value ?? 0))
                  }
                />
              </Bar>

              <Bar
                dataKey="cajasReales"
                name="Real"
                fill={colores.real}
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="cajasReales"
                  position="top"
                  fill={colores.etiqueta}
                  fontSize={15}
                  fontWeight={600}
                  formatter={(value) =>
                    quantityFormatter(Number(value ?? 0))
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}


/** Permite  formatear las cantidades con formato por separación de  comillas.
 * @param quantity:number
 * @example 1000 => 1,000.
 */
const quantityFormatter = (quantity: number) => quantity.toLocaleString("en-US");
