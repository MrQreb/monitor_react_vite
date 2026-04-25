import { TiempoMuertoService } from '../services/tiempo-muerto-service';
import { TiempoMuertoWSService } from '../services/tiempo-muerto-ws-service';
export const tiempoMuertoWsService  = new TiempoMuertoWSService();
export const tiempoMuertoService  = new TiempoMuertoService();