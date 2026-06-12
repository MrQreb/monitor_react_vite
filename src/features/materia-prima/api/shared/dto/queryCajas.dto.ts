export interface QueryCajas{
    fechaBusqueda:CompativaCajasFechas;
    planta:number;
}

interface CompativaCajasFechas{
    fechaInicio:string;
    fechaFin:string;
}