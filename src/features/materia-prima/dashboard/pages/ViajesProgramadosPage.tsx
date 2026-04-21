import { ViajesProgramados } from "../components/ViajesProgramados"
import NavBar from '../../NavBar';

type ViajeProgramado = {
  agricultor: string
  producto: string
  cantidad: number
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
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
  { agricultor: '02600 - PRODUCTORES DE GRANOS Y HORTALIZAS EL CHARCO SPR DE RL - ', producto: 'BROCCOLI', cantidad: 1000 },
]



export default function ViajesProgramadosPage() {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-y-auto overflow-x-hidden  bg-[#2f2f2f] px-2 pb-2 pt-1 md:h-screen md:overflow-hidden md:px-3">
      <NavBar />
      {/* <ModoDashboard /> */}

      <div className="flex h-14 shrink-0 items-center justify-center text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Planta 1
        </h1>
      </div>

      <section className="grid min-h-0 w-full flex-1 grid-cols-1 gap-4">

          <ViajesProgramados viajes={viajesProgramados} />
        
      </section>
    </div>
  )
}

