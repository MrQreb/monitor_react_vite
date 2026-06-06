import { cn } from "@/lib/utils";
import { useParoTimer } from "./useParoTimer";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card } from "@/components/ui/card";
import type { TiempoMuertoDto } from "@/features/tiempos-muertos/api/dto/tiempo-muerto-dto";
import { parseTipo } from "./card-paro-utils";
import { STATUS_DOT_STYLES, STATUS_ICON_BG, STATUS_LABELS, STATUS_STYLES, STATUS_TIMER_TEXT, TIPO_CONFIG } from "./card-paro.constants";

export interface Props {
    tiempoMuerto: TiempoMuertoDto;
    className?: string;
    onDelete?: () => void;
}

/** Tarjeta del teimpo muerto
 * @returns Tsx component
 * @param Props 
 */
export function CardParo({
    tiempoMuerto,
    className,
    onDelete,
}: Props) {
    const { elapsedSeconds, status, timeText } = useParoTimer(
        tiempoMuerto.fechaInicioParo
    );

    const tipo = parseTipo(tiempoMuerto.categoria);

    const {
        Icon,
        label: tipoLabel,
    } = TIPO_CONFIG[tipo];

    return (
        <Card
            className={cn(
                "relative min-h-72 w-full gap-4 rounded-3xl border p-6",
                STATUS_STYLES[status],
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-2xl",
                            STATUS_ICON_BG[status]
                        )}
                    >
                        <Icon className="size-5" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            {tiempoMuerto.maquina}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {tipoLabel}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={cn(
                            STATUS_STYLES[status]
                        )}
                    >
                        <span
                            className={cn(
                                "h-2 w-2 rounded-full animate-pulse",
                                STATUS_DOT_STYLES[status]
                            )}
                        />

                        {STATUS_LABELS[status]}
                    </Badge>

                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={onDelete}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    )}
                </div>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">
                    {tiempoMuerto.descripcion}
                </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4" />
                    <span className="text-xs uppercase">
                        Tiempo parado
                    </span>
                </div>

                <span
                    className={cn(
                        "font-mono text-2xl font-bold",
                        STATUS_TIMER_TEXT[status]
                    )}
                >
                    {timeText}
                </span>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Área: {tiempoMuerto.area}</span>
                <span>#{tiempoMuerto.id}</span>
            </div>
        </Card>
    );
}