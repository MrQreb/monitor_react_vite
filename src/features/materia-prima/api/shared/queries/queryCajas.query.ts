export interface QueryCajas {
    fechaBusqueda?:CompativaCajasFechas;
    planta:number;

}

export interface CompativaCajasFechas {
    fechaInicio:string;
    fechaFin:string;
}
