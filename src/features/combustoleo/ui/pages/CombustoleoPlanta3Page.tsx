import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { useCombustoleoPlanta3 } from "../hooks/useCombustoleo";
import { GraficaCombustoleo } from "../components/GraficaCombustoleo";

export function CombustoleoPlanta3Page() {

    const connection = useSocketConnection();
    const combustoleo = useCombustoleoPlanta3();

    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            <div className="flex justify-center text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                    Combustoleo Planta 3
                </h1>
            </div>
            <section className="flex min-h-0 w-full flex-1 flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <GraficaCombustoleo
                       datos={combustoleo.data ?? []}
                    />
                </div>
            </section>
        </div>
    )
}