import { useMemo } from "react";
import type { TemperaturasDto } from "../../api/features/dto";

export type TemperaturaBuscar = 'temperatura1' | 'temperatura2' | 'temperatura3' | 'temperatura4'; 


interface Props{
    /** Arregla de las temperatuas */
    temperaturas: TemperaturasDto[];

    /** Nombre de la temperatura a buscar como: temperatura1, temperatura2... temperatura4 */
    temperaturaBuscar:TemperaturaBuscar;
}


/**
 * Custoom hook que permite recuperar la ultima temperatura de de la temperatura1 a la temperatura4
 * @param temperaturas, temperatura a buscar
 * @returns temperatura
 */
export const useGetLastTemperatura = ({ temperaturaBuscar, temperaturas}:Props) => {
    
    return useMemo(() => {
        const ultimoRegistro = temperaturas.at(-1);

        return ultimoRegistro ? Number(ultimoRegistro[temperaturaBuscar]) : null;
    }, [temperaturas, temperaturaBuscar]);
}

