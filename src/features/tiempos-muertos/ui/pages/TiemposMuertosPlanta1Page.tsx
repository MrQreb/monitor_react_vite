import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { PAROS } from "../data/PAROS";
import { CardParo } from "../components/CardParo";

export function TiemposMuertosPlanta1Page() {

    const connection = useSocketConnection();

    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
           
            <main className="h-screen bg-zinc-950 px-6 py-12">
                <div className="mx-auto max-w-5xl space-y-10">

                    {/* Leyenda */}
                    <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Normal (menos de 5 min)
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-amber-400" />
                            Atención (5 – 30 min)
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-rose-400" />
                            Crítico (más de 30 min)
                        </div>
                    </div>

                    {/* Grid de cards */}
                    <div className="flex flex-wrap gap-5">
                        {PAROS.map((paro) => (
                            <CardParo key={paro.id} {...paro} />
                        ))}
                    </div>

                </div>
            </main>


        </div>
    )
}