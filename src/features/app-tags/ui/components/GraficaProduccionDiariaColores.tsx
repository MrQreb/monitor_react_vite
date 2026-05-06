import { useMemo, useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ProduccionDiariaDto } from "../../api/features/dto"
import { colores, MAQUINAS } from '../data/MAQUINAS';
import { GoalCard } from './GoalCard';

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


/** Obtiene la hora actual */
const getHora = (): number => {
  const now = new Date();
  return now.getHours();
}

/**
 * Renderiza la grafica de produccion diaria por linea, por colores en base al numero de libras producidas.
 * Los colores se determinan en base a un documento pasado.
 *
 * Incluye:
 * - Resumen agregado de lineas AUTOMATICAS e IQF
 * - Orden de lineas fijo para mantener lectura consistente
 * - Etiquetas por barra y leyenda de total de libras
 */
export function GraficaProduccionDiariaColores({ datos, className = "" }: Props) {
  const [horaActual, setHoraActual] = useState<number>();
  useEffect(() => {
    // console.log('log cada que se jalan los datos')
    // console.table(datos);
    setHoraActual(getHora());
  }, [datos,])

  /** Verifica los horarios de los turnos para los colores */
  const esTurnoValido = (hora: number) => {
    return (hora >= 4 && hora <= 11) || (hora >= 12 && hora <= 19);
  };


  /**
 * Obtiene el valor esperado (presupuesto, objetivo y gol)
 * para una maquina en base a la hora actual.
 *
 * @param linea - Codigo de la linea (AUT01, MEZCL, etc.)
 * @param hora - Hora actual en formato 24h
 *
 * @returns El registro mas cercano menor o igual a la hora actual.
 *
 * @example
 * getEsperado("AUT01", 9)
 * // retorna valores de las 9:00
 */
  const getEsperado = (linea: string, hora: number) => {

    if (!esTurnoValido(hora)) return undefined;

    const maquina = MAQUINAS[linea];
    if (!maquina) return undefined;

    return maquina.datos
      .filter(d => d.hora <= hora)
      .sort((a, b) => b.hora - a.hora)[0];
  };

  /**
   * Determina el color de la barra en base al cumplimiento de produccion.
   *
   * Reglas:
   * - < presupuesto → Amarillo
   * - < objetivo → Azul
   * - >= objetivo → Verde
   *
   * @param linea - Codigo de la linea productiva
   * @param produccionReal - Produccion acumulada actual
   *
   * @returns Color hexadecimal correspondiente
   *
   * @remarks
   * Esta funcion depende de la hora actual (`horaActual`)
   * y de la tabla de produccion esperada (`MAQUINAS`).
   */
  const verficarColor = (linea: string, produccionReal: number): string => {
    if (horaActual === undefined) return colores.default;

    const esperado = getEsperado(linea, horaActual);
    if (!esperado) return colores.default;

    if (produccionReal < esperado.presupuesto) return colores.presupuesto;
    if (produccionReal < esperado.objetivo) return colores.objetivo;

    return colores.goal;
  };


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

    return withSafeValues.map((item) => ({
      ...item,
      color: verficarColor(item.linea, item.totalCantidad),
    }))
  }, [datos,horaActual])

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

        {/* Tarjeta de los significados de los colores */}
        <div className="grid grid-cols-1 gap-2 ">
          <GoalCard />
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
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
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
