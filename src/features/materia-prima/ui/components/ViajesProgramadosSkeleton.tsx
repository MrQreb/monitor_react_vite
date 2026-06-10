import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';

/**
 * Skeleton utilizado durante la carga de los viajes programados.
 *
 * @param props.rows Cantidad de filas simuladas.
 * @returns Tabla skeleton.
 */
export function ViajesProgramadosSkeleton({
  rows = 8,
}: {
  rows?: number
}) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="px-4 py-4">
            <Skeleton className="h-5 w-full max-w-[180px]" />
          </TableCell>

          <TableCell className="px-4 py-4">
            <Skeleton className="mx-auto h-5 w-[140px]" />
          </TableCell>

          <TableCell className="px-4 py-4">
            <Skeleton className="mx-auto h-6 w-[60px]" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}