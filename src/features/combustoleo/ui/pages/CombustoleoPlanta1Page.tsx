import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { Badge } from "@/components/ui/badge"
import { useCombustoleoPlanta1 } from "../hooks/useCombustoleos";
import { GraficaCombustoleo } from "../components/GraficaCombustoleo";
import { useMemo } from "react";

export function CombustoleoPlanta1Page() {

    const connection = useSocketConnection();
    const combustoleo = useCombustoleoPlanta1();

    const ultimaLecturaLitros = useMemo(() => {
        return combustoleo.data?.at(-1)?.litros ?? null
    }, [combustoleo.data])

    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            <div className="flex justify-center text-center">
                <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-white">
                        Combustoleo Planta 1
                    </h1>
                    {ultimaLecturaLitros !== null &&
                        (
                            <Badge className="mt-2 border border-sky-300/30 bg-sky-500/15 px-3 py-1 text-sm font-semibold text-sky-200 hover:bg-sky-500/20">
                                {`${ultimaLecturaLitros.toLocaleString("es-ES")} L`}
                            </Badge>
                        )
                    }
                </div>
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