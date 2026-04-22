import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
import { WifiOff } from "lucide-react"

export function NoConnection() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 p-6">
      <Empty className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl border border-dashed rounded-3xl shadow-md bg-background p-10">
        
        <EmptyHeader className="items-center text-center space-y-4">
          <EmptyMedia variant="icon">
            <WifiOff className="size-12 md:size-16" />
          </EmptyMedia>

          <EmptyTitle className="text-2xl md:text-3xl font-semibold">
            Sin conexión
          </EmptyTitle>

          <EmptyDescription className="text-base md:text-lg max-w-xl">
            Se perdió la conexión con el servidor. Estamos intentando reconectar automáticamente.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="flex flex-col items-center gap-4 mt-6">
          <Button variant="outline" size="lg" disabled>
            Reconectando...
          </Button>
          <Spinner className="size-6 md:size-8" />
        </EmptyContent>

      </Empty>
    </div>
  )
}