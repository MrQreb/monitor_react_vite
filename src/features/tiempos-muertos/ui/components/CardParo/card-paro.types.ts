/**
 * Estado visual de un paro según el tiempo transcurrido.
 */
export type ParoStatus =
    | "normal"
    | "advertencia"
    | "critico";

/**
 * Categoría funcional de un paro.
 */
export type ParoTipo =
    | "mantenimiento"
    | "falla"
    | "material"
    | "otro";