import { SocketClient } from "@/shared/socket/socket-client";
import type { TemperaturasCedisDto, TemperaturasDto } from "../dto";
import type { ITemperaturasWSService } from "../interfaces/i-temperaturas-ws-service";

/**
 * Service de WebSockets para temperaturas
 */
export class TemperaturasWSService implements ITemperaturasWSService {
  private socket = SocketClient.getInstance();

  onTemperaturasPlanta1 = (
    callback: (data: TemperaturasDto[]) => void
  ) => {
    this.socket.on("dashboard:temperatures_planta1", callback);
    return () =>
      this.socket.off("dashboard:temperatures_planta1", callback);
  };

  onTemperaturasTunel1Planta3 = (
    callback: (data: TemperaturasDto[]) => void
  ) => {
    this.socket.on("dashboard:temperatures_tunnel1_planta3", callback);
    return () =>
      this.socket.off("dashboard:temperatures_tunnel1_planta3", callback);
  };

  onTemperaturasTunel2Planta3 = (
    callback: (data: TemperaturasDto[]) => void
  ) => {
    this.socket.on("dashboard:temperatures_tunnel2_planta3", callback);
    return () =>
      this.socket.off("dashboard:temperatures_tunnel2_planta3", callback);
  };

  onTemperaturasCedis1 = (
    callback: (data: TemperaturasCedisDto[]) => void
  ) => {
    this.socket.on("dashboard:temperatures_cedis_1_planta3", callback);
    return () =>
      this.socket.off("dashboard:temperatures_cedis_1_planta3", callback);
  };

  onTemperaturasCedis2 = (
    callback: (data: TemperaturasCedisDto[]) => void
  ) => {
    this.socket.on("dashboard:temperatures_cedis_2_planta3", callback);
    return () =>
      this.socket.off("dashboard:temperatures_cedis_2_planta3", callback);
  };
}