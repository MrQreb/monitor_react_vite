import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
    /** Duracion del toast en milisegundos */
    duration: number;
    /** Mensaje del toast */
    message: string;
    /** Maximo de la temperatura */
    max: number;
    /** Temperatura actual a evaluar */
    value: number | null | undefined;
}

const TOAST_TITLE = "Temperatura fuera de los limites";

function ToastTemperaturaWarning({ message }: Pick<Props, "message">) {
    return (
        <div className="flex w-full items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-950/95 px-4 py-3 text-amber-50 shadow-lg shadow-black/20 animate-pulse md:max-w-91">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                !
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{TOAST_TITLE}</p>
                <p className="mt-1 text-sm font-semibold text-red-100/80">{message}</p>
            </div>
        </div>
    );
}

/** Muesta el toast en si rebasa el rango de temperaturas establecido */
export const useToastTemperatura = ({ duration, max, message, value }: Props) => {

    useEffect(() => {
        const isInvalidValue = typeof value !== "number" || Number.isNaN(value);

        if (isInvalidValue) {
            return;
        }

        const exceededMax = value > max;

        if (!exceededMax) {
            return;
        }

        toast.custom(() => <ToastTemperaturaWarning message={message} />, {
            duration,
            
        });
    }, [value]);

};

