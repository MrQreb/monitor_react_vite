import { ArrowUpRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  type MateriaPrimaDashboardMode,
  useMateriaPrimaDashboardStore,
} from '@/shared/store/materia-prima-dashboard.store'

const modeLabels: Record<MateriaPrimaDashboardMode, string> = {
  scroll: 'Scroll',
  auto: 'Auto',
  manual: 'Manual',
}

export function ModoDashboard() {
  const mode = useMateriaPrimaDashboardStore((state) => state.mode)
  const setMode = useMateriaPrimaDashboardStore((state) => state.setMode)

  return (
    <div className="flex w-full max-w-70 items-center gap-2 self-start rounded-[1.1rem] border border-black/35 bg-[#353535] px-4 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span className="text-[0.95rem] font-semibold">Modo</span>
      <ArrowUpRight className="size-4 text-sky-300" />
      <span className="text-[0.95rem] font-semibold">:</span>

      <Select value={mode} onValueChange={(value) => setMode(value as MateriaPrimaDashboardMode)}>
        <SelectTrigger className="h-auto w-full min-w-0 border-0 bg-transparent p-0 text-[0.95rem] font-semibold text-white shadow-none ring-0 focus:ring-0 focus-visible:ring-0">
          <SelectValue placeholder="Selecciona un modo" />
        </SelectTrigger>
        <SelectContent align="start" className="border border-border/60 bg-popover text-popover-foreground">
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