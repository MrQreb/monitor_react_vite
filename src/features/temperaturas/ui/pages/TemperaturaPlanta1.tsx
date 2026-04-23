import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { GraficaTemperaturas } from "../components/GraficaTemperaturas"
import { useTemperaturasPlanta1 } from "../hooks/useTemperaturasPlanta1";
import { SkeletonGrafica } from "../components/SkeletonGrafica";

export function TemperaturasPlanta1() {
    const connection = useSocketConnection();
    const temperaturas = useTemperaturasPlanta1();
 
    if(temperaturas.isLoading) return <SkeletonGrafica/> 
    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            <div className="flex justify-center text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                    Planta 1
                </h1>
            </div>
            <section className="flex min-h-0 w-full flex-1 flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <GraficaTemperaturas limiteTemperatura={3} temperaturas={temperaturas.data ?? []} />
                </div>
            </section>
        </div>
    )
}