import { baseUrlRESTMonitorASP } from "@/config/base-url-env.config";
import { api } from "@/shared/services/api";
import type { RangoFechasMateriaPrimaDto } from "../../shared/dto/rangoFechasMateriaPrimaDto.dto";
import type { ICountBoletasMateriaPrima } from "../../shared/interfaces/iCountBoletasMateriaPrima.interface";
import type { IResumenMateriaPrima } from "../../shared/interfaces/iResumenMateriaPrima";
import type { MateriaPrimaResumenResponse } from "../../shared";

/** Clase encargada de la logica de los conteos relacinados con materia prima en planta 1 */
export class MateriaPrimaPlanta3CountService
  implements ICountBoletasMateriaPrima, IResumenMateriaPrima
{
  /** Url base de la api REST */
  private readonly apiUrl: string = `${baseUrlRESTMonitorASP}/api/v1`;

  /** Nombre del controller */
  private readonly prefix = "materia-prima-planta-3";

  private endpoint: string = `${this.apiUrl}/${this.prefix}`;

  /*** Obtiene el resumen de materia prima.*/
  async getResumenMateriaPrima(
    dto?: RangoFechasMateriaPrimaDto,
  ): Promise<MateriaPrimaResumenResponse> {
    try {
      const response = await api<MateriaPrimaResumenResponse>(
        `${this.endpoint}/materia-prima`,
        {
          method: "POST",
          body: JSON.stringify(dto),
        },
      );
      return response;
    } catch (error) {
      console.error("Error al obtener el resumen de materia prima", error);
      throw error;
    }
  }

  /*** Obtiene el conteo de boletas.*/
  async getBoletas(dto?: RangoFechasMateriaPrimaDto | null): Promise<number> {
    try {
      const response = await api<number>(`${this.endpoint}/boletas`, {
        method: "POST",
        body: JSON.stringify(dto),
      });
      return response;
    } catch (error) {
      console.error("Error al obtener el conteo de boletas", error);

      throw error;
    }
  }
}
