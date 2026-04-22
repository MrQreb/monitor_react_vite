import NavBar from '@/components/common/NavBar/NavBar'
import { Carrot, ChartColumnBig, Factory, ThermometerSnowflake } from 'lucide-react'
import { CardMenu } from '../components/CardMenu'

export const MenuPage = () => {
    return (
        <div className="flex w-full min-w-0 flex-col  bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            {/* <SelectScroll /> */}

            <section className='grid md:grid-cols-2 xl:grid-cols-3 gap-12 mt-8'>
                <CardMenu title={'Materia Prima Planta 1'} route={'/'} icon={Carrot} />
                <CardMenu title={'Seguimiento Planta 1'} route={'/'} icon={Factory} />
                <CardMenu title={'Materia Prima Planta 3'} route={'/'} icon={Carrot} />
                <CardMenu title={'Seguimiento Planta 3'} route={'/'} icon={Factory} />
                <CardMenu title={'Concentrado en Plantas'} route={'/'} icon={ChartColumnBig} />
                <CardMenu title={'Tunel Planta 1'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Tunel Planta 3'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Cedis'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Cedis 2'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Combustoleo Planta 1'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Combustoleo Planta 3'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Corte Planta 3'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Carry Over Planta 1'} route={'/'} icon={ThermometerSnowflake } />
                <CardMenu title={'Grafica Carry Over Planta 1'} route={'/'} icon={ThermometerSnowflake } />
            </section>

        </div>
    )
}

