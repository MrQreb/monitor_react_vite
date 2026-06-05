import type { TiempoMuertoCreadoEvent }
from "./tiempo-muerto-creado-event";

import type { TiempoMuertoFinalizadoEvent }
from "./tiempo-muerto-finalizado-event";

/**
 * Eventos emitidos por el Hub
 * de tiempos muertos.
 */
export interface TiempoMuertoEvents {
  "tiempo-muerto:creado": TiempoMuertoCreadoEvent | TiempoMuertoCreadoEvent[];
  "tiempo-muerto:finalizado":
    | TiempoMuertoFinalizadoEvent
    | TiempoMuertoFinalizadoEvent[];
}