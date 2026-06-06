import {
    AlertTriangle,
    Package,
    Wrench,
    Zap,
} from "lucide-react";

import type {
    ParoStatus,
    ParoTipo,
} from "./card-paro.types";

/**
 * Configuración visual asociada a un tipo de paro.
 */
export interface TipoConfig {
    /**
     * Texto mostrado al usuario.
     */
    label: string;

    /**
     * Icono representativo del tipo.
     */
    Icon: React.ElementType;
}

/**
 * Configuración de icono y etiqueta por categoría.
 */
export const TIPO_CONFIG: Record<
    ParoTipo,
    TipoConfig
> = {
    mantenimiento: {
        label: "Mantenimiento",
        Icon: Wrench,
    },
    falla: {
        label: "Falla",
        Icon: Zap,
    },
    material: {
        label: "Material",
        Icon: Package,
    },
    otro: {
        label: "Otro",
        Icon: AlertTriangle,
    },
};

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
 * Fondo del icono principal.
 */
export const STATUS_ICON_BG: Record<
    ParoStatus,
    string
> = {
    normal: "bg-emerald-500/20",
    advertencia: "bg-amber-500/20",
    critico: "bg-rose-500/20",
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