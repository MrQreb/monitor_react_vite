import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface Props {
    name:string;
    userName:string;
    imageUrl?:string;
    onClick: () => void;
    disabledButton: boolean;
}

/**
 * Carta del usaurio que se le asignan los roles o modifican los roles
 * @param Props
 */
export const UsuarioCard = ({ disabledButton, name, onClick, imageUrl, userName }:Props) => {
    return (
        <Card className="w-full">
            <CardContent className="flex items-center gap-4">

                <Avatar className="h-12 w-12">
                    <AvatarImage src={imageUrl} alt="usuario" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>


                <div className="flex flex-col">
                    <Label className="font-semibold text-lg">
                        {name}
                    </Label>
                    <Label className="text-sm text-muted-foreground">
                        {userName}
                    </Label>
                </div>

                <Button
                    disabled={disabledButton}
                    onClick={onClick}
                    className="ml-auto cursor-pointer"
                >
                    Añadir Roles
                    <Shield />
                </Button>

            </CardContent>
        </Card>
    )
}
