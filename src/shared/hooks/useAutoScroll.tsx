import { useEffect, useRef } from "react";

/**
 * Props de configuración para el hook {@link useAutoScroll}.
 */
type UseAutoScrollProps = {
  /**
   * Número total de elementos renderizados dentro del contenedor.
   *
   * Se utiliza para calcular la duración total del scroll.
   * A mayor número de elementos, más lenta será la animación.
   *
   * @example
   * 20
   */
  itemCount: number;

  /**
   * Tiempo en milisegundos que tarda en desplazarse cada elemento.
   *
   * Controla la velocidad del scroll:
   * - Valores bajos → scroll más rápido
   * - Valores altos → scroll más lento
   *
   * @default 800
   *
   * @example
   * 600 // rápido
   * 1200 // lento
   */
  msPerItem?: number;

  /**
   * Tiempo de pausa en milisegundos cuando el scroll llega
   * al inicio o al final antes de invertir la dirección.
   *
   * @default 1500
   *
   * @example
   * 2000 // pausa de 2 segundos
   */
  pauseOnEnd?: number;
};

/**
 * Hook para implementar un **scroll automático vertical tipo "ping-pong"** (sube y baja)
 * dentro de un contenedor con overflow.
 *
 * Combina `requestAnimationFrame` con control manual del scroll para lograr
 * una animación continua, suave y sin reinicios bruscos.
 *
 * ---
 *
 * ### Funcionamiento
 *
 * 1. Calcula el scroll máximo disponible (`scrollHeight - clientHeight`)
 * 2. Anima el desplazamiento de:
 *    - arriba → abajo
 *    - abajo → arriba
 * 3. Aplica una pausa en cada extremo
 * 4. Repite el ciclo infinitamente
 *
 *
 * #### Consideraciones
 *
 * - El contenedor debe tener `overflow: auto` o `overflow: scroll`
 * - Debe existir contenido suficiente para generar scroll
 * - Si `scrollHeight === clientHeight`, la animación no se ejecutará
 *
 * ---
 *
 * ## Retorno
 *
 * @returns {{
 *   containerRef: React.RefObject<HTMLDivElement | null>
 * }}
 *
 * Referencia que debe asignarse al contenedor scrollable.
 *
 * ---
 *
 * #### Ejemplo de uso
 *
 * ```tsx
 * const { containerRef } = useAutoScroll({
 *   itemCount: viajes.length,
 *   msPerItem: 700,
 * });
 *
 * return (
 *   <div ref={containerRef} className="overflow-auto h-full">
 *     <Table>...</Table>
 *   </div>
 * );
 * ```
 */
export const useAutoScroll = ({
  itemCount,
  msPerItem = 800,
  pauseOnEnd = 1500,
}: UseAutoScrollProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const totalScroll = el.scrollHeight - el.clientHeight;
    if (totalScroll <= 0) return;

    const duration = itemCount * msPerItem;

    let startTime: number | null = null;
    let direction: 1 | -1 = 1; // 1 = hacia abajo, -1 = hacia arriba
    let animationFrame: number;

    /**
     * Función principal de animación.
     * Se ejecuta en cada frame usando requestAnimationFrame.
     */
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      let percent = elapsed / duration;

      if (percent >= 1) {
        percent = 1;

        /**
         * Pausa en el extremo y cambio de dirección.
         */
        setTimeout(() => {
          direction *= -1;
          startTime = null;
          animationFrame = requestAnimationFrame(animate);
        }, pauseOnEnd);

        /**
         * Ajuste final para evitar frames inconsistentes.
         */
        el.scrollTop =
          direction === 1 ? totalScroll : 0;

        return;
      }

      /**
       * Calcula el progreso dependiendo de la dirección.
       */
      const value =
        direction === 1
          ? percent
          : 1 - percent;

      el.scrollTop = totalScroll * value;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    /**
     * Cleanup: cancela la animación al desmontar el componente.
     */
    return () => cancelAnimationFrame(animationFrame);
  }, [itemCount, msPerItem, pauseOnEnd]);

  return { containerRef };
};