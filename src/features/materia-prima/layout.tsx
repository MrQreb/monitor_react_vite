import { Outlet } from '@tanstack/react-router'

export default function Layout() {
    return (
        <div className="flex min-h-screen w-full">

            {/* <UsuarioSidebar /> */}


            {/* Renderizar componentes hijos */}
            <Outlet />
        </div>
    )
}