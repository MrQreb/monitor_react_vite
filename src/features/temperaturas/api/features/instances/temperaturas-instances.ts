import { TemperaturasWSService } from "../services/temperaturas-ws-service";
import { TemeperaturasService } from "../services/temperaturas-service";

export const temperaturaService = new TemeperaturasService();
export const temperatuWsService = new TemperaturasWSService();