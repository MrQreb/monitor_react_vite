export interface CarryOverCajasDto {
	turnoActual: number;
	cajasRecortajas: number;
	bono: number;
	color: string;
	bonosCajas: BonoCajaDto[];
}

export interface BonoCajaDto {
	cajas: number;
	bono: number;
	color: string;
}