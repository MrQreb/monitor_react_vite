import type { CardSize } from "./CardSize.type";

/**
 * Conjunto de clases Tailwind utilizadas para
 * adaptar visualmente una tarjeta según su tamaño.
 */
export interface CardSizeStyles {
    /**
     * Estilos generales de la tarjeta.
     */
    card: string;

    /**
     * Estilos del nombre de la máquina.
     */
    title: string;

    /**
     * Estilos de la descripción.
     */
    description: string;

    /**
     * Estilos del badge de estado.
     */
    badge: string;

    /**
     * Estilos del badge de área.
     */
    area: string;

    /**
     * Estilos del contador de tiempo.
     */
    timer: string;

    /**
     * Estilos de la etiqueta "Tiempo parado".
     */
    timerLabel: string;

    /**
     * Espaciado del encabezado del temporizador.
     */
    timerHeader: string;

    /**
     * Espaciado vertical del separador.
     */
    separator: string;

    /**
     * Tamaño de iconos.
     */
    icon: string;

    /**
     * Tamaño del indicador circular de estado.
     */
    dot: string;
}

/**
 * Configuración visual utilizada por las tarjetas
 * de tiempos muertos según el espacio disponible
 * en el dashboard.
 *
 * Mientras más tarjetas existan en pantalla,
 * menor será el tamaño utilizado.
 */
export const SIZE_CONFIG: Record<CardSize, CardSizeStyles> = {
    large: {
        card: "min-h-[220px] p-5",
        title: "text-xl",
        description: "line-clamp-3 text-base",
        badge: "text-sm",
        area: "text-sm",
        timer: "text-4xl",
        timerLabel: "text-sm",
        timerHeader: "mb-2",
        separator: "my-3",
        icon: "size-4",
        dot: "h-2 w-2",
    },

    medium: {
        card: "min-h-[180px] p-4",
        title: "text-base",
        description: "line-clamp-2 text-sm",
        badge: "text-xs",
        area: "text-xs",
        timer: "text-3xl",
        timerLabel: "text-xs",
        timerHeader: "mb-2",
        separator: "my-2",
        icon: "size-3",
        dot: "h-2 w-2",
    },

    small: {
        card: "min-h-[140px] p-3",
        title: "text-xs",
        description: "line-clamp-1 text-xs",
        badge: "text-[10px]",
        area: "text-[10px]",
        timer: "text-xl",
        timerLabel: "text-[10px]",
        timerHeader: "mb-1",
        separator: "my-1",
        icon: "size-3",
        dot: "h-1.5 w-1.5",
    },

    xxsmall: {
        card: "min-h-[110px] p-2",
        title: "text-xs",
        description: "hidden",
        badge: "text-[8px]",
        area: "text-[8px]",
        timer: "text-base",
        timerLabel: "hidden",
        timerHeader: "mb-0",
        separator: "my-1",
        icon: "size-2",
        dot: "h-1 w-1",
    },
};