import type { RangoFechasMateriaPrimaDto } from "../dto/rangoFechasMateriaPrimaDto.dto";

/** Interfaz que permite contar las boletas de materia prima */
export interface ICountBoletasMateriaPrima{

    /** Cuenta las boletas del dia actual por defecto */
   getBoletas(dto?:RangoFechasMateriaPrimaDto | null):Promise<number> 
}