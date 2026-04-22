
import { SocketClient } from "@/shared/socket/socket-client";
import type {
  ViajeProgramadoDto,
  ViajeEstatusDto,
  CajasEsperadasDto,
} from "../dto";
import type { IMateriaPrimaWSService } from "../interfaces/i-materia-prima-ws-service";

/**
 * Clase encargada de la lógica del dashboard de materia prima
 * Solo llamadas de WebSockets
 */
export class MateriaPrimaWSService implements IMateriaPrimaWSService {
  private socket = SocketClient.getInstance();

  onBoletasPlanta1 = (
    callback: (data: ViajeProgramadoDto[]) => void
  ) => {
    this.socket.on("dashboard:products_plata_1", callback);
    return () =>
      this.socket.off("dashboard:products_plata_1", callback);
  };

  onEstatusPlanta1 = (
    callback: (data: ViajeEstatusDto[]) => void
  ) => {
    this.socket.on("dashboard:deliveries_plata_1", callback);
    return () =>
      this.socket.off("dashboard:deliveries_plata_1", callback);
  };

  onCajasPlanta1 = (
    callback: (data: CajasEsperadasDto) => void
  ) => {
    this.socket.on("dashboard:deliveries_plata_1", callback);
    return () =>
      this.socket.off("dashboard:deliveries_plata_1", callback);
  };

  onBoletasPlanta3 = (
    callback: (data: ViajeProgramadoDto[]) => void
  ) => {
    this.socket.on("dashboard:products_plata_3", callback);
    return () =>
      this.socket.off("dashboard:products_plata_3", callback);
  };

  onEstatusPlanta3 = (
    callback: (data: ViajeEstatusDto[]) => void
  ) => {
    this.socket.on("dashboard:deliveries_plata_3", callback);
    return () =>
      this.socket.off("dashboard:deliveries_plata_3", callback);
  };

  onCajasPlanta3 = (
    callback: (data: CajasEsperadasDto) => void
  ) => {
    this.socket.on("dashboard:deliveries_plata_3", callback);
    return () =>
      this.socket.off("dashboard:deliveries_plata_3", callback);
  };
}