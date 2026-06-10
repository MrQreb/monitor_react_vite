export interface QueryBoletasPlanta {
    fechaBusqueda?:EstatusBoletasFechas;
    planta:number;

}

export interface EstatusBoletasFechas {
    fechaInicio:string;
    fechaFin:string;
}
