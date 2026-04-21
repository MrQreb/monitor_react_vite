import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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

export function EstatusViaje({ viajes }: Props) {
  return (
    <Card className="flex h-full min-w-0 w-full flex-col rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-[1.15rem] font-extrabold text-cyan-700">
          Estatus de viajes
        </CardTitle>
      </CardHeader>

      <CardContent className="min-w-0 px-0 pb-0 pt-0">
        <div className="grid min-w-0 grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,.8fr)_72px_72px_72px] border-b border-slate-300 px-4 pb-2 text-center text-sm text-slate-600 sm:px-5 sm:text-base lg:text-lg">
          <span>Rancho</span>
          <span>Producto</span>
          <span>Estatus / Folio</span>
          <span>Centro</span>
          <span>Hora Pes</span>
          <span>Hora Eva</span>
          <span>Hora Imp</span>
        </div>

        <ScrollArea className="h-77.5 w-full min-w-0">
          <div className="space-y-8 px-3 py-5 sm:space-y-10 sm:px-4">
            {viajes.map((viaje, index) => (
              <div
                key={`${viaje.rancho}-${viaje.ticket}-${index}`}
                className="grid min-w-0 grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,.8fr)_72px_72px_72px] items-start gap-2 text-xs text-cyan-700 sm:gap-4 sm:text-sm lg:text-[1.02rem]"
              >
                <div className="min-w-0 whitespace-normal wrap-break-word text-left leading-tight">
                  {viaje.rancho}
                </div>

                <div className="min-w-0 whitespace-normal wrap-break-word text-left leading-tight">
                  {viaje.producto}
                </div>

                <div className="flex min-w-0 flex-col items-center gap-2 text-center leading-tight sm:gap-3">
                  <span>{viaje.estatus}</span>
                  <span className="text-base font-bold sm:text-xl">{emptyCell(viaje.folio)}</span>
                </div>

                <div className="min-w-0 whitespace-normal text-center leading-tight">
                  {emptyCell(viaje.centro_corte)}
                </div>

                <div className="text-center text-sm leading-tight sm:text-lg">
                  {emptyCell(viaje.hora_pesaje)}
                </div>

                <div className="text-center text-sm leading-tight sm:text-lg">{emptyCell(viaje.hora_evaluacion)}</div>

                <div className="text-center text-sm leading-tight sm:text-lg">{emptyCell(viaje.hora_impresion)}</div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}