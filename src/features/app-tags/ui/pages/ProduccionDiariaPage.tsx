import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { useProduccionDiaria } from "../hooks/useProduccion";
import { GraficaProduccionDiaria } from "../components/GraficaProduccionDiaria";

export function ProduccionDiariaPage() {

    const connection = useSocketConnection();
    const produccion = useProduccionDiaria();

    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            <div className="flex justify-center text-center">
                <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-white">
                        Produccion Diaria
                    </h1>

                </div>
            </div>
            <section className="flex min-h-0 w-full flex-1 flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <GraficaProduccionDiaria
                        datos={produccion.data ?? []}
                    />
                </div>
            </section>
        </div>
    )
}