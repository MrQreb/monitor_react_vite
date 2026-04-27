import { SocketClient } from "@/shared/socket/socket-client";
import type { TiempoMuertoDto } from "../../dto/tiempo-muerto-dto";
import type { ITiempoMuertoWSService } from "../interface/i-tiempo-muerto-ws-service";
import type { TiempoMuertoEvents } from "../events/tiempo-muerto-events";

export class TiempoMuertoWSService implements ITiempoMuertoWSService {
  private socket = SocketClient.getInstance<TiempoMuertoEvents>();

  onEnCurso = (callback: (data: TiempoMuertoDto[]) => void) => {
    const handler = (data: TiempoMuertoDto[] | TiempoMuertoDto) => {
      callback(Array.isArray(data) ? data : [data]);
    };

    this.socket.on("tiempo-muerto:creado", handler);
    return () => this.socket.off("tiempo-muerto:creado", handler);
  };

  onEnFinilizada = (callback: (data: TiempoMuertoDto[]) => void) => {
    const handler = (data: TiempoMuertoDto[] | TiempoMuertoDto) => {
      callback(Array.isArray(data) ? data : [data]);
    };

    this.socket.on("tiempo-muerto:finalizado", handler);
    return () => this.socket.off("tiempo-muerto:finalizado", handler);
  };
}