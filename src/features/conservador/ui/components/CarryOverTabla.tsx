import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAutoScroll } from "@/shared/hooks/useAutoScroll"
import type { CarryOverDto } from "../../api/dto/carry-over-dto"
import { useScrollStore } from "@/shared/store/use-scroll-store"
import { Separator } from '@/components/ui/separator';

type Props = {
  carryOver: CarryOverDto[]
}

type DayColor = "normal" | "warning" | "danger" | "extreme"

const emptyCell = (value: string | null | undefined) => value?.trim() || ""

const calculateDaysDifference = (fecha: string): number => {
  const fechaDate = new Date(fecha)
  const hoy = new Date()

  const fechaSinHora = new Date(fechaDate.getFullYear(), fechaDate.getMonth(), fechaDate.getDate())
  const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  const milisegundos = hoySinHora.getTime() - fechaSinHora.getTime()

  return Math.floor(milisegundos / (1000 * 60 * 60 * 24))
}

const getDayColor = (days: number): DayColor => {
  if (days >= 4) return "extreme"
  if (days >= 3) return "danger"
  if (days >= 2) return "warning"
  return "normal"
}

const getRowColorClasses = (dayColor: DayColor) => {
  switch (dayColor) {
    case "extreme":
      return "bg-red-950 text-white hover:bg-red-900"
    case "danger":
      return "bg-rose-200 text-rose-950 hover:bg-rose-300"
    case "warning":
      return "bg-amber-100 text-amber-950 hover:bg-amber-200"
    default:
      return "bg-transparent text-cyan-700 hover:bg-slate-50"
  }
}

const getCellClasses = (dayColor: DayColor) => {
  const base = "px-4 py-5 text-center text-xs leading-tight whitespace-normal sm:px-5 sm:text-sm lg:text-[1.02rem]"

  switch (dayColor) {
    case "extreme":
      return `${base} font-bold text-white`
    case "danger":
      return `${base} font-medium text-rose-950`
    case "warning":
      return `${base} text-amber-950`
    default:
      return `${base} text-cyan-700`
  }
}

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value)

export function CarryOverTabla({ carryOver }: Props) {

  const scroll = useScrollStore();


  const { containerRef } = useAutoScroll({
    itemCount: carryOver.length,
    msPerItem: 1400,
    enabled: scroll.mode === "auto",
  });

  return (
    <Card className="flex h-full min-w-0 w-full flex-col overflow-hidden rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardContent className="min-h-0 min-w-0 px-0 pb-0 pt-0">
        <div ref={containerRef} className="h-full min-h-0 w-full overflow-y-auto">
          <Table className="table-fixed">
            <TableHeader className="sticky top-0 z-10 bg-white [&_tr]:border-b [&_tr]:border-slate-300">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[16%] border-b border-slate-300 text-center text-sm font-semibold text-cyan-700 sm:text-base lg:text-lg">
                  Folio
                </TableHead>
                <TableHead className="w-[24%] border-b border-slate-300 text-center text-sm font-semibold text-cyan-700 sm:text-base lg:text-lg">
                  Ingrediente
                </TableHead>
                <TableHead className="w-[18%] border-b border-slate-300 text-center text-sm font-semibold text-cyan-700 sm:text-base lg:text-lg">
                  Agricultor
                </TableHead>
                <TableHead className="w-[14%] border-b border-slate-300 text-center text-sm font-semibold text-cyan-700 sm:text-base lg:text-lg">
                  Fecha
                </TableHead>
                <TableHead className="w-[14%] border-b border-slate-300 text-center text-sm font-semibold text-cyan-700 sm:text-base lg:text-lg">
                  CarryOver (Kg)
                </TableHead>
                <TableHead className="w-[14%] border-b border-slate-300 text-center text-sm font-semibold text-cyan-700 sm:text-base lg:text-lg">
                  Kilos Disponibles (Kg)
                </TableHead>
              </TableRow>
            </TableHeader>
            <Separator/ >

            <TableBody>
              {carryOver.map((item) => {
                const diasTranscurridos = calculateDaysDifference(item.fechaCreacion.toString())
                const dayColor = getDayColor(diasTranscurridos)

                return (
                  <TableRow key={item.idGlobal} className={`${getRowColorClasses(dayColor)} border-slate-300 align-top`}>
                    <TableCell className={getCellClasses(dayColor)}>{emptyCell(item.folio)}</TableCell>
                    <TableCell className={getCellClasses(dayColor)}>{emptyCell(item.ingredienteNombre)}</TableCell>
                    <TableCell className={getCellClasses(dayColor)}>{emptyCell(item.agricultor)}</TableCell>
                    <TableCell className={getCellClasses(dayColor)}>
                      {new Date(item.fechaCreacion).toLocaleDateString("es-MX")}
                    </TableCell>
                    <TableCell className={getCellClasses(dayColor)}>{formatNumber(item.kilosTotalesCarryOver)}</TableCell>
                    <TableCell className={getCellClasses(dayColor)}>{formatNumber(item.kilosDisponibles)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
