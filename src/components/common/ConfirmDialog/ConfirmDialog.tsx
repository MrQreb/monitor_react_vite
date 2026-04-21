import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
    trigger: React.ReactNode;
    title?: string;
    description?: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "default" | "destructive" | "secondary" | "outline";
    cancelVariant?: "default" | "ghost" | "outline";
    size?: "sm" | "md" | "lg" | "xl";
};

/**
 * Dialogo reutilizable para de confirmacion.
 * @param ConfirmDialogProps 
 */
export function ConfirmDialog({
    trigger,
    title = "¿Estás seguro?",
    description = "Esta acción no se puede deshacer.",
    onConfirm,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmVariant = "default",
    cancelVariant = "outline",
    size = "md",
}: ConfirmDialogProps) {

    const sizeClasses = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                className={cn(
                    "w-[95%] rounded-2xl",
                    "p-6 sm:p-8",         
                    sizeClasses[size],    
                )}
            >
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-lg sm:text-xl font-semibold">
                        {title}
                    </DialogTitle>

                    <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                    <DialogClose asChild>
                        <Button variant={cancelVariant} className="w-full sm:w-auto">
                            {cancelText}
                        </Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button
                            variant={confirmVariant}
                            onClick={onConfirm}
                            className="w-full sm:w-auto"
                        >
                            {confirmText}
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}