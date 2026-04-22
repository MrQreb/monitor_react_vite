import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export type scrollMode = 'auto' | 'scroll' | 'manual'

type UseScrollStore = {
  mode: scrollMode
  setMode: (mode: scrollMode) => void
}

export const useScrollStore = create<UseScrollStore>()(
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
      name: 'scroll-store',
    }
  )
)