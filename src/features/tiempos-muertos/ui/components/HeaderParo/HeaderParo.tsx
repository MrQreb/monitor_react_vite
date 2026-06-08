import type { TiempoMuertoDto } from "@/features/tiempos-muertos/api/dto/tiempo-muerto-dto";
import { Badge } from '@/components/ui/badge';

interface Props {
    tiemposMuertos: TiempoMuertoDto[];
    title: string;
    description: string;
}

/**  Header para mostrar informacion de los tiempos muertos
 * @returns Tsx component
 * @param Props
 */
export const HeaderParos = ({ tiemposMuertos, description, title }: Props) => {
    return (
        <header className="rounded-2xl border bg-card/70 p-4 md:p-5 backdrop-blur-sm w-full h-full">

            <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight">
                        {title}
                    </h1>
                    <p className="text-base text-muted-foreground">
                        {description}
                    </p>
                </div>

                <Badge variant={'secondary'}>
                    <span className="font-bold text-sm">
                        Activos: {tiemposMuertos.length}
                    </span>
                </Badge>
            </div>
        </header>

    )
}

