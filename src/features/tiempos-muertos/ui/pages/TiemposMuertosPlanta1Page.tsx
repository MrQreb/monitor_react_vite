import NavBar from "@/components/common/NavBar/NavBar";
import { NoConnection } from "@/components/common/NoConnection/NoConnection";
import useSocketConnection from "@/shared/hooks/useConnetion";
import { useMemo } from "react";

import { CardParo, type ParoTipo } from "../components/CardParo";
import { LeyendaParo } from "../components/LeyendaParo";

import { useTiempoMuertoQuery } from "../hooks/useTiempoMuertoQuery";
import { useTiempoMuertoSubscription } from "../hooks/useTiempoMuertoSubscription";
import { EmptyParos } from "../components/EmptyParos";

const CATEGORIA_TO_TIPO: Record<string, ParoTipo> = {
    mantenimiento: "mantenimiento",
    falla: "falla",
    material: "material",
};

function parseTipo(categoria: string): ParoTipo {
    return CATEGORIA_TO_TIPO[categoria.toLowerCase()] ?? "otro";
}

export function TiemposMuertosPlanta1Page() {
    const tiemposQuery = useTiempoMuertoQuery();
    const connection = useSocketConnection();

    useTiempoMuertoSubscription(connection && tiemposQuery.isSuccess);

    const paros = useMemo(() => {
        const rawParos = Array.isArray(tiemposQuery.data)
            ? tiemposQuery.data
            : [];

        return rawParos.map((paro) => {
            const parsedDate = Date.parse(paro.fechaInicioParo);
            const fallbackStart =
                Date.now() - (paro.duracionSegundos ?? 0) * 1000;

            return {
                id: String(paro.id),
                maquina: paro.maquina,
                motivo: paro.descripcion,
                tipo: parseTipo(paro.categoria),
                inicioEpoch: Number.isNaN(parsedDate)
                    ? fallbackStart
                    : parsedDate,
            };
        });
    }, [tiemposQuery.data]);

    if (!connection) return <NoConnection />;


    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground px-2 pb-2 pt-1 md:px-3">
            <NavBar />

 
            <main className="h-screen rounded-2xl border bg-linear-to-b from-muted/50 to-background px-4 py-5 md:px-5 md:py-6 dark:from-zinc-950/60 dark:to-zinc-950/20">
                <div className="mx-auto max-w-6xl space-y-6">


                    <div className="sticky">

                        <LeyendaParo />
                    </div>

                    <header className="rounded-2xl border bg-card/70 p-4 md:p-5 backdrop-blur-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                                <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                                    Tiempos muertos Planta 1
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Monitoreo en tiempo real de eventos en línea de producción.
                                </p>
                            </div>

                            <div className="rounded-full border bg-background px-4 py-2 text-sm font-medium">
                                Activos:{" "}
                                <span className="font-bold text-foreground">
                                    {paros.length}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Grid */}

                    {tiemposQuery.isLoading ? (
                        <p className="px-1 text-sm text-muted-foreground">Cargando paros activos...</p>
                    ) : paros.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                            {paros.map((paro) => (
                                <CardParo key={paro.id} {...paro} />
                            ))}
                        </div>
                    ) : (
                        <EmptyParos />
                    )}


                </div>
            </main>
        </div>
    );
}