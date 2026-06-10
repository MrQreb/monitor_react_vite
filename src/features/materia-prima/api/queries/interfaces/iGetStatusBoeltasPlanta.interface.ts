import type { QueryBoletasPlanta } from "../../shared/queries/queryBoletasPlanta.query";
import type { BoletasCamionesResponse } from "../responses/getEstatusBoletasPlantasResponse.response";

/** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta. */
export interface IGetEstatusBoletasPlanta {
  
    /** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta.
     * @param  QueryBoletasPlanta
     * @returns Promise<GetEstatusBoletasPlantaResponse[]>
     */
  executeQueryBoletasAsync(query: QueryBoletasPlanta): Promise<BoletasCamionesResponse[]>;
}



