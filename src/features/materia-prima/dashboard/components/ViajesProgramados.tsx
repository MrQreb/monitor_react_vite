import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ViajeProgramado = {
  agricultor: string
  producto: string
  cantidad: number
}

type Props = {
  viajes: ViajeProgramado[]
}

export function ViajesProgramados({ viajes }: Props) {
  return (
    <Card className="flex h-full min-w-0 w-full flex-col rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-[1.15rem] font-extrabold text-cyan-700">
          Viajes Programados
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 min-w-0 flex-col px-0 pb-0 pt-0">
        <ScrollArea className="min-h-0 flex-1 w-full min-w-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-300 hover:bg-transparent">
                <TableHead className="border-b border-slate-300 text-center text-base font-normal text-slate-600 sm:text-lg">
                  Rancho
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-base font-normal text-slate-600 sm:text-lg">
                  Producto
                </TableHead>
                <TableHead className="border-b border-slate-300 text-center text-base font-normal text-slate-600 sm:text-lg">
                  Cajas
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {viajes.map((viaje, index) => (
                <TableRow key={`${viaje.agricultor}-${viaje.producto}-${index}`} className="border-slate-300 hover:bg-transparent">
                  <TableCell className="px-4 py-4 text-left text-sm leading-tight whitespace-normal wrap-break-word text-cyan-700 sm:px-6 sm:text-[1.05rem]">
                    {viaje.agricultor}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center text-sm font-medium leading-tight whitespace-normal wrap-break-word text-cyan-700 sm:px-6 sm:text-[1.05rem]">
                    {viaje.producto}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center text-lg font-normal leading-tight text-cyan-700 sm:text-xl">
                    {viaje.cantidad}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}