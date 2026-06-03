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

import type { ViajeEstatusDto } from "../../api/features/dto"
import { useAutoScroll } from "@/shared/hooks/useAutoScroll"
import { useScrollStore } from "@/shared/store/use-scroll-store"
import { useTheme } from "@/app/providers/ThemeProvider"
import { cn } from "@/lib/utils"

type Props = {
  viajes: ViajeEstatusDto[]
}

const emptyCell = (value: string | null | undefined) =>
  value?.trim() || ""

export function EstatusViaje({ viajes }: Props) {
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
    hover: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
  }

  const { containerRef } = useAutoScroll({
    itemCount: viajes.length,
    msPerItem: 1500,
    enabled: scroll.mode === "auto",
  })

  return (
    <Card
      className={cn(
        "flex h-full w-full min-w-0 flex-col",
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
          Estatus de viajes
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col px-0 pt-0 pb-0">
        <div ref={containerRef} className="h-0 flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow
                className="border-b"
                style={{ borderColor: colores.borde }}
              >
                {[
                  "Rancho",
                  "Producto",
                  "Estatus / Folio",
                  "Centro",
                  "Hora Pes",
                  "Hora Eva",
                  "Hora Imp",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-center text-sm font-medium sm:text-base lg:text-lg"
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
                  key={`${viaje.rancho}-${viaje.ticket}-${index}`}
                  className="align-top transition-colors"
                  style={{
                    borderColor: colores.borde,
                  }}
                >
                  <TableCell
                    className="px-4 py-5 text-left text-xs sm:text-sm lg:text-[1.02rem]"
                    style={{ color: colores.texto }}
                  >
                    {viaje.rancho}
                  </TableCell>

                  <TableCell
                    className="px-4 py-5 text-left text-xs sm:text-sm lg:text-[1.02rem]"
                    style={{ color: colores.texto }}
                  >
                    {viaje.producto}
                  </TableCell>

                  <TableCell
                    className="px-4 py-5 text-center text-xs sm:text-sm lg:text-[1.02rem]"
                    style={{ color: colores.texto }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{viaje.estatus}</span>
                      <span className="text-base font-bold sm:text-xl">
                        {emptyCell(viaje.folio)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell
                    className="px-4 py-5 text-center text-xs sm:text-sm lg:text-[1.02rem]"
                    style={{ color: colores.texto }}
                  >
                    {emptyCell(viaje.centro_corte)}
                  </TableCell>

                  <TableCell
                    className="px-4 py-5 text-center text-sm sm:text-lg"
                    style={{ color: colores.texto }}
                  >
                    {emptyCell(viaje.hora_pesaje)}
                  </TableCell>

                  <TableCell
                    className="px-4 py-5 text-center text-sm sm:text-lg"
                    style={{ color: colores.texto }}
                  >
                    {emptyCell(viaje.hora_evaluacion)}
                  </TableCell>

                  <TableCell
                    className="px-4 py-5 text-center text-sm sm:text-lg"
                    style={{ color: colores.texto }}
                  >
                    {emptyCell(viaje.hora_impresion)}
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