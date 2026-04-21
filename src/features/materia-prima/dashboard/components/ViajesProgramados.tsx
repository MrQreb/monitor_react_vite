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
    <Card className="flex h-full min-w-0 w-full flex-col rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-[1.15rem] font-extrabold text-cyan-700">
          Viajes Programados
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 min-w-0 flex-col px-0 pb-0 pt-0">
        <div className="grid min-w-0 grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)_90px] border-b border-slate-300 px-4 pb-2 text-center text-base text-slate-600 sm:px-6 sm:text-lg">
          <span>Rancho</span>
          <span>Producto</span>
          <span>Cajas</span>
        </div>

        <ScrollArea className="min-h-0 flex-1 w-full min-w-0">
          <div className="space-y-4 px-3 py-4 sm:space-y-5 sm:px-4 sm:py-5">
            {viajes.map((viaje, index) => (
              <div
                key={`${viaje.agricultor}-${viaje.producto}-${index}`}
                className="grid min-w-0 grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)_90px] items-center gap-3 px-2 text-center text-sm text-cyan-700 sm:gap-4 sm:text-[1.05rem]"
              >
                <div className="min-w-0 whitespace-normal wrap-break-word text-left leading-tight">
                  {viaje.agricultor}
                </div>
                <div className="min-w-0 wrap-break-word font-medium leading-tight">{viaje.producto}</div>
                <div className="text-center text-lg font-normal leading-tight sm:text-xl">{viaje.cantidad}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}