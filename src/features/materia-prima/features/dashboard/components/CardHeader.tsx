import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner";
import type { LucideProps } from "lucide-react"

interface Props {
    /** Valor del texto de la tarjeta */
    value: string;
    /** Icono de Lucide Icons */
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    /** Texto de la tarjeta */
    text: string;
    /** tamano del icono */
    sizeIcon?: number;
    /** clases de tailwind */
    className?: string;
    /** estado de carga de la feching de la data */
    isLoading?: boolean;
}

/** Tarjeta metricas del dashboard de materia prima */
export const CardHeader = ({
    icon,
    text,
    value,
    sizeIcon = 20,
    className,
    isLoading = false
}: Props) => {
    const Icon = icon

    return (
        <Card
            className={`
        border-border
        bg-card
        text-card-foreground
        shadow-sm
        ${className ?? ""}
      `}
        >
            <CardContent className="flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        {text}
                    </span>

                    <Icon
                        size={sizeIcon}
                        className="text-muted-foreground"
                    />
                </div>

                {!isLoading &&
                    (
                        <div className="text-4xl font-bold tracking-tight text-foreground">
                            {value}
                        </div>
                    )
                }

                {isLoading &&
                    (
                        <div className="text-4xl font-bold tracking-tight text-foreground">
                            <Spinner />
                        </div>
                    )
                }

            </CardContent>
        </Card>
    )
}