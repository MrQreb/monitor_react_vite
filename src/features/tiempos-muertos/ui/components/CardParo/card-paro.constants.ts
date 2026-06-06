import type {
    ParoStatus,
} from "./card-paro.types";


/**
 * Estilos del badge según el estado.
 */
export const STATUS_STYLES: Record<
    ParoStatus,
    string
> = {
    normal:
        "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",

    advertencia:
        "bg-amber-500/10 border-amber-500/30 text-amber-400",

    critico:
        "bg-rose-500/10 border-rose-500/30 text-rose-400",
};

/**
 * Color del indicador animado.
 */
export const STATUS_DOT_STYLES: Record<
    ParoStatus,
    string
> = {
    normal: "bg-emerald-400",
    advertencia: "bg-amber-400",
    critico: "bg-rose-400",
};


/**
 * Color del temporizador.
 */
export const STATUS_TIMER_TEXT: Record<
    ParoStatus,
    string
> = {
    normal: "text-emerald-400",
    advertencia: "text-amber-400",
    critico: "text-rose-400",
};

/**
 * Texto mostrado para cada estado.
 */
export const STATUS_LABELS: Record<
    ParoStatus,
    string
> = {
    normal: "En curso",
    advertencia: "Atención",
    critico: "Crítico",
};