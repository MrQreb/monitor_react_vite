import { baseUrlRESTMonitorASP } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { IGetEstatusBoletasPlanta } from "../../shared/interfaces/iGetStatusBoeltasPlanta.interface";
import type { GetEstatusBoletasPlantaQuery } from "../../shared/queries/getEstatusBoletasPlanta.query";
import type { GetEstatusBoletasPlantaResponse } from "../../shared/responses/getEstatusBoletasPlantasResponse.responserespoonse";

/**
 * Servicio encargado de consultar el estatus de boletas.
 */
export class MateriaPrimaPlanta1QueryService implements IGetEstatusBoletasPlanta {
  private readonly apiUrl = `${baseUrlRESTMonitorASP}/api/v1`;
  private readonly prefix = "materia-prima-planta-1";
  private readonly endpoint = `${this.apiUrl}/${this.prefix}`;

  /** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta.
   * @param  GetEstatusBoletasPlantaQuery
   * @returns Promise<GetEstatusBoletasPlantaResponse[]>
   */
  async executeAsync(
    query: GetEstatusBoletasPlantaQuery,
  ): Promise<GetEstatusBoletasPlantaResponse[]> {
    
    try {
      
      const params = new URLSearchParams({
        planta: String(query.planta),
      });

      if (query.fechaBusqueda?.fechaInicio) {
        params.append("FechaInicio", query.fechaBusqueda.fechaInicio);
      }

      if (query.fechaBusqueda?.fechaFin) {
        params.append("FechaFin", query.fechaBusqueda.fechaFin);
      }

      return await api<GetEstatusBoletasPlantaResponse[]>(
        `${this.endpoint}/estatus-boletas?${params.toString()}`,
        {
          method: "GET",
        },
      );
    } catch (error) {
      console.error("Error al obtener el estatus de boletas", error);

      throw error;
    }
  }
}
