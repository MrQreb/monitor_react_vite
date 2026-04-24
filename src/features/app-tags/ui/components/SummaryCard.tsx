/**
 * Tarjeta de resumen para los indicadores superiores.
 */
export type SummaryCardProps = {
  title: string
  amount: number
  accentColor: string
  glowColor: string
}

/** Formato numerico entero para totales y eje Y. */
const wholeNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

/** Tarjeta que muestra la sumatoria
 * @returns Tsx component
 */
export function SummaryCard({ title, amount, accentColor, glowColor }: SummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 shadow-[0_10px_26px_-22px_rgba(15,23,42,0.55)] transition-all duration-300 hover:border-zinc-300/90 hover:shadow-[0_16px_28px_-22px_rgba(15,23,42,0.45)]">
      <span className="absolute inset-y-3 left-0 w-0.75 rounded-full" style={{ backgroundColor: accentColor }} />
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full opacity-50 blur-2xl"
        style={{ backgroundColor: glowColor }}
      />
      <div className="relative flex items-center justify-between gap-2 pl-2">
        <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-slate-500">{title}</p>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>
      <p className="relative pl-2 pt-0.5 text-[11px] font-medium text-slate-400">Libras procesadas</p>
      <p className="relative pl-2 pt-1 text-right text-[1.5rem] font-semibold leading-none tracking-tight text-slate-900">
        {wholeNumberFormatter.format(Math.round(amount))}
      </p>
    </div>
  )
}