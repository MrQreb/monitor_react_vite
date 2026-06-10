export interface GetEstatusBoletasPlantaQuery {
    fechaBusqueda?:EstatusBoletasFechas;
    planta:number;

}

export interface EstatusBoletasFechas {
    fechaInicio:string;
    fechaFin:string;
}
