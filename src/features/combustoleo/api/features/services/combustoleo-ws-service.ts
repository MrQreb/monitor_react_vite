import { SocketClientNestjs } from "@/shared/socket/socket-client-nestjs";
import type { ICombustoleoWSService } from "../interfaces/i-combustoleo-ws-service";
import type { CombustoleoDto } from "../dto/combustoleo-dto";

/**
 * Service de WebSockets para temperaturas
 */
export class CombustoleoWSService implements ICombustoleoWSService {

  private socket = SocketClientNestjs.getInstance();

  onCombustoleoPlanta1 = (
    callback: (data: CombustoleoDto[]) => void
  ) => {
    this.socket.on("dashboard:liters_combustolio_planta1", callback);
    return () =>
      this.socket.off("dashboard:liters_combustolio_planta1", callback);
  };

  onCombustoleoPlanta3 = (
    callback: (data: CombustoleoDto[]) => void
  ) => {
    this.socket.on("dashboard:liters_combustolio_planta3", callback);
    return () =>
      this.socket.off("dashboard:liters_combustolio_planta3", callback);
  };
}