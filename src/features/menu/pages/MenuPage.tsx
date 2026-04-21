import NavBar from '@/components/common/NavBar/NavBar'
import { Shield } from 'lucide-react'
import { CardMenu } from '../components/SystemCard'

export const MenuPage = () => {
    return (
        <div className="flex w-full min-w-0 flex-col  bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            {/* <ModoDashboard /> */}

            <section className='grid md:grid-cols-2 xl:grid-cols-3 gap-12 mt-8'>
                <CardMenu title={'Planta'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
                <CardMenu title={'Hola'} route={'/'} icon={Shield} />
            </section>

        </div>
    )
}

