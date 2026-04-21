import type { UsuarioResponseDto } from '@/subsystems/usuarios/api/features/usuarios/dto';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type UsuarioCreadoStore = {
    usuario: UsuarioResponseDto | null;
    setUsuario: (usuario: UsuarioResponseDto | null) => void;
    clearUsuario: () => void;
};

export const useUsuarioCreadoStore = create<UsuarioCreadoStore>()(
    devtools(
        persist(
            (set) => ({
                usuario: null,
                isAuthenticated: false,
                setUsuario: (usuario) => set({ usuario }),
                clearUsuario: () => set({ usuario: null }),
            }),
            {
                name: 'usuario-creado-storage',
                storage: createJSONStorage(() => sessionStorage),
                partialize: (state) => ({ usuario: state.usuario }),
            }
        ),
        {
            name: 'usuario-store',
        }
    )
);

