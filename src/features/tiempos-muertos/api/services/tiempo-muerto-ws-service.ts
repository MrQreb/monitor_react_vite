import { SocketClient } from "@/shared/socket/socket-client";
import type { TiempoMuertoDto } from "../dto/tiempo-muerto-dto";
import type { ITiempoMuertoWSService } from "../interface/i-tiempo-muerto-ws-service";

export class TiempoMuertoWSService implements ITiempoMuertoWSService {
  private socket = SocketClient.getInstance();

  onEnCurso = (callback: (data: TiempoMuertoDto[]) => void) => {
    this.socket.on("tiempo-muerto.creado", callback);
    return () =>
      this.socket.off(
        "tiempo-muerto.creado",
        callback,
      );
  };

  onEnFinilizada = (callback: (data: TiempoMuertoDto[]) => void) => {
    this.socket.on("tiempo-muerto.finalizado", callback);
    return () =>
      this.socket.off("tiempo-muerto.finalizado", callback);
  };
}
