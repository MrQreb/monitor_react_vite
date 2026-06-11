import { baseUrlRESTMonitorASP } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { QueryBoletasPlanta } from "../../shared/queries/queryBoletasPlanta.query";
import type { IGetEstatusBoletasPlanta } from "../interfaces/iGetStatusBoeltasPlanta.interface";
import type { BoletasCamionesResponse } from "../responses/boletasCamionesResponse";
import type { ComparativaCajasResponse } from "../responses/comparatovaCajasResponse";
import type { QueryCajas } from "../../shared/queries/queryCajas.query";
import type { ICompativaCajaPlanta } from '../interfaces/iCompativaCajaPlanta.interface';

/**
 * Servicio encargado de consultar el estatus de boletas.
 */
export class MateriaPrimaPlanta1QueryService implements IGetEstatusBoletasPlanta, ICompativaCajaPlanta
{
  private readonly apiUrl = `${baseUrlRESTMonitorASP}/api/v1`;
  private readonly prefix = "materia-prima-planta-1";
  private readonly endpoint = `${this.apiUrl}/${this.prefix}`;

  /** Devuelve la lista de agricultor, numero de  cajas  y producto de cada boleta.
   * @param  QueryBoletasPlanta
   * @returns Promise<GetEstatusBoletasPlantaResponse[]>
   */
  async executeQueryBoletasAsync(
    query: QueryBoletasPlanta,
  ): Promise<BoletasCamionesResponse[]> {
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

      return await api<BoletasCamionesResponse[]>(
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

  async executeQueryCajasAsync(
    query: QueryCajas,
  ): Promise<ComparativaCajasResponse[]> {
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

      return await api<ComparativaCajasResponse[]>(
        `${this.endpoint}/comparativo-de-cajas?${params.toString()}`,
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
