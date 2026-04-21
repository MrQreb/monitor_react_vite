import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from '@tanstack/react-router';

export const TabsSistemas = () => {

    const navigate = useNavigate();

    return (
        <Tabs defaultValue="usuarios">
            <TabsList variant="line">
                <TabsTrigger onClick={() => navigate({to:'/usuarios/usuario/asignar-roles'})} value="usuarios">Usuarios</TabsTrigger>
                <TabsTrigger onClick={() => navigate({to:'/wep/asignar-permisos'})} value="wep">WEP</TabsTrigger>
                <TabsTrigger value="apptags">AppTags</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
