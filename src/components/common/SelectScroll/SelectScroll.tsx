import { ArrowUpRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useScrollStore,
  type scrollMode,
} from '@/shared/store/use-scroll-store'

const modeLabels: Record<scrollMode, string> = {
  scroll: 'Scroll',
  auto: 'Automatica',
  manual: 'Manual',
}


/** Permite cambiar el tipo de scroll de los componentes */
export function SelectScroll() {
  const mode = useScrollStore((state) => state.mode)
  const setMode = useScrollStore((state) => state.setMode)

  return (
    <div className="flex w-full max-w-60  items-center gap-2 self-start rounded-[1.1rem] border border-black/35 bg-[#353535] px-4 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span className="text-[0.95rem] font-semibold">Scroll</span>
      <ArrowUpRight className="size-4 text-sky-300" />

      <Select value={mode} onValueChange={(value) => setMode(value as scrollMode)}>
        <SelectTrigger className="h-auto w-full min-w-0 border-0  p-0 text-[0.95rem] font-semibold text-white shadow-none ring-0 focus:ring-0 focus-visible:ring-0">
          <SelectValue placeholder="Selecciona un modo" />
        </SelectTrigger>
        <SelectContent align="start" className="border">
          {Object.entries(modeLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}