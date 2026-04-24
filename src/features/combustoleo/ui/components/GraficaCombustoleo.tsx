import { useMemo } from "react"
import {
    Brush,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { CombustoleoDto } from "../../api/features/dto/combustoleo-dto"

type Props = {
    /** Lista de niveles de combustoleo provenientes del backend. */
    datos: CombustoleoDto[]

    /** Clases adicionales para personalizar el contenedor raiz. */
    className?: string
}

type ChartRow = {
    /** Hora de la medicion (eje X). */
    hora: string

    /** Litros de combustoleo. */
    litros: number
}

const numberFormatter = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
})

const yAxisFormatter = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
})

function normalizeValue(value: string | number | null | undefined) {
    const parsedValue = typeof value === "number" ? value : Number(value)
    return Number.isFinite(parsedValue) ? parsedValue : 0
}

function buildChartData(data: CombustoleoDto[]): ChartRow[] {
    return data.map((item) => ({
        hora: item.hora,
        litros: normalizeValue(item.litros),
    }))
}

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

export function GraficaCombustoleo({ datos, className = "" }: Props) {
    const chartData = useMemo(() => buildChartData(datos), [datos])

    const yDomain = useMemo<[number, number]>(() => {
        if (chartData.length === 0) {
            return [0, 100]
        }

        const values = chartData.map((item) => item.litros)
        const min = Math.min(...values)
        const max = Math.max(...values)
        const range = max - min

        // Agrega aire visual arriba y abajo para evitar que la linea quede pegada.
        const padding = Math.max(range * 0.12, 5)
        const lowerBound = Math.max(0, min - padding)
        const upperBound = max + padding

        return [lowerBound, upperBound]
    }, [chartData])

    return (
        <Card
            className={`flex h-full min-w-0 w-full flex-col rounded-[1.5rem] border-0 bg-white shadow-none ${className}`.trim()}
        >
            <CardContent className="flex min-h-0 flex-1 min-w-0 px-2 pb-3 pt-0 sm:px-4">
                <div className="min-h-0 h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            key={datos.length}
                            data={chartData}
                            margin={{ top: 14, right: 18, left: 10, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#d8d8d8" vertical />

                            <XAxis
                                dataKey="hora"
                                tickCount={10}
                                tick={{ fill: "#607080", fontSize: 12 }}
                                axisLine={{ stroke: "#9ca3af" }}
                                tickLine={false}
                                interval="preserveStartEnd"
                                minTickGap={28}
                                label={{
                                    value: "Tiempo",
                                    position: "insideBottom",
                                    fill: "#111827",
                                    fontWeight: 700,
                                }}
                            />

                            <YAxis
                                tickCount={10}
                                tick={{ fill: "#607080", fontSize: 12 }}
                                axisLine={{ stroke: "#9ca3af" }}
                                tickLine={false}
                                width={64}
                                tickFormatter={(value: number) => yAxisFormatter.format(value)}
                                domain={yDomain}
                                label={{
                                    value: "Litros",
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
                                formatter={(value) => <span style={{ color: "#4b5563" }}>{value}</span>}
                            />

                            <Brush
                                dataKey="hora"
                                height={24}
                                travellerWidth={10}
                                stroke="#0f766e"
                                fill="#eff6f6"
                                tickFormatter={() => ""}
                            />

                            <Line
                                type="monotone"
                                dataKey="litros"
                                name="Litros"
                                stroke="#0ea5e9"
                                strokeWidth={2.4}
                                dot={{ r: 2.8, strokeWidth: 1.5, fill: "#ffffff" }}
                                activeDot={{ r: 4.8, strokeWidth: 0 }}
                                isAnimationActive
                                animationDuration={850}
                                animationEasing="ease-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
