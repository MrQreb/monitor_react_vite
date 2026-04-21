import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export type MateriaPrimaDashboardMode = 'scroll' | 'auto' | 'manual'

type MateriaPrimaDashboardStore = {
  mode: MateriaPrimaDashboardMode
  setMode: (mode: MateriaPrimaDashboardMode) => void
}

export const useMateriaPrimaDashboardStore = create<MateriaPrimaDashboardStore>()(
  devtools(
    persist(
      (set) => ({
        mode: 'scroll',
        setMode: (mode) => set({ mode }),
      }),
      {
        name: 'materia-prima-dashboard-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ mode: state.mode }),
      }
    ),
    {
      name: 'materia-prima-dashboard-store',
    }
  )
)