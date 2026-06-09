

import type { EventPayload } from "@/core/singalR/interface/EventPayLoad";
import type { TiempoMuertoCreadoEvent } from "./tiempo-muerto-creado-event";
import type { TiempoMuertoFinalizadoEvent } from "./tiempo-muerto-finalizado-event";

export interface TiempoMuertoEmbolsadoEvents {
    "tiempo-muerto:embolsado-creado": EventPayload<TiempoMuertoCreadoEvent>;

    "tiempo-muerto:embolsado-finalizado": EventPayload<TiempoMuertoFinalizadoEvent>;
}