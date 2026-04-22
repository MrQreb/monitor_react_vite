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
    <Card className="group overflow-hidden rounded-3xl border-0 bg-linear-to-br cursor-pointer from-[#223a62] via-[#25406b] to-[#355784] shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-transform duration-200 group-hover:-translate-y-1">
      <CardContent className="flex h-full min-h-60 flex-col items-center justify-between rounded-[2rem] bg-transparent px-6 py-8 text-white sm:px-8 sm:py-10">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 shadow-inner shadow-black/10 sm:h-24 sm:w-24">
            <Icon className="h-12 w-12 text-white sm:h-14 sm:w-14" strokeWidth={1.8} />
          </div>

          <div className="max-w-[32rem] text-balance text-2xl font-bold tracking-tight sm:text-[1.7rem]">
            {title}
          </div>
        </div>

        <Button
          asChild
          className="mt-8 h-14 w-full rounded-2xl bg-slate-100 text-lg font-semibold text-slate-900 shadow-none transition-colors hover:bg-white sm:w-[18rem]"
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
