import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const CrearPermisos = () => {
    return (

        <section className='w-full min-h-lvh'>

            <section className='flex justify-center'>


                <Card className='w-[75%]'>

                    <CardHeader>
                        <Label>No olvides seleccionar los permisos del usuario.</Label>
                    </CardHeader>

                    <CardContent className='space-y-4'>

                        <Input placeholder='Nombre de usuario' />
                        <Input placeholder='Nombre de usuario' />
                        <Input placeholder='Nombre de usuario' />
                        <Input placeholder='Nombre de usuario' />
                        <Input placeholder='Nombre de usuario' />


                    </CardContent>


                    <section className='space-x-6 w-full flex justify-center'>

                        <Button>
                            Crear
                        </Button>

                        <Button>
                            Resetear
                        </Button>

                    </section>

                    <CardFooter>
                        <Label>No olvides seleccionar los permisos del usuario.</Label>
                    </CardFooter>


                </Card>

            </section>

        </section>
    )
}
