import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Clock, Trash2 } from "lucide-react";

import type { TiempoMuertoDto } from "@/features/tiempos-muertos/api/dto/tiempo-muerto-dto";

import { useParoTimer } from "./useParoTimer";

import {
    STATUS_DOT_STYLES,
    STATUS_LABELS,
    STATUS_STYLES,
    STATUS_TIMER_TEXT,
} from "./card-paro.constants";

import { SIZE_CONFIG } from "./SIZE-CONFIG";
import type { CardSize } from "./CardSize.type";

export interface Props {
    tiempoMuerto: TiempoMuertoDto;
    className?: string;
    onDelete?: () => void;

    /**
     * Tamaño visual de la tarjeta.
     */
    size?: CardSize;
}

/**
 * Tarjeta que representa un tiempo muerto activo.
 *
 * Muestra:
 * - Máquina afectada.
 * - Estado actual del paro.
 * - Descripción.
 * - Área.
 * - Tiempo transcurrido.
 *
 * @param tiempoMuerto Información del tiempo muerto.
 * @param className Clases CSS adicionales.
 * @param onDelete Acción opcional para eliminar el elemento.
 * @param size Tamaño visual utilizado por el dashboard.
 */
export function CardParo({
    tiempoMuerto,
    className,
    onDelete,
    size = "large",
}: Props) {
    const { status, timeText } = useParoTimer(
        tiempoMuerto.fechaInicioParo
    );

    const styles = SIZE_CONFIG[size];

    return (
        <Card
            className={cn(
                "flex flex-col rounded-xl border",
                styles.card,
                STATUS_STYLES[status],
                className
            )}
        >
            {/* Header */}
            <section className="flex items-start justify-between gap-2">
                <h3
                    className={cn(
                        "truncate font-bold",
                        styles.title
                    )}
                >
                    {tiempoMuerto.maquina}
                </h3>

                <div className="flex items-center gap-1">
                    <Badge
                        variant="outline"
                        className={cn(
                            "gap-1 whitespace-nowrap",
                            styles.badge,
                            STATUS_STYLES[status]
                        )}
                    >
                        <span
                            className={cn(
                                "rounded-full animate-pulse",
                                styles.dot,
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
                            <Trash2 className={styles.icon} />
                        </Button>
                    )}
                </div>
            </section>

            {/* Descripción */}
            <section className="mt-2 flex-1">
                <p
                    className={cn(
                        "text-muted-foreground",
                        styles.description
                    )}
                >
                    {tiempoMuerto.descripcion}
                </p>
            </section>

            {/* Área */}
            <section className="mt-2 flex items-center justify-between">
                <Badge
                    variant="secondary"
                    className={styles.area}
                >
                    {tiempoMuerto.area}
                </Badge>

                {size === "large" && (
                    <span className="text-xs text-muted-foreground">
                        #{tiempoMuerto.id}
                    </span>
                )}
            </section>

            <Separator className={styles.separator} />

            {/* Tiempo transcurrido */}
            <section>
                <div
                    className={cn(
                        "flex items-center gap-2 text-muted-foreground",
                        styles.timerHeader
                    )}
                >
                    <Clock className={styles.icon} />

                    <span
                        className={cn(
                            "uppercase tracking-wider",
                            styles.timerLabel
                        )}
                    >
                        Tiempo parado
                    </span>
                </div>

                <div
                    className={cn(
                        "font-mono font-bold tabular-nums text-center",
                        styles.timer,
                        STATUS_TIMER_TEXT[status]
                    )}
                >
                    {timeText}
                </div>
            </section>
        </Card>
    );
}