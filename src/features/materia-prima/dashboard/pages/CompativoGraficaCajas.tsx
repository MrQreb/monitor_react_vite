import NavBar from "@/components/common/NavBar/NavBar"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import { useGetCajasPlanta1, useGetCajasPlanta3 } from "../hooks/useGetCajas"
import { GraficaCajas } from "../components/GraficaCajas"
import { Label } from '@/components/ui/label';


export function CompativoGraficaCajas({

}) {
  const cajasPlanta1 = useGetCajasPlanta1();
  const cajasPlanta3 = useGetCajasPlanta3();
  const connection = useSocketConnection()


  if (!connection) return <NoConnection />

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
      <NavBar />

      <section className="grid grid-cols-2 w-full h-full gap-12 mt-4 mb-4">
        
        
        <section>
          <div className="flex justify-center">
            <Label className="text-sm font-extrabold text-white sm:text-base">
              Planta 1
            </Label>
          </div>

          <GraficaCajas cajas={cajasPlanta1?.data ?? []} />
        </section>

        <section>
          <div className="flex justify-center">
            <Label className="text-sm font-extrabold text-white sm:text-base">
              Planta 3
            </Label>
          </div>
          <GraficaCajas cajas={cajasPlanta3?.data ?? []} />
        </section>


      </section>
    </div>
  )
}