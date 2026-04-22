import NavBar from '@/components/common/NavBar/NavBar'
import { Carrot, ChartColumnBig, Factory, ThermometerSnowflake } from 'lucide-react'
import { CardMenu } from '../components/CardMenu'

const menuItems = [
  { title: 'Materia Prima Planta 1', route: '/', icon: Carrot },
  { title: 'Seguimiento Planta 1', route: '/', icon: Factory },
  { title: 'Materia Prima Planta 3', route: '/', icon: Carrot },
  { title: 'Seguimiento Planta 3', route: '/', icon: Factory },
  { title: 'Concentrado en Plantas', route: '/', icon: ChartColumnBig },
  { title: 'Tunel Planta 1', route: '/', icon: ThermometerSnowflake },
  { title: 'Tunel Planta 3', route: '/', icon: ThermometerSnowflake },
  { title: 'Cedis', route: '/', icon: ThermometerSnowflake },
  { title: 'Cedis 2', route: '/', icon: ThermometerSnowflake },
  { title: 'Combustoleo Planta 1', route: '/', icon: ThermometerSnowflake },
  { title: 'Combustoleo Planta 3', route: '/', icon: ThermometerSnowflake },
  { title: 'Corte Planta 3', route: '/', icon: ThermometerSnowflake },
  { title: 'Carry Over Planta 1', route: '/', icon: ThermometerSnowflake },
  { title: 'Grafica Carry Over Planta 1', route: '/', icon: ThermometerSnowflake },
]

export const MenuPage = () => {
  return (
    <div className="flex w-full min-w-0 flex-col bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
      <NavBar />

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-12 mt-8">
        {menuItems.map((item, index) => (
          <CardMenu
            key={index}
            title={item.title}
            route={item.route}
            icon={item.icon}
          />
        ))}
      </section>
    </div>
  )
}