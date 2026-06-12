import type { QueryCajas } from "../../dto/queryCajas.dto";
import type { ComparativaCajasResponse } from "../responses/comparatovaCajasResponse";

/** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta. */
export interface ICompativaCajaPlanta {
  
    /** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta.
     * @param  QueryBoletasPlanta
     * @returns Promise<GetEstatusBoletasPlantaResponse[]>
     */
  executeQueryCajasAsync(query: QueryCajas): Promise<ComparativaCajasResponse[]>;
}



