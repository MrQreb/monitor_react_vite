import { Card, CardContent } from "@/components/ui/card"
import type { LucideProps } from "lucide-react"

interface Props {
  value: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >
  text: string
  sizeIcon?: number
  className?: string
}

export const CardHeader = ({
  icon,
  text,
  value,
  sizeIcon = 20,
  className,
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

        <div className="text-4xl font-bold tracking-tight text-foreground">
          {value}
        </div>
      </CardContent>
    </Card>
  )
}