import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    <Card className="rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-[1.15rem] font-extrabold text-cyan-700">
          Viajes Programados
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0 pt-0">
        <div className="grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_110px] border-b border-slate-300 px-6 pb-2 text-center text-lg text-slate-600">
          <span>Rancho</span>
          <span>Producto</span>
          <span>Cajas</span>
        </div>

        <ScrollArea className="h-[220px]">
          <div className="space-y-7 px-4 py-6">
            {viajes.map((viaje, index) => (
              <div
                key={`${viaje.agricultor}-${viaje.producto}-${index}`}
                className="grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_110px] items-center gap-4 px-2 text-center text-[1.08rem] text-cyan-700"
              >
                <div className="whitespace-normal text-left leading-tight">
                  {viaje.agricultor}
                </div>
                <div className="font-medium leading-tight">{viaje.producto}</div>
                <div className="text-xl font-normal leading-tight">{viaje.cantidad}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}