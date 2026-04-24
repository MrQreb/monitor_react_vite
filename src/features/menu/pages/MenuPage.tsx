import { useMemo, useState } from 'react';
import NavBar from '@/components/common/NavBar/NavBar';
import { Carrot, ChartColumnBig, Factory, ThermometerSnowflake } from 'lucide-react';
import { CardMenu } from '../components/CardMenu';
import { TabsMenu } from '../components/TabsMenu';


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

  return (
    <div className="flex w-full h-auto min-w-0 flex-col bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
      <NavBar />

      <div className="sticky top-0 mt-4 flex items-center justify-center">
        <TabsMenu value={tab} onChange={handleTabChange} />
      </div>

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
  );
};