import type { CardSize } from "../ui/components";

/** Clase que contiene la logica para pintar las tarjeta y los grid en base en ciertos parametros */
export class GridLayoutCalculator {
  /** Obtiene el numero de columns del grid
   * @param data: T[]
   * @returns number
   */
  static getColumnsGrid<T>(data: T[]): number {
    return data.length <= 6
      ? 3
      : data.length <= 12
        ? 6
        : data.length <= 18
          ? 8
          : data.length <= 24
            ? 10
            : 12;
  }

  /** Obtiene el tamano de la tarjeta  
   * @returns CardSize
   */
  static getSizeCard(columnsNumber: number): CardSize {
    if (columnsNumber <= 3) {
      return "large";
    }

    if (columnsNumber <= 6) {
      return "medium";
    }

    if (columnsNumber <= 8) {
      return "small";
    }

    return "xxsmall";
  }
}
