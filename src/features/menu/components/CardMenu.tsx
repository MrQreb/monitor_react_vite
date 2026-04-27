import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type CardMenuProps = {
  title: string
  route: string
  icon: LucideIcon
  buttonText?: string
}

/** Componente  de tarjeta para navegar entre las distintas pantallas */
export function CardMenu({ title, route, icon: Icon, buttonText = "Ir" }: CardMenuProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_35px_rgba(15,23,42,0.08)] transition-transform duration-200 group-hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_16px_35px_rgba(0,0,0,0.25)]">
      <CardContent className="flex h-full min-h-60 flex-col items-center justify-between rounded-[2rem] bg-transparent px-6 py-8 text-slate-900 dark:text-slate-100 sm:px-8 sm:py-10">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-inner shadow-black/5 dark:bg-slate-800 dark:text-slate-200 sm:h-24 sm:w-24">
            <Icon className="h-12 w-12 sm:h-14 sm:w-14" strokeWidth={1.8} />
          </div>

          <div className="max-w-lg text-balance text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[1.7rem]">
            {title}
          </div>
        </div>

        <Button
          asChild
          className="mt-8 h-14 w-full rounded-2xl bg-slate-900 text-lg font-semibold text-white shadow-none transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white sm:w-[18rem]"
        >
          <Link to={route}>
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
