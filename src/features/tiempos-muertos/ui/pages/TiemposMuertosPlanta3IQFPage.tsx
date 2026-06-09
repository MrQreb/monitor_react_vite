import NavBar from "@/components/common/NavBar/NavBar";
import { NoConnection } from "@/components/common/NoConnection/NoConnection";
import { CardParo } from "../components/CardParo/CardParo";
import { EmptyParos } from "../components/EmptyParos/EmptyParos";
import { useSignalRConnection } from "@/core/singalR/hooks/useCheckConnectionSignalR";
import { HeaderParos } from "../components/HeaderParo/HeaderParo";
import { LoadingTiempos } from "../components";
import { GridLayoutCalculator } from "../../helpers/GridLayoutCalculator";
import { useTiempoMuertoIQF } from "../hooks/queries/useTiempoMuertoIQF";
import { TiempoMuertoHub } from "../../api/socket/hub/tiempo-muerto-hub";

/**
 * Página principal de monitoreo de tiempos muertos.
 *
 * Diseñada para pantallas industriales de visualización continua.
 * No utiliza scroll y adapta automáticamente la cantidad de columnas
 * según el número de tiempos muertos activos.
 */
export function TiemposMuertosPlanta3IQFPage() {

    const hub = TiempoMuertoHub.getInstance();

    const connection = useSignalRConnection(hub);
    

    const { data: tiemposMuertos = [], isLoading } = useTiempoMuertoIQF();

    if (!connection) {
        return <NoConnection />;
    }

    const columns = GridLayoutCalculator.getColumnsGrid(tiemposMuertos);
    const cardSize = GridLayoutCalculator.getSizeCard(columns);

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background px-2 pb-2 pt-1 text-foreground">
            <NavBar />

            <main className="flex-1 rounded-2xl border bg-linear-to-b from-muted/50 to-background p-4 dark:from-zinc-950/60 dark:to-zinc-950/20">
                <section className="flex h-full flex-col gap-4">

                    <div className="w-full">
                        <HeaderParos
                            title="Tiempos muertos de IQF1 Planta 3"
                            description="Monitoreo de máquinas de IQF 1."
                            tiemposMuertos={tiemposMuertos}
                        />
                    </div>

                    {isLoading && (
                        <LoadingTiempos />
                    )}


                    {
                        tiemposMuertos.length === 0 && (
                            <div className="w-[50%] h-[50%] m-auto">

                                <EmptyParos />
                            </div>
                        )
                    }

                    {
                        tiemposMuertos.length > 0 && (
                            <div
                                className="grid flex-1 gap-3"
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                                }}
                            >
                                {tiemposMuertos.map((tiempoMuerto) => (
                                    <CardParo
                                        key={tiempoMuerto.id}
                                        tiempoMuerto={tiempoMuerto}
                                        size={cardSize}
                                    />
                                ))}
                            </div>
                        )}
                </section>
            </main>
        </div>
    );
}