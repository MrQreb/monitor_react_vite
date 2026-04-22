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

  /**
   * Habilita o deshabilita el scroll automático.
   *
   * Permite controlar la animación desde estado externo (ej. Zustand).
   *
   * @default true
   */
  enabled?: boolean;
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
 *   enabled: scroll.mode === "auto",
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
  enabled = true,
}: UseAutoScrollProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const el = containerRef.current;
    if (!el) return;

    const totalScroll = el.scrollHeight - el.clientHeight;
    if (totalScroll <= 0) return;

    const duration = itemCount * msPerItem;

    let startTime: number | null = null;
    let direction: 1 | -1 = 1;
    let animationFrame: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      let percent = elapsed / duration;

      if (percent >= 1) {
        percent = 1;

        timeoutId = setTimeout(() => {
          direction *= -1;
          startTime = null;
          animationFrame = requestAnimationFrame(animate);
        }, pauseOnEnd);

        el.scrollTop = direction === 1 ? totalScroll : 0;
        return;
      }

      const value = direction === 1 ? percent : 1 - percent;

      el.scrollTop = totalScroll * value;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [itemCount, msPerItem, pauseOnEnd, enabled]);

  return { containerRef };
};