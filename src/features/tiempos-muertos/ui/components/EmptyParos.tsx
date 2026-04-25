import { BellRing } from "lucide-react"
import {
  Empty,
  EmptyDescription,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

/** Card de paros vacio */
export function EmptyParos() {
  return (
    <Empty className="mx-auto w-full max-w-2xl bg-card rounded-2xl border border-border/70  px-6 py-9 shadow-xs">
      <EmptyHeader className="gap-2.5">
        <EmptyMedia
          variant="icon"
          className="size-10 rounded-lg border border-border/70 bg-muted/60 text-muted-foreground [&_svg:not([class*='size-'])]:size-4.5"
        >
          <BellRing />
        </EmptyMedia>

        <EmptyTitle className="text-base font-semibold text-foreground">Operacion estable</EmptyTitle>
        <EmptyDescription className="max-w-sm text-pretty text-muted-foreground">
          Sin paros de máquinas por el momento.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-1 max-w-md text-xs text-muted-foreground">
        Las nuevas alertas apareceran aqui en tiempo real.
      </EmptyContent>
    </Empty>
  )
}
