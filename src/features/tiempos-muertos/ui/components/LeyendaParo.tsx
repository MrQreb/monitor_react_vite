
export const LeyendaParo = () => {
    return (
        <div className="grid grid-cols-1 gap-3 text-xs text-muted-foreground sm:grid-cols-2 xl:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="font-medium">Normal</span>
                <span className="text-muted-foreground/80">menos de 5 min</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="font-medium">Atencion</span>
                <span className="text-muted-foreground/80">5 a 30 min</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="font-medium">Critico</span>
                <span className="text-muted-foreground/80">mas de 30 min</span>
            </div>
        </div>
    )
}

