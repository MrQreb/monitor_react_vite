import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useAutoScroll } from "@/shared/hooks/useAutoScroll"
import { useScrollStore } from "@/shared/store/use-scroll-store"
import { useTheme } from "@/app/providers/ThemeProvider"
import { cn } from "@/lib/utils"

type ViajeProgramado = {
  agricultor: string
  producto: string
  cantidad: number
}

type Props = {
  viajes: ViajeProgramado[]
}

export function ViajesProgramados({ viajes }: Props) {
  const scroll = useScrollStore()
  const { theme } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const colores = {
    titulo: isDark ? "#e4e4e7" : "#18181b",
    texto: isDark ? "#a1a1aa" : "#52525b",
    encabezado: isDark ? "#d4d4d8" : "#64748b",
    borde: isDark ? "#27272a" : "#e4e4e7",
    fondo: isDark ? "#18181b" : "#ffffff",
  }

  const { containerRef } = useAutoScroll({
    itemCount: viajes.length,
    msPerItem: 1500,
    enabled: scroll.mode === "auto",
  })

  return (
    <Card
      className={cn(
        "flex h-full w-full min-h-0 flex-col",
        "rounded-3xl border",
        isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white",
        "shadow-none"
      )}
    >
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle
          className="text-[1.15rem] font-extrabold"
          style={{ color: colores.titulo }}
        >
          Viajes Programados
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col px-0 pt-0 pb-0">
        <div ref={containerRef} className="h-0 flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: colores.borde }}>
                {["Rancho", "Producto", "Cajas"].map((h) => (
                  <TableHead
                    key={h}
                    className="text-center text-base font-medium sm:text-lg"
                    style={{ color: colores.encabezado }}
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {viajes?.map((viaje, index) => (
                <TableRow
                  key={`${viaje.agricultor}-${viaje.producto}-${index}`}
                  style={{ borderColor: colores.borde }}
                  className="transition-colors"
                >
                  <TableCell
                    className="px-4 py-4 text-left text-sm sm:text-[1.05rem]"
                    style={{ color: colores.texto }}
                  >
                    {viaje.agricultor}
                  </TableCell>

                  <TableCell
                    className="px-4 py-4 text-center text-sm font-medium sm:text-[1.05rem]"
                    style={{ color: colores.texto }}
                  >
                    {viaje.producto}
                  </TableCell>

                  <TableCell
                    className="px-4 py-4 text-center text-lg sm:text-xl"
                    style={{ color: colores.texto }}
                  >
                    {viaje.cantidad}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}