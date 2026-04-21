import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { CornerUpLeft } from "lucide-react"
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from "@tanstack/react-router";

export function UsuarioNotFound() {

    const navigate = useNavigate();

    return (
        <Card>
            <CardContent>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia>
                            <div className="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                                <Avatar>
                                    <AvatarImage src="/assets/usuarios/coronel.jpg" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </EmptyMedia>
                        <EmptyTitle>Sin usuario seleccionado</EmptyTitle>
                        <EmptyDescription>
                            Selecciono o crea un usuario para los roles.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button
                            onClick={() => navigate({ to: "/usuarios" })}
                        >
                            <CornerUpLeft />
                            Volver
                        </Button>
                    </EmptyContent>
                </Empty>
            </CardContent>
        </Card>
    )
}
