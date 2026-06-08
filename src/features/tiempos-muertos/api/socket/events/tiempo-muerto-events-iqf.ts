

import type { EventPayload } from "@/core/singalR/interface/EventPayLoad";
import type { TiempoMuertoCreadoEvent } from "./tiempo-muerto-creado-event";
import type { TiempoMuertoFinalizadoEvent } from "./tiempo-muerto-finalizado-event";

export interface TiempoMuertoIQFEvents {
    "tiempo-muerto:iqf-creado": EventPayload<TiempoMuertoCreadoEvent>;

    "tiempo-muerto:iqf-finalizado": EventPayload<TiempoMuertoFinalizadoEvent>;
}