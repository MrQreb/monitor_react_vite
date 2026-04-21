
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { ViajesProgramados } from "../components/ViajesProgramados"
import { EStatusDeViaje } from "../components/EStatusDeViaje"
import { Grafica } from "../components/Grafica"

type ViajeProgramado = {
  agricultor: string
  producto: string
  cantidad: number
}

type ViajeEstatus = {
  producto: string
  folio: string
  status_embarque: string
  ticket: string
  fecha_alta: string
  hora_alta: string
  hora_evaluacion: string
  hora_impresion: string
  centro_corte: string
  fecha_envio: string | null
  fecha_evaluador: string
  hora_pesaje: string
  rancho: string
  estatus: string
}

type GraficaResumen = {
  producto: string
  estimado: number
  real: number
}

const viajesProgramados: ViajeProgramado[] = [
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

const estatusDeViaje: ViajeEstatus[] = [
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

const graficaResumen: GraficaResumen[] = [
  { producto: 'BROCCOLI', estimado: 8000, real: 689 },
  { producto: 'CALABAZA VERDE', estimado: 1200, real: 205 },
  { producto: 'CALABAZAMARILLA', estimado: 400, real: 0 },
  { producto: 'COLIFLOR ORGANI', estimado: 3600, real: 1481 },
]

const currentDate = '21/4/2026'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#2f2f2f] text-white">
      <section className="bg-white px-4 py-3 text-black md:px-8">
        <div className="mx-auto flex max-w-[1500px] items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,#c01f3d_0deg,#0f766e_80deg,#f59e0b_150deg,#2563eb_230deg,#c01f3d_360deg)] p-[3px] shadow-sm">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[10px] font-black tracking-[0.3em] text-slate-700">
                MB
              </div>
            </div>
            <span className="font-serif text-[2.15rem] font-bold leading-none tracking-tight text-[#1f2d64] md:text-[3.25rem]">
              MarBran
            </span>
          </div>
          <div className="pt-1 text-2xl font-extrabold leading-none text-black md:text-[2.4rem]">
            {currentDate}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1500px] flex-col gap-4 px-3 py-3 md:px-4">
        <div className="rounded-[2rem] bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
          <div className="mb-3 flex flex-col items-stretch gap-3 xl:flex-row xl:items-start xl:gap-4">
            <div className="flex w-full max-w-[280px] items-center gap-2 self-start rounded-[1.1rem] border border-black/35 bg-[#353535] px-4 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <span className="text-[0.95rem] font-semibold">Modo</span>
              <ArrowUpRight className="size-4 text-sky-300" />
              <span className="text-[0.95rem] font-semibold">:</span>
              <select className="w-full appearance-none bg-transparent pr-5 text-[0.95rem] font-semibold outline-none">
                <option>Scroll</option>
                <option>Auto</option>
                <option>Manual</option>
              </select>
              <ChevronDown className="pointer-events-none size-4 shrink-0 text-white/70" />
            </div>

            <div className="flex-1 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Planta 1
              </h1>
            </div>

            <div className="hidden w-full max-w-[280px] xl:block" />
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <ViajesProgramados viajes={viajesProgramados} />
            <Grafica datos={graficaResumen} />
          </div>

          <div className="mt-4">
            <EStatusDeViaje viajes={estatusDeViaje} />
          </div>
        </div>
      </section>
    </main>
  )
}

