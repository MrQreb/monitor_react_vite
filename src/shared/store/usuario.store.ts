import type { AuthResponseDto } from '@/subsystems/usuarios/api/features/autenticacion/dto/auth-response-dto';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type UsuarioStore = {
    usuario: AuthResponseDto | null;
    setUsuario: (usuario: AuthResponseDto | null) => void;
    clearUsuario: () => void;
    isAuthenticated:boolean;
    setIsAuthenticated: (authenticated:boolean) => void;
};

export const useUsuarioStore = create<UsuarioStore>()(
    devtools(
        persist(
            (set) => ({
                usuario: null,
                isAuthenticated: false,
                setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
                setUsuario: (usuario) => set({ usuario }),
                clearUsuario: () => set({ usuario: null }),
            }),
            {
                name: 'usuario-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({ usuario: state.usuario }),
            }
        ),
        {
            name: 'usuario-store',
        }
    )
);

