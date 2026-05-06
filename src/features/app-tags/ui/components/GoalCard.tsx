/** Tarjeta que muestra el significado de los colores de la gráfica de las lineas por color.
 * @returns tsx component
 */
export function GoalCard() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 shadow-[0_10px_26px_-22px_rgba(15,23,42,0.55)] transition-all duration-300 hover:border-zinc-300/90 hover:shadow-[0_16px_28px_-22px_rgba(15,23,42,0.45)]">

      <div className="relative flex items-center justify-between gap-2 pl-2">
        <p className="text-md font-bold uppercase tracking-[0.16em] text-slate-700">Objetivos</p>
      </div>

      <section className="grid grid-cols-4">

        <div className="flex justify-center gap-2">
          <div className="size-4 rounded-full bg-yellow-300"></div>
          <p className="font-semibold text-black">Presupuesto</p>
        </div>

        <div className="flex justify-center gap-2">
          <div className="size-4 rounded-full bg-blue-600"></div>
          <p className="font-semibold text-black">Objetivo</p>
        </div>


        <div className="flex justify-center gap-2">
          <div className="size-4 rounded-full bg-green-600"></div>
          <p className="font-semibold text-black">Goal</p>
        </div>

        <div className="flex justify-center gap-2">
          <div className="size-4 rounded-full bg-gray-300"></div>
          <p className="font-semibold text-black">Default</p>
        </div>

      </section>


    </div>
  )
}