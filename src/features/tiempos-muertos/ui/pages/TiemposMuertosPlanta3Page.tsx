import NavBar from "@/components/common/NavBar/NavBar";
import { NoConnection } from "@/components/common/NoConnection/NoConnection";
import { CardParo } from "../components/CardParo/CardParo";
import { EmptyParos } from "../components/EmptyParos/EmptyParos";
import { useTiempoMuertoQuery } from "../hooks/useTiempoMuertoQuery";
import { useSignalRConnection } from "@/core/singalR/hooks/useCheckConnectionSignalR";
import { TiempoMuertoHub } from "../../api/socket/hub/tiempo-muerto-hub";
import { HeaderParos } from '../components/HeaderParo/HeaderParo';

export function TiemposMuertosPlanta3Page() {
    const hub = TiempoMuertoHub.getInstance();

    const connection = useSignalRConnection(hub);

    const tiemposQuery = useTiempoMuertoQuery();

    const tiemposMuertos = tiemposQuery.data ?? [];

    if (!connection) {
        return <NoConnection />;
    }

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background px-2 pb-2 pt-1 text-foreground md:px-3">
            <NavBar />

            <main className="h-screen rounded-2xl border bg-linear-to-b from-muted/50 to-background px-4 py-5 dark:from-zinc-950/60 dark:to-zinc-950/20 md:px-5 md:py-6">
                <div className="mx-auto max-w-6xl space-y-6">


                    <HeaderParos tiemposMuertos={tiemposMuertos}/>

                    {tiemposQuery.isLoading && (
                        <p className="px-1 text-sm text-muted-foreground">
                            Cargando paros activos...
                        </p>
                    )}

                    {!tiemposQuery.isLoading && tiemposMuertos.length === 0 && (
                        <EmptyParos />
                    )}

                    {!tiemposQuery.isLoading && tiemposMuertos.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                            {tiemposMuertos.map((tiemposMuertos) => (
                                <CardParo
                                    key={tiemposMuertos.id}
                                    tiempoMuerto={tiemposMuertos}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}