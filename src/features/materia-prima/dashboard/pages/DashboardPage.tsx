import { ViajesProgramados } from "../components/ViajesProgramados"
import { EstatusViaje } from "../components/EstatusViaje"
import { Grafica } from "../components/Grafica"
import NavBar from '../../../../components/common/NavBar/NavBar';
import type { CajasEsperadasDto, ViajeEstatusDto, ViajeProgramadoDto } from "../../api/features/dto";




const viajesProgramados: ViajeProgramadoDto[] = [
  { agricultor: '00109 - AGRICOLA ROJAS, SA DE CV - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '00367 - PRODUCTORES DE GRANOS Y HORTALIZAS CARDENAS S DE PR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '00679 - GONZALEZ LEDESMA YANET - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '00010 - CHACON GONZALEZ RAFAEL - SANTA MARIA', producto: 'COLIFLOR', cantidad: 900 },
  { agricultor: '00408 - CHACON ZAVALA RUBEN - SANTA MARIA', producto: 'CALABAZA VERDE', cantidad: 400 },
  { agricultor: '00020 - COMERCIALIZADORA RIAÑO, SA CV - SAN JOSE', producto: 'COLIFLOR ORGANI', cantidad: 900 },
  { agricultor: '00064 - COMERCIALIZADORA RIAÑO, SA CV - RANCHO EL REFUGIO', producto: 'COLIFLOR ORGANI', cantidad: 900 },
  { agricultor: '02939 - LA HUERTA DE GUARAPO, SPR DE RL - GUARAPO', producto: 'CALABAZAMARILLA', cantidad: 400 },
  { agricultor: '00330 - LOS NICOLASES S DE PR DE RL - ', producto: 'CALABAZA VERDE', cantidad: 400 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
]

const estatusDeViaje: ViajeEstatusDto[] = [
  {
    producto: 'COLIFLOR ORGANI',
    folio: '26101234',
    status_embarque: '',
    ticket: '37698',
    fecha_alta: '2026-04-21 09:28:05.590',
    hora_alta: '09:28',
    hora_evaluacion: '',
    hora_impresion: '',
    centro_corte: 'PLANTA 1',
    fecha_envio: null,
    fecha_evaluador: '',
    hora_pesaje: '08:47',
    rancho: '00020 - COMERCIALIZADORA RIAÑO, SA CV - SAN JOSE',
    estatus: 'Descargado/por evaluar',
  },
  {
    producto: 'COLIFLOR ORGANI',
    folio: '26101235',
    status_embarque: '',
    ticket: '37699',
    fecha_alta: '2026-04-21 10:01:07.147',
    hora_alta: '10:01',
    hora_evaluacion: '',
    hora_impresion: '',
    centro_corte: 'PLANTA 1',
    fecha_envio: null,
    fecha_evaluador: '',
    hora_pesaje: '09:18',
    rancho: '00064 - COMERCIALIZADORA RIAÑO, SA CV - RANCHO EL REFUGIO',
    estatus: 'Descargado/por evaluar',
  },
  {
    producto: 'BROCCOLI',
    folio: '26101236',
    status_embarque: '',
    ticket: '37700',
    fecha_alta: '2026-04-21 10:11:00.663',
    hora_alta: '10:11',
    hora_evaluacion: '',
    hora_impresion: '',
    centro_corte: 'PLANTA 1',
    fecha_envio: null,
    fecha_evaluador: '',
    hora_pesaje: '09:36',
    rancho: '00109 - AGRICOLA ROJAS, SA DE CV',
    estatus: 'Descargado/por evaluar',
  },
  {
    producto: 'CALABAZA VERDE',
    folio: '26101237',
    status_embarque: '',
    ticket: '37701',
    fecha_alta: '2026-04-21 10:11:32.957',
    hora_alta: '10:11',
    hora_evaluacion: '',
    hora_impresion: '',
    centro_corte: 'PLANTA 1',
    fecha_envio: null,
    fecha_evaluador: '',
    hora_pesaje: '09:39',
    rancho: '00408 - CHACON ZAVALA RUBEN - SANTA MARIA',
    estatus: 'Descargado/por evaluar',
  },
  {
    producto: 'COLIFLOR ORGANI',
    folio: '',
    status_embarque: '',
    ticket: '',
    fecha_alta: '',
    hora_alta: '',
    hora_evaluacion: '',
    hora_impresion: '',
    centro_corte: '',
    fecha_envio: '',
    fecha_evaluador: '',
    hora_pesaje: '10:17',
    rancho: '00020 - COMERCIALIZADORA RIAÑO, SA CV - SAN JOSE',
    estatus: 'Boleta por asignar',
  },
  {
    producto: 'BROCCOLI',
    folio: '',
    status_embarque: '',
    ticket: '',
    fecha_alta: '',
    hora_alta: '',
    hora_evaluacion: '',
    hora_impresion: '',
    centro_corte: '',
    fecha_envio: '',
    fecha_evaluador: '',
    hora_pesaje: '10:34',
    rancho: '00109 - AGRICOLA ROJAS, SA DE CV',
    estatus: 'Boleta por asignar',
  },
]

const graficaResumen: CajasEsperadasDto[] = [
  { producto: 'BROCCOLI', estimado: 8000, real: 689 },
  { producto: 'CALABAZA VERDE', estimado: 1200, real: 205 },
  { producto: 'CALABAZAMARILLA', estimado: 400, real: 0 },
  { producto: 'COLIFLOR ORGANI', estimado: 3600, real: 1481 },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-y-auto overflow-x-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:h-screen md:overflow-hidden md:px-3">
      <NavBar />
      {/* <ModoDashboard /> */}

      <div className="flex h-14 shrink-0 items-center justify-center text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Planta 1
        </h1>
      </div>

      <section className="grid min-h-0 w-full flex-1 grid-cols-1 gap-4 items-stretch md:grid-cols-2 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">

        <div className="min-h-0 h-full w-full">
          <ViajesProgramados viajes={viajesProgramados} />
        </div>

        <div className="min-h-0 h-full w-full">
          <Grafica datos={graficaResumen} />
        </div>

        <div className="col-span-1 min-h-0 h-full w-full md:col-span-2">

          <EstatusViaje viajes={estatusDeViaje} />
        </div>

      </section>
    </div>
  )
}

