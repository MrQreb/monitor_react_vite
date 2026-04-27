import { useMemo, useState } from 'react';
import NavBar from '@/components/common/NavBar/NavBar';
import { Carrot, ChartColumnBig, Factory, ThermometerSnowflake, Sun, Moon } from 'lucide-react';
import { CardMenu } from '../components/CardMenu';
import { TabsMenu } from '../components/TabsMenu';
import { Button } from '@/components/ui/button';
import { useTheme } from '../../../app/providers/ThemeProvider';


type Tab = 'Ambas' | 'Planta 1' | 'Planta 3' | 'Cedis';

type MenuItem = {
  title: string;
  route: string;
  icon: any;
  category: Tab;
};

const menuItems: MenuItem[] = [
  { title: 'Materia Prima Planta 1', category: 'Planta 1', route: '/', icon: Carrot },
  { title: 'Seguimiento Planta 1', category: 'Planta 1', route: '/', icon: Factory },
  { title: 'Materia Prima Planta 3', category: 'Planta 3', route: '/', icon: Carrot },
  { title: 'Seguimiento Planta 3', category: 'Planta 3', route: '/', icon: Factory },
  { title: 'Concentrado en Plantas', category: 'Ambas', route: '/', icon: ChartColumnBig },
  { title: 'Tunel Planta 1', category: 'Planta 1', route: '/', icon: ThermometerSnowflake },
  { title: 'Tunel Planta 3', category: 'Planta 3', route: '/', icon: ThermometerSnowflake },
  { title: 'Cedis', category: 'Cedis', route: '/', icon: ThermometerSnowflake },
  { title: 'Cedis 2', category: 'Cedis', route: '/', icon: ThermometerSnowflake },
  { title: 'Combustoleo Planta 1', category: 'Planta 1', route: '/', icon: ThermometerSnowflake },
  { title: 'Combustoleo Planta 3', category: 'Planta 3', route: '/', icon: ThermometerSnowflake },
  { title: 'Corte Planta 3', category: 'Planta 3', route: '/', icon: ThermometerSnowflake },
  { title: 'Carry Over Planta 1', category: 'Planta 1', route: '/', icon: ThermometerSnowflake },
  { title: 'Grafica Carry Over Planta 1', category: 'Planta 1', route: '/', icon: ThermometerSnowflake },
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

  const { setTheme, theme} = useTheme();

  return (

    <section className='h-screen bg-[#2f2f2f]'>

      <NavBar />


      <div className="flex w-full h-auto  min-w-0 flex-col bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">

        <section className="sticky top-0 mt-4 grid grid-col-10">

          <div className='col-start-6 col-end-8'>
            <TabsMenu value={tab} onChange={handleTabChange} />
          </div>


          <div className="col-start-11">
            <Button
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Cambiar tema"
              className="rounded-full text-muted-foreground hover:text-foreground bg-white"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
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