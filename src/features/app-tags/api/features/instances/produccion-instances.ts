import { ProduccionService } from "../services/produccion-service";
import { ProduccionWSService } from "../services/produccion-ws-service";

export const produccionService = new ProduccionService();
export const produccionWsService = new ProduccionWSService();