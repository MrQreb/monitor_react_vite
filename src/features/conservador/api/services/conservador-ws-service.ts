import type { CarryOverCajasDto } from "../dto/carry-over-cajas-dto";
import type { CarryOverDto } from "../dto/carry-over-dto";
import { SocketClientNestjs } from "@/shared/socket/socket-client-nestjs";
import type { IConservadorWsService } from "../interfaces/i-conservador-ws-service";

export class ConservadorWsService implements IConservadorWsService {
  private socket = SocketClientNestjs.getInstance();

  onCarryOverPlanta1 = (callback: (data: CarryOverDto[]) => void) => {
    this.socket.on("dashboard:carry_over_planta_1", (data) => {
      console.log("🔥 SOCKET planta 1", data);
      callback(data);
    });
    return () => this.socket.off("dashboard:carry_over_planta_1", callback);
  };

  onCarryOverCajasPlanta3 = (callback: (data: CarryOverCajasDto[]) => void) => {
    this.socket.on("dashboard:calularBonoCajasRecortadas_plata_3", callback);
    return () =>
      this.socket.off("dashboard:calularBonoCajasRecortadas_plata_3", callback);
  };

  onCarryOverPlanta3 = (callback: (data: CarryOverDto[]) => void) => {
    this.socket.on("dashboard:carry_over_planta_3", callback);
    return () => this.socket.off("dashboard:carry_over_planta_3", callback);
  };
}
