import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { GraficaTemperaturas, type SeriesConfig } from "../components/GraficaTemperaturas"
import { useTemperaturasPlanta1 } from "../hooks/useTemperaturasPlanta1";
import { SkeletonGrafica } from "../components/SkeletonGrafica";
import { useGetLastTemperatura } from '../hooks/useGetLastTemperatura';
import { useToastTemperatura } from "../hooks/useToastTemperatura";

export function TemperaturasPlanta1Page() {

    const connection = useSocketConnection();

    const temperaturas = useTemperaturasPlanta1();

    const series: SeriesConfig[] = [
        { key: "temperatura1", name: "Aire en Descarga", color: "#f4c95d" },
        { key: "temperatura2", name: "Aire en Entrada", color: "#f97355" },
        { key: "temperatura3", name: "Aire en Punto Medio", color: "#2ea8a0" },
        { key: "temperatura4", name: "Succion", color: "#607d8b" },
    ];

    const lineaTemperatura = {
        limiteTemperatura: -37,
        text: 'Límite: -37°C'
    };


    const ultimaTemperatura4 = useGetLastTemperatura({
        temperaturas: temperaturas.data ?? [],
        temperaturaBuscar: "temperatura4"
    });

    useToastTemperatura({
        duration: 30000,
        message: `La temperatura del sobrepasó el límite: -37°C (Tunel P1)`,
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
                    Tunel Planta 1
                </h1>
            </div>
            <section className="flex min-h-0 w-full flex-1 flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <GraficaTemperaturas
                        temperaturas={temperaturas.data ?? []}
                        lineaTemperatura={lineaTemperatura}
                        series={series}
                    />
                </div>
            </section>
        </div>
    )
}