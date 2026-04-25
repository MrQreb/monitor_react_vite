import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { LeyendaParo } from "../components/LeyendaParo";
import { useTiemposMuertos } from "../hooks/useTiemposMuertos";

export function TiemposMuertosPlanta1Page() {

    // const { paros, removeParo } = useTiempoMuertoSocket();

    const tiempos = useTiemposMuertos();
    const connection = useSocketConnection();

    console.log(tiempos.data)


    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground px-2 pb-2 pt-1 md:px-3">
            <NavBar />

            <main className="h-screen rounded-2xl border bg-linear-to-b from-muted/50 to-background px-6 py-8 dark:from-zinc-950/60 dark:to-zinc-950/20">
                <div className="mx-auto max-w-7xl space-y-8">
                    <header className="rounded-2xl border bg-card/70 p-5 backdrop-blur-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                                <h1 className="text-2xl font-semibold tracking-tight">Tiempos muertos Planta 1</h1>
                                <p className="text-sm text-muted-foreground">Monitoreo en tiempo real de eventos en linea de produccion.</p>
                            </div>
                            {/* <div className="rounded-full border bg-background px-4 py-2 text-sm font-medium">
                                Activos: <span className="font-bold text-foreground">{paros.length}</span>
                            </div> */}
                        </div>
                    </header>

                    {/* Grid de cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                        {/* {paros.map(({ uiId, ...paro }) => (
                            <CardParo
                                key={uiId}
                                {...paro}
                                onDelete={() => removeParo(uiId)}
                            />
                        ))} */}
                    </div>


                    {/* Leyenda */}
                    <LeyendaParo/>

                    {/* {paros.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sin paros activos por el momento.</p>
                    ) : null} */}

                </div>
            </main>


        </div>
    )
}