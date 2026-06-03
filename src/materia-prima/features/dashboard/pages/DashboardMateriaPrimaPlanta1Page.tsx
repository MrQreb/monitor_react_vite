import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/common/NavBar/NavBar";
import useSocketConnection from "@/shared/hooks/useConnetion";
import { NoConnection } from "@/components/common/NoConnection/NoConnection";
import { useBoletasPlanta1 } from "../../../ui/hooks/useBoletasPlanta";
import { useEstatusPlanta1, useGetCajasPlanta1 } from "../../../ui/hooks";
import { useBoletasCount } from "../hooks/useConteoBoletas";
import type { RangoFechasMateriaPrimaDto } from "../../../api/shared/dto/rangoFechasMateriaPrimaDto.dto";
import {
    FileText,
    Trash2,
    Calendar1,
    PackageOpen,
    Package2,
} from "lucide-react";
import { CardHeader } from '../components/CardHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ButtonCalendar } from "../components/ButtonCalendar";
import { useMateriaPrimaResumen } from "../hooks/useMateriaPrimaResumen";
import { GraficaCajas } from "@/materia-prima/ui/components/GraficaCajas";
import { ModeToggle } from "@/components/common/ModeTogle/ModeTogle";
import { ThemeButton } from "@/features/menu/components/ThemeButton";

export function DashboardMateriaPrimaPlanta1Page() {

    /** Formatea de string para que parezca cantidad.
     * @example 20000 => 20,0000
     * @returns string
     */
    const formatText = (value: string | number) => {
        const formattedText = String(value.toLocaleString("es-MX"));
        return formattedText;
    }

    /** Estado que maneja el rango de busquedas de fecha */
    const [rangoFechas, setRangoFechas] =
        useState<RangoFechasMateriaPrimaDto>(
            {
                fechaInicio: null,
                fechaFin: null,
            }
        );

    /** Resetea el rango de fechas */
    const handleRestFecha = (): void => {
        setRangoFechas(
            {
                fechaFin: null,
                fechaInicio: null
            }
        );
    }

    /** Custoom hooks que implementan websockets */
    const boletas = useBoletasPlanta1();
    const estatus = useEstatusPlanta1();
    const cajas = useGetCajasPlanta1();

    const connection = useSocketConnection();

    /** Hooks de use query para datos */
    const contarBoletas = useBoletasCount({
        rangoFechasMateriaPrimaDto: rangoFechas,
    });

    const resumenMateriaPrima = useMateriaPrimaResumen({
        rangoFechasMateriaPrimaDto: rangoFechas,
    });

    const totalBoletas = formatText(contarBoletas.data ?? 0);
    const totalCajas = formatText(cajas.data?.length ?? 0);
    const cajasEstimadas = formatText(resumenMateriaPrima.data?.estimado ?? 0);
    const cajasRecibidas = formatText(resumenMateriaPrima.data?.real ?? 0);

    if (!connection) return <NoConnection />;

    return (
        <div className="flex min-h-screen flex-col  dark:bg-zinc-950 md:h-screen md:px-3">
            <NavBar />

            <section className="mt-4 flex-1 overflow-hidden">
                <div className="grid h-full grid-cols-10 grid-rows-10 gap-4">

                    {/* HEADER */}
                    <section className="col-span-7 flex items-center">

                        <div className="flex flex-row gap-4">

                            <h1 className="text-3xl font-bold dark:text-white">
                                Materia Prima Planta 1
                            </h1>
                            <Badge variant={'secondary'} className="flex items-center gap-2">
                                <Calendar1 size={14} />
                                {rangoFechas.fechaInicio && rangoFechas.fechaFin
                                    ? `${rangoFechas.fechaInicio} - ${rangoFechas.fechaFin}`
                                    : new Date().toISOString().split("T")[0]
                                }
                            </Badge>

                        </div>

                    </section>

                    <div className="col-span-2 flex justify-end">
                        <div className="flex gap-4">
                            <ButtonCalendar
                                value={rangoFechas}
                                onChange={setRangoFechas}
                            />
                            <Button
                                variant={'destructive'}
                                onClick={handleRestFecha}
                            >
                                <Trash2 />
                            </Button>
                            <ThemeButton />
                        </div>

                    </div>

                    {/* Tarjetas con datos */}
                    <div className="col-span-2 row-span-2">
                        <CardHeader
                            text="Boletas"
                            value={String(totalBoletas)}
                            icon={FileText}
                        />
                    </div>

                    <div className="col-span-2 row-span-2">
                        <CardHeader
                            text="Cajas Recibidas"
                            value={String(cajasRecibidas?.toString())}
                            icon={Package2}
                        />
                    </div>

                    <div className="col-span-2 row-span-2">
                        <CardHeader
                            text="Cajas Estimadas"
                            value={String(cajasEstimadas)}
                            icon={PackageOpen}
                        />
                    </div>

                    {/* <div className="col-span-4 row-span-2">
                        <CardHeader
                            text="Cumplimiento"
                            value={`${cumplimiento}%`}
                            icon={TrendingUp}
                            sizeIcon={24}
                        />
                    </div> */}

                    {/* GRAFICA PRINCIPAL */}
                    <Card className="col-span-7 row-span-4 border-zinc-800 bg-zinc-900">
                        <CardContent className="h-full p-5">
                            <h2 className="mb-4 text-lg font-semibold text-white">
                                Cajas recibidas por día
                            </h2>

                            <div className="flex h-[90%] items-center justify-center rounded-lg border border-dashed border-zinc-700">
                                <span className="text-zinc-500">
                                    Tabla
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ESTATUS */}
                    <section className="col-span-3 row-span-4">
                        <GraficaCajas cajas={cajas.data ?? []} />
                    </section>

                    {/* TABLA / RESUMEN */}
                    <Card className="col-span-10 row-span-3 border-zinc-800 bg-zinc-900">
                        <CardContent className="h-full p-5">
                            <h2 className="mb-4 text-lg font-semibold text-white">
                                Últimas Boletas
                            </h2>

                            <div className="flex h-[85%] items-center justify-center rounded-lg border border-dashed border-zinc-700">
                                <span className="text-zinc-500">
                                    Tabla
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </section>
        </div>
    );
}