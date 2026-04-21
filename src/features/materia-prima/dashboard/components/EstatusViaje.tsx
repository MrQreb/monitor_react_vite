import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type ViajeEstatus = {
  producto: string
  folio: string
  status_embarque: string
  ticket: string
  fecha_alta: string
  hora_alta: string
  hora_evaluacion: string
  hora_impresion: string
  centro_corte: string
  fecha_envio: string | null
  fecha_evaluador: string
  hora_pesaje: string
  rancho: string
  estatus: string
}

type Props = {
  viajes: ViajeEstatus[]
}

const emptyCell = (value: string | null | undefined) => value?.trim() || ""

export function EStatusDeViaje({ viajes }: Props) {
  return (
    <Card className="rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-[1.15rem] font-extrabold text-cyan-700">
          Estatus de viajes
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0 pt-0">
        <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,.75fr)_82px_82px_82px] border-b border-slate-300 px-5 pb-2 text-center text-lg text-slate-600">
          <span>Rancho</span>
          <span>Producto</span>
          <span>Estatus / Folio</span>
          <span>Centro</span>
          <span>Hora Pes</span>
          <span>Hora Eva</span>
          <span>Hora Imp</span>
        </div>

        <ScrollArea className="h-[310px]">
          <div className="space-y-10 px-4 py-5">
            {viajes.map((viaje, index) => (
              <div
                key={`${viaje.rancho}-${viaje.ticket}-${index}`}
                className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,.75fr)_82px_82px_82px] items-start gap-4 text-[1.02rem] text-cyan-700"
              >
                <div className="whitespace-normal text-left leading-tight">
                  {viaje.rancho}
                </div>

                <div className="whitespace-normal text-left leading-tight">
                  {viaje.producto}
                </div>

                <div className="flex flex-col items-center gap-3 text-center leading-tight">
                  <span>{viaje.estatus}</span>
                  <span className="text-xl font-bold">{emptyCell(viaje.folio)}</span>
                </div>

                <div className="whitespace-normal text-center leading-tight">
                  {emptyCell(viaje.centro_corte)}
                </div>

                <div className="text-center text-lg leading-tight">
                  {emptyCell(viaje.hora_pesaje)}
                </div>

                <div className="text-center text-lg leading-tight">{emptyCell(viaje.hora_evaluacion)}</div>

                <div className="text-center text-lg leading-tight">{emptyCell(viaje.hora_impresion)}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}