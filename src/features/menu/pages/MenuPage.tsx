import { useMemo, useState } from 'react';
import NavBar from '@/components/common/NavBar/NavBar';
import { Carrot, ChartColumnBig, Factory, ThermometerSnowflake, ChartBar, MonitorCog, Fuel } from 'lucide-react';
import { CardMenu } from '../components/CardMenu';
import { TabsMenu } from '../components/TabsMenu';
import { ThemeButton } from '../components/ThemeButton';
import { NAV_ROUTES_TIEMPOS_MUERTOS } from '@/features/tiempos-muertos/routes/NAV_ROUTES_TIEMPOS_MUERTOS';
import { NAV_MATERIA_PRIMA } from '@/features/materia-prima/routes/NAV_MATERIA_PRIMA';
import { NAV_TEMPERATURAS } from '@/features/temperaturas/routes/NAV_TEMPERATURAS';
import { NAV_COMBUSTOLEO } from '@/features/combustoleo/routes/NAV_COMBUSTOLEO';


type Tab = 'Ambas' | 'Planta 1' | 'Planta 3' | 'Cedis';

type MenuItem = {
  title: string;
  route: string;
  icon: any;
  category: Tab;
};

const menuItems: MenuItem[] = [

  //Materia prima
  { title: 'Materia Prima Planta 1', category: 'Planta 1', route: NAV_MATERIA_PRIMA.viajesCajasPlanta1, icon: Carrot },
  { title: 'Seguimiento Planta 1', category: 'Planta 1', route: NAV_MATERIA_PRIMA.viajesProgramadosPlanta1, icon: Factory },
  { title: 'Dashboard Planta 1', category: 'Planta 1', route: NAV_MATERIA_PRIMA.dashboardPlanta1, icon: ChartBar },
  { title: 'Materia Prima Planta 3', category: 'Planta 3', route: NAV_MATERIA_PRIMA.viajesCajasPlanta3, icon: Carrot },
  { title: 'Seguimiento Planta 3', category: 'Planta 3', route: NAV_MATERIA_PRIMA.viajesProgramadosPlanta3, icon: Factory },
  { title: 'Concentrado en Plantas', category: 'Ambas', route: NAV_MATERIA_PRIMA.compativoCajas, icon: ChartColumnBig },
  
  //Temperaturas
  { title: 'Tunel Planta 1', category: 'Planta 1', route:NAV_TEMPERATURAS.tunelPlanta1 , icon: ThermometerSnowflake },
  { title: 'Tunel 1 Planta 3', category: 'Planta 3', route: NAV_TEMPERATURAS.tunel1Planta3, icon: ThermometerSnowflake },
  { title: 'Tunel 2 Planta 3', category: 'Planta 3', route: NAV_TEMPERATURAS.tunel2Planta3, icon: ThermometerSnowflake },
  { title: 'Cedis', category: 'Cedis', route: NAV_TEMPERATURAS.cedis1, icon: ThermometerSnowflake },
  { title: 'Cedis 2', category: 'Cedis', route: NAV_TEMPERATURAS.cedis2, icon: ThermometerSnowflake },

  //Combustoleo
  { title: 'Combustoleo Planta 1', category: 'Planta 1', route: NAV_COMBUSTOLEO.planta1, icon: Fuel },
  { title: 'Combustoleo Planta 3', category: 'Planta 3', route: NAV_COMBUSTOLEO.planta3, icon: Fuel },


  //Conservador
  { title: 'Corte Planta 3', category: 'Planta 3', route: '/', icon: ThermometerSnowflake },
  { title: 'Carry Over Planta 1', category: 'Planta 1', route: '/', icon: ThermometerSnowflake },
  { title: 'Grafica Carry Over Planta 1', category: 'Planta 1', route: '/', icon: ThermometerSnowflake },
  
  //Tiempos muertos
  { title: 'Tiempos Muertos', category: 'Planta 3', route: NAV_ROUTES_TIEMPOS_MUERTOS.tiemposMuertosPlanta3, icon: MonitorCog },
  { title: 'Tiempos Muertos IQF', category: 'Planta 3', route: NAV_ROUTES_TIEMPOS_MUERTOS.tiemposMuertosPlanta3IQF, icon: MonitorCog },
  { title: 'Tiempos Muertos Corte', category: 'Planta 3', route: NAV_ROUTES_TIEMPOS_MUERTOS.tiemposMuertosPlanta3Corte, icon: MonitorCog },
  { title: 'Tiempos Muertos Embolsado', category: 'Planta 3', route: NAV_ROUTES_TIEMPOS_MUERTOS.tiemposMuertosPlanta3Embolsado, icon: MonitorCog },
];

export const MenuPage = () => {
  const [tab, setTab] = useState<Tab>('Ambas');

  const filteredItems = useMemo(() => {
    if (tab === 'Ambas') return menuItems;
    return menuItems.filter(item => item.category === tab);
  }, [tab]);

  const handleTabChange = (value: string) => {
    setTab(value as Tab);
  };


  return (

    <section className='h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100'>

      <NavBar />


      <div className="flex w-full h-auto min-w-0 flex-col bg-slate-50 px-2 pb-2 pt-1 transition-colors dark:bg-slate-950 md:px-3">

        <section className="sticky top-0 mt-4 grid grid-col-10">

          <div className='col-start-6 col-end-8'>
            <TabsMenu value={tab} onChange={handleTabChange} />
          </div>


          <div className="col-start-11">
            <ThemeButton />
          </div>


        </section>



        <section className="mt-8 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item, index) => (
            <CardMenu
              key={index}
              title={item.title}
              route={item.route}
              icon={item.icon}
            />
          ))}
        </section>
      </div>

    </section>
  );
};