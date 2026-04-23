import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { GraficaTemperaturas } from "../components/GraficaTemperaturas"
import { SkeletonGrafica } from "../components/SkeletonGrafica";
import { useGetLastTemperatura, useTemperaturasTunel1Planta3, useToastTemperatura } from "../hooks";

export function TemperaturasTunel1Planta3Page() {
    const connection = useSocketConnection();
    const temperaturas = useTemperaturasTunel1Planta3();

    const ultimaTemperatura4 = useGetLastTemperatura({
        temperaturas: temperaturas.data ?? [],
        temperaturaBuscar: "temperatura4"
    });

    useToastTemperatura({
        duration: 30000,
        message: `La temperatura de succión sobrepasó el límite: -37°C (Tunel 1 P3)`,
        max: -37,
        value: ultimaTemperatura4,
    });

    if (temperaturas.isLoading) return <SkeletonGrafica />

    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            <div className="flex justify-center text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                    Tunel 1 Planta 3
                </h1>
            </div>
            <section className="flex min-h-0 w-full flex-1 flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <GraficaTemperaturas
                        temperaturas={temperaturas.data ?? []}
                        lineaTemperatura={{
                            limiteTemperatura: -37,
                            text: 'Límite: -37°C'
                        }}
                    />
                </div>
            </section>
        </div>
    )
}