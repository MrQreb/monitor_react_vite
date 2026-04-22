import NavBar from "@/components/common/NavBar/NavBar"
import { ViajesProgramados } from "../components/ViajesProgramados"
import { EstatusViaje } from "../components/EstatusViaje"
import { SelectScroll } from "@/components/common/SelectScroll/SelectScroll"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import { GraficaCajas } from "../components/GraficaCajas"

type Props = {
  title: string;
  useBoletasHook: () => any;
  useEstatusHook: () => any;
  useCajasHook: () => any;
}
 
export function ViajesEstatusGraficaView({
  title,
  useBoletasHook,
  useEstatusHook,
  useCajasHook
}: Props) {
  
  const boletas = useBoletasHook();
  const estatus = useEstatusHook();
  const cajas = useCajasHook();
  const connection = useSocketConnection();

  if (!connection) return <NoConnection />

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-y-auto overflow-x-hidden bg-[#2f2f2f] md:h-screen md:overflow-hidden md:px-3">
      <NavBar />

      <div className="mt-3">
        <SelectScroll />
      </div>

      <div className="flex h-auto shrink-0 items-center justify-center text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          {title}
        </h1>
      </div>

      <section className="grid min-h-0 w-full flex-1 grid-cols-1 gap-4 items-stretch md:grid-cols-2 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">

        <div className="min-h-0 h-full w-full">
          <ViajesProgramados viajes={boletas.data ?? []} />
        </div>

        <div className="min-h-0 h-full w-full">
          <GraficaCajas cajas={cajas.data ?? []} />
        </div>

        <div className="col-span-1 min-h-0 h-full w-full md:col-span-2">

          <EstatusViaje viajes={estatus.data ?? []} />
        </div>

      </section>
    </div>
  )
}