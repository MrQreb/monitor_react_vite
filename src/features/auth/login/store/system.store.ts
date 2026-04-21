import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ISystem } from '../interface/system.interface';
import { SYSTEMS } from '../const/SYSTEMS';

interface SystemState {
    system: ISystem;
    setSystem: (system: ISystem) => void;
}

/**
 * Estado global para manejar la seleccion del sistema
 */
export const useSystemStore = create<SystemState>()(
    devtools(
        (set) => ({
            system: SYSTEMS[0],
            setSystem: (system) =>   set({ system }),
        }),
        {
            name: "system-store", //Verlo en devtools
        }
    )
);