import NavBar from "@/components/common/NavBar/NavBar"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Componente que muestra el Skeleton al cargar la grafica de temperaturas
 * @returns tsx componente
 */
export function SkeletonGrafica() {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />
            <div className="flex justify-center text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                    Planta 1
                </h1>
            </div>
            <section className="flex min-h-0 w-full flex-1 flex-col gap-4">
                <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/20 bg-white/5 p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <Skeleton className="h-6 w-40 rounded-md bg-white/20" />
                        <Skeleton className="h-6 w-20 rounded-md bg-white/20" />
                    </div>

                    <div className="grid flex-1 grid-cols-12 items-end gap-2 rounded-lg border border-white/10 bg-black/20 p-3">
                        <Skeleton className="h-[25%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[40%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[55%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[35%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[70%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[45%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[65%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[50%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[75%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[38%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[60%] w-full rounded-sm bg-white/20" />
                        <Skeleton className="h-[30%] w-full rounded-sm bg-white/20" />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <Skeleton className="h-4 w-full rounded bg-white/20" />
                        <Skeleton className="h-4 w-full rounded bg-white/20" />
                        <Skeleton className="h-4 w-full rounded bg-white/20" />
                    </div>
                </div>
            </section>
        </div>
    )
}