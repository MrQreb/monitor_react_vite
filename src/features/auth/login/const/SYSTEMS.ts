import type { ISystem } from '../interface/system.interface';
import { Tags, Boxes, User } from 'lucide-react';

export let SYSTEMS: ISystem[] = [
    {
        id: 1,
        name: "App Tags",
        icon: Tags,
        urlImage: './assets/login/tag.svg',
        hasAccess: (usuario) => !!usuario?.sistemaAppTagsDto
    },
    {
        id: 2,
        name: "WEP",
        icon: Boxes,
        urlImage: './assets/login/wharehouse.svg',
        hasAccess: (usuario) => !!usuario?.sistemaWepDto
    },
    {
        id: 3,
        name: "Usuarios",
        icon: User,
        urlImage: './assets/login/users.svg',
        hasAccess: (usuario) => !!usuario?.sistemaUsuariosDto
    },
];