import NavBar from "@/components/common/NavBar/NavBar";
import { NoConnection } from "@/components/common/NoConnection/NoConnection";
import { CardParo } from "../components/CardParo/CardParo";
import { EmptyParos } from "../components/EmptyParos/EmptyParos";
import { useTiempoMuertoQuery } from "../hooks/useTiempoMuertoQuery";
import { useSignalRConnection } from "@/core/singalR/hooks/useCheckConnectionSignalR";
import { TiempoMuertoHub } from "../../api/socket/hub/tiempo-muerto-hub";
import { HeaderParos } from "../components/HeaderParo/HeaderParo";

/**
 * Página principal de monitoreo de tiempos muertos.
 *
 * Diseñada para pantallas industriales de visualización continua.
 * No utiliza scroll y adapta automáticamente la cantidad de columnas
 * según el número de tiempos muertos activos.
 */
export function TiemposMuertosPlanta3Page() {
    const hub = TiempoMuertoHub.getInstance();

    const connection = useSignalRConnection(hub);

    const tiemposQuery = useTiempoMuertoQuery();

    const tiemposMuertos = tiemposQuery.data ?? [];

    if (!connection) {
        return <NoConnection />;
    }

    const columns =
        tiemposMuertos.length <= 6
            ? 3
            : tiemposMuertos.length <= 12
                ? 6
                : tiemposMuertos.length <= 18
                    ? 8
                    : tiemposMuertos.length <= 24
                        ? 10
                        : 12;

    const compact = tiemposMuertos.length > 12;

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background px-2 pb-2 pt-1 text-foreground">
            <NavBar />

            <main className="flex-1 rounded-2xl border bg-linear-to-b from-muted/50 to-background p-4 dark:from-zinc-950/60 dark:to-zinc-950/20">
                <div className="flex h-full flex-col gap-4">
                    <HeaderParos tiemposMuertos={tiemposMuertos} />

                    {tiemposQuery.isLoading && (
                        <p className="text-sm text-muted-foreground">
                            Cargando paros activos...
                        </p>
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
                                        compact={compact}
                                    />
                                ))}
                            </div>
                        )}
                </div>
            </main>
        </div>
    );
}