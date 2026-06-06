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

export interface Props {
    tiempoMuerto: TiempoMuertoDto;
    className?: string;
    onDelete?: () => void;

    /**
     * Modo compacto utilizado cuando existen
     * muchos tiempos muertos simultáneamente.
     */
    compact?: boolean;
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
 * @param compact Reduce tamaños para dashboards con muchos elementos.
 */
export function CardParo({
    tiempoMuerto,
    className,
    onDelete,
    compact = false,
}: Props) {
    const { status, timeText } = useParoTimer(
        tiempoMuerto.fechaInicioParo
    );

    /**
     * Configuración visual dependiente
     * del modo compacto.
     */
    const cardClass = compact
        ? "min-h-[140px] p-2"
        : "min-h-[190px] p-4";

    const titleClass = compact
        ? "text-sm"
        : "text-lg";

    const descriptionClass = compact
        ? "line-clamp-1 text-xs"
        : "line-clamp-2 text-sm";

    const areaBadgeClass = compact
        ? "text-[10px]"
        : "";

    const timerLabelClass = compact
        ? "text-[10px]"
        : "text-xs";

    const timerValueClass = compact
        ? "text-xl"
        : "text-3xl";

    const statusLabel = compact
        ? STATUS_LABELS[status].replace("En curso", "Curso")
        : STATUS_LABELS[status];

    return (
        <Card
            className={cn(
                "flex flex-col rounded-xl border",
                cardClass,
                STATUS_STYLES[status],
                className
            )}
        >
            {/* Header */}
            <section className="flex items-start justify-between gap-2">
                <h3
                    className={cn(
                        "truncate font-bold",
                        titleClass
                    )}
                >
                    {tiempoMuerto.maquina}
                </h3>

                <div className="flex items-center gap-1">
                    <Badge
                        variant="outline"
                        className={cn(
                            "gap-1 whitespace-nowrap",
                            STATUS_STYLES[status]
                        )}
                    >
                        <span
                            className={cn(
                                "h-2 w-2 rounded-full animate-pulse",
                                STATUS_DOT_STYLES[status]
                            )}
                        />

                        {statusLabel}
                    </Badge>

                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={onDelete}
                        >
                            <Trash2 className="size-3" />
                        </Button>
                    )}
                </div>
            </section>

            {/* Descripción */}
            <section className="mt-2 flex-1">
                <p
                    className={cn(
                        "text-muted-foreground",
                        descriptionClass
                    )}
                >
                    {tiempoMuerto.descripcion}
                </p>
            </section>

            {/* Área */}
            <section className="mt-2 flex items-center justify-between">
                <Badge
                    variant="secondary"
                    className={areaBadgeClass}
                >
                    {tiempoMuerto.area}
                </Badge>
            </section>

            <Separator className="my-2" />

            {/* Tiempo transcurrido */}
            <section>
                <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3" />

                    <span
                        className={cn(
                            "uppercase tracking-wider",
                            timerLabelClass
                        )}
                    >
                        Tiempo parado
                    </span>
                </div>

                <div
                    className={cn(
                        "font-mono font-bold tabular-nums text-center",
                        timerValueClass,
                        STATUS_TIMER_TEXT[status]
                    )}
                >
                    {timeText}
                </div>
            </section>
        </Card>
    );
}