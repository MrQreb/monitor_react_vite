import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";
import type {
  ITiempoMuertoWSService,
  TiempoMuertoFinalizadoRef,
} from "../interface/i-tiempo-muerto-ws-service";
import type { TiempoMuertoEvents } from "../events/tiempo-muerto-events";
import { TiempoMuertoHubClient } from "../signalr/tiempo-muerto-hub-client";

function pick<T = unknown>(obj: any, camel: string, pascal: string): T {
  return (obj?.[camel] ?? obj?.[pascal]) as T;
}

function normalizeCreated(payload: any): TiempoMuertoDto[] {
  const list = Array.isArray(payload) ? payload : [payload];

  return list
    .map((ev) => {
      const id = pick<number>(ev, "id", "Id");
      const maquinaId = pick<number>(ev, "maquinaId", "MaquinaId");
      const maquina = pick<string>(ev, "maquina", "Maquina");
      const categoria = pick<string>(ev, "categoria", "Categoria");
      const descripcion = pick<string>(ev, "descripcion", "Descripcion");
      const fechaInicioParo = pick<string>(
        ev,
        "fechaInicioParo",
        "FechaInicioParo"
      );

      if (
        typeof id !== "number" ||
        typeof maquinaId !== "number" ||
        typeof maquina !== "string" ||
        typeof categoria !== "string" ||
        typeof descripcion !== "string" ||
        typeof fechaInicioParo !== "string"
      ) {
        return null;
      }

      return {
        id,
        maquinaId,
        maquina,
        categoria,
        descripcion,
        fechaInicioParo,
        enCurso: true,
      } satisfies TiempoMuertoDto;
    })
    .filter(Boolean) as TiempoMuertoDto[];
}

function normalizeFinalized(payload: any): TiempoMuertoFinalizadoRef[] {
  const list = Array.isArray(payload) ? payload : [payload];
  return list
    .map((ev) => {
      const maquinaId = pick<number>(ev, "maquinaId", "MaquinaId");
      if (typeof maquinaId !== "number") return null;
      return { maquinaId } satisfies TiempoMuertoFinalizadoRef;
    })
    .filter(Boolean) as TiempoMuertoFinalizadoRef[];
}

export class TiempoMuertoWSService implements ITiempoMuertoWSService {
  private hub = TiempoMuertoHubClient.getInstance<TiempoMuertoEvents>();

  onEnCurso = (callback: (data: TiempoMuertoDto[]) => void) => {
    const handler = (payload: TiempoMuertoEvents["tiempo-muerto:creado"]) => {
      callback(normalizeCreated(payload));
    };

    this.hub.on("tiempo-muerto:creado", handler);
    return () => this.hub.off("tiempo-muerto:creado", handler);
  };

  onEnFinilizada = (callback: (data: TiempoMuertoFinalizadoRef[]) => void) => {
    const handler = (
      payload: TiempoMuertoEvents["tiempo-muerto:finalizado"]
    ) => {
      callback(normalizeFinalized(payload));
    };

    this.hub.on("tiempo-muerto:finalizado", handler);
    return () => this.hub.off("tiempo-muerto:finalizado", handler);
  };
}