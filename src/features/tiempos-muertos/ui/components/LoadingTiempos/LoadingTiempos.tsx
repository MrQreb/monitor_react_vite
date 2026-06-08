import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

/** Spiner de carga de tiempos muertos
 * @returns Tsx component
 */
export const LoadingTiempos = () => {
    return (
        <Badge>
            Cargando tiempos muertos
            <Spinner />
        </Badge>
    )
}

