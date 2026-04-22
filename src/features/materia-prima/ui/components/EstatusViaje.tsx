import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ViajeEstatusDto } from "../../api/features/dto"
import { useAutoScroll } from "@/shared/hooks/useAutoScroll"



type Props = {
  viajes: ViajeEstatusDto[]
}

const emptyCell = (value: string | null | undefined) => value?.trim() || ""


export function EstatusViaje({ viajes }: Props) {

  const { containerRef } = useAutoScroll({
    itemCount: viajes.length,
    msPerItem: 700, // ajusta velocidad
  });


  return (
    <Card className="flex h-full min-w-0 w-full flex-col rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-[1.15rem] font-extrabold text-cyan-700">
          Estatus de viajes
        </CardTitle>
      </CardHeader>

      <CardContent className="min-w-0 px-0 pb-0 pt-0">
        <ScrollArea className="h-77.5 w-full min-w-0">
          
          <Table>
            <TableHeader className="[&_tr]:sticky [&_tr]:top-0 [&_tr]:z-10 [&_tr]:bg-white">
              <TableRow className="border-slate-300 hover:bg-transparent">
                <TableHead className="border-b border-slate-300 text-center text-sm font-normal text-slate-600 sm:text-base lg:text-lg">
                  Rancho
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-sm font-normal text-slate-600 sm:text-base lg:text-lg">
                  Producto
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-sm font-normal text-slate-600 sm:text-base lg:text-lg">
                  Estatus / Folio
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-sm font-normal text-slate-600 sm:text-base lg:text-lg">
                  Centro
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-sm font-normal text-slate-600 sm:text-base lg:text-lg">
                  Hora Pes
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-sm font-normal text-slate-600 sm:text-base lg:text-lg">
                  Hora Eva
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-sm font-normal text-slate-600 sm:text-base lg:text-lg">
                  Hora Imp
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {viajes?.map((viaje, index) => (
                <TableRow key={`${viaje.rancho}-${viaje.ticket}-${index}`} className="border-slate-300 hover:bg-transparent align-top">
                  <TableCell className="px-4 py-5 text-left text-xs leading-tight whitespace-normal wrap-break-word text-cyan-700 sm:px-5 sm:text-sm lg:text-[1.02rem]">
                    {viaje.rancho}
                  </TableCell>

                  <TableCell className="px-4 py-5 text-left text-xs leading-tight whitespace-normal wrap-break-word text-cyan-700 sm:px-5 sm:text-sm lg:text-[1.02rem]">
                    {viaje.producto}
                  </TableCell>

                  <TableCell className="px-4 py-5 text-center text-xs leading-tight text-cyan-700 sm:px-5 sm:text-sm lg:text-[1.02rem]">
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                      <span>{viaje.estatus}</span>
                      <span className="text-base font-bold sm:text-xl">{emptyCell(viaje.folio)}</span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-5 text-center text-xs leading-tight whitespace-normal text-cyan-700 sm:px-5 sm:text-sm lg:text-[1.02rem]">
                    {emptyCell(viaje.centro_corte)}
                  </TableCell>

                  <TableCell className="px-4 py-5 text-center text-sm leading-tight text-cyan-700 sm:text-lg">
                    {emptyCell(viaje.hora_pesaje)}
                  </TableCell>

                  <TableCell className="px-4 py-5 text-center text-sm leading-tight text-cyan-700 sm:text-lg">
                    {emptyCell(viaje.hora_evaluacion)}
                  </TableCell>

                  <TableCell className="px-4 py-5 text-center text-sm leading-tight text-cyan-700 sm:text-lg">
                    {emptyCell(viaje.hora_impresion)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}