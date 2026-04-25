import { tiempoMuertoService } from "../../api/instances/instances";
import { useQuery } from "@tanstack/react-query";

export const TIEMPOS_MUERTOS_QUERY_KEY = ["planta-3-tiempos-muertos"];

export const useTiempoMuertoQuery = () =>
    useQuery({
        queryKey: TIEMPOS_MUERTOS_QUERY_KEY,
        queryFn: () => tiempoMuertoService.getTiemposCurso(),
    });