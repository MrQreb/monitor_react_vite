import type { RangoFechasMateriaPrimaDto } from '../dto/rangoFechasMateriaPrimaDto.dto';
import type { MateriaPrimaResumenResponse } from '../responses/materiaPrimaResumenResponse';

/** Interfaz que permite contar las boletas de materia prima */
export interface IResumenMateriaPrima{

    /** Cuenta las boletas del dia actual por defecto */
    getResumenMateriaPrima(dto?:RangoFechasMateriaPrimaDto | null):Promise<MateriaPrimaResumenResponse> 
}