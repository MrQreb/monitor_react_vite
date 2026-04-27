export interface CarryOverDto {
	planta: string;
	idGlobal: string;
	idInventario: number;
	folioOrigen: string;
	folio: string;
	fechaDeIngreso: string;
	fechaCreacion: string;
	cajasTotales: number;
	binsTotales: number | null;
	idOrigen: number;
	idEstatus: number;
	idAgricultor: number;
	idGlobalAgricultor: string;
	idIngrediente: number;
	idGlobalIngrediente: string;
	ingredienteNombre: string;
	kilosTotales: number;
	kilosDisponibles: number;
	cajasDisponibles: number;
	binsDisponibles: number | null;
	grado1: number;
	carryOver: number;
	tieneHijos: number;
	kilosTotalesCarryOver: number;
	agricultor: string;
}