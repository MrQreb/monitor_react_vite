/** Respuesta de las boletas de la api rest de asp net */
export interface GetEstatusBoletasPlantaResponse{
    /** Nombre del agricultor y rancho*/
    agricultor:string;
    /** Nombre del producto*/
    producto:string;
    /** Cantidad de cajas del producto */
    cantidad:string;
    /** Hora de creacion de la boleta */
    horaAlta:string;
}