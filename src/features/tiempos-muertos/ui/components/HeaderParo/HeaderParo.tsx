import type { TiempoMuertoDto } from "@/features/tiempos-muertos/api/dto/tiempo-muerto-dto";

interface Props{
    tiemposMuertos:TiempoMuertoDto[];
}

/**  Header para mostrar informacion de los tiempos muertos
 * @returns Tsx component
 * @param Props
 */
export const HeaderParos = ({ tiemposMuertos }:Props) => {
    return (
        <header className="rounded-2xl border bg-card/70 p-4 md:p-5 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                        Tiempos muertos Planta 3
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Monitoreo en tiempo real de eventos en línea de producción.
                    </p>
                </div>

                <div className="rounded-full border bg-background px-4 py-2 text-sm font-medium">
                    Activos:{" "}
                    <span className="font-bold text-foreground">
                        {tiemposMuertos.length}
                    </span>
                </div>
            </div>
        </header>

    )
}

