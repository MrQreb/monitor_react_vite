/** Respuesta de cajas */
export interface ComparativaCajasResponse{
    /** nombre del producto*/
    producto:string;
    /** cantidad de cajas reales*/
    cajasReales:number;
    /** cantidad de cajas estimadas */
    cajasEstimadas:number;
}