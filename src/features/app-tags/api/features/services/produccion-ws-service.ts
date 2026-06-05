import { SocketClientNestjs } from "@/shared/socket/socket-client-nestjs";
import type { IProduccionWSService } from "../interfaces/i-produccionws-service";
import type { ProduccionDiariaDto, ProduccionDiariaHoraDto } from "../dto";

/**
 * Service de WebSockets para temperaturas
 */
export class ProduccionWSService implements IProduccionWSService {
  

  private socket = SocketClientNestjs.getInstance();

  onProduccionDiaria = (
    callback: (data: ProduccionDiariaDto[]) => void
  ) => {
    this.socket.on("dashboard:produccion_diaria_por_linea_apptags", callback);
    return () =>
      this.socket.off("dashboard:produccion_diaria_por_linea_apptags", callback);
  };

  onProduccionPorHora = (
    callback: (data: ProduccionDiariaHoraDto[]) => void
  ) => {
    this.socket.on("dashboard:produccion_diaria_por_hora_apptags", callback);
    return () =>
      this.socket.off("dashboard:produccion_diaria_por_hora_apptags", callback);
  };
}