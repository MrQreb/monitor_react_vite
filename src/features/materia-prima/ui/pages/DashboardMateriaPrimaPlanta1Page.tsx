import NavBar from "@/components/common/NavBar/NavBar";
import useSocketConnection from "@/shared/hooks/useConnetion";
import { NoConnection } from "@/components/common/NoConnection/NoConnection";
import { useBoletasPlanta1 } from "../hooks/useBoletasPlanta";
import { useEstatusPlanta1, useGetCajasPlanta1 } from "../hooks";
import { useBoletasCount } from "../hooks/useConteoBoletas";
import type { RangoFechasMateriaPrimaDto } from "../../api/shared/dto/rangoFechasMateriaPrimaDto.dto";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import {
    CalendarArrowUp,
    FileText,
    Package,
    Truck,
    TrendingUp,
} from "lucide-react";

export function DashboardMateriaPrimaPlanta1Page() {
    const [rangoFechas] = useState<RangoFechasMateriaPrimaDto>({
        fechaFin: "2026-06-01",
        fechaInicio: "2026-06-01",
    });

    const boletas = useBoletasPlanta1();
    const estatus = useEstatusPlanta1();
    const cajas = useGetCajasPlanta1();

    const connection = useSocketConnection();

    const contarBoletas = useBoletasCount({
        rangoFechasMateriaPrimaDto: rangoFechas,
    });

    if (!connection) return <NoConnection />;

    const totalBoletas = contarBoletas.data ?? 0;
    const totalCajas = cajas.data?.length ?? 0;
    const cajasEstimadas = 3000;
    const cumplimiento =
        cajasEstimadas > 0
            ? ((totalCajas / cajasEstimadas) * 100).toFixed(1)
            : "0";

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 md:h-screen md:px-3">
            <NavBar />

            <section className="mt-4 flex-1 overflow-hidden">
                <div className="grid h-full grid-cols-10 grid-rows-10 gap-4">

                    {/* HEADER */}
                    <div className="col-span-8 flex items-center">
                        <h1 className="text-3xl font-bold text-white">
                            Dashboard Planta 1
                        </h1>
                    </div>

                    <div className="col-span-2 flex justify-end">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button>
                                    Calendario
                                    <CalendarArrowUp />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0">
                                <Card>
                                    <CardContent className="p-0">
                                        <Calendar
                                            mode="range"
                                            numberOfMonths={2}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                        />
                                    </CardContent>
                                </Card>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* KPI BOLETAS */}
                    <Card className="col-span-2 row-span-2 border-zinc-800 bg-zinc-900">
                        <CardContent className="flex h-full flex-col justify-between p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">
                                    Boletas
                                </span>
                                <FileText size={20} />
                            </div>

                            <div className="text-4xl font-bold text-white">
                                {totalBoletas}
                            </div>
                        </CardContent>
                    </Card>

                    {/* KPI CAJAS */}
                    <Card className="col-span-2 row-span-2 border-zinc-800 bg-zinc-900">
                        <CardContent className="flex h-full flex-col justify-between p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">
                                    Cajas Recibidas
                                </span>
                                <Package size={20} />
                            </div>

                            <div className="text-4xl font-bold text-white">
                                {totalCajas}
                            </div>
                        </CardContent>
                    </Card>

                    {/* KPI ESTIMADAS */}
                    <Card className="col-span-2 row-span-2 border-zinc-800 bg-zinc-900">
                        <CardContent className="flex h-full flex-col justify-between p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">
                                    Estimadas
                                </span>
                                <Truck size={20} />
                            </div>

                            <div className="text-4xl font-bold text-white">
                                {cajasEstimadas}
                            </div>
                        </CardContent>
                    </Card>

                    {/* KPI CUMPLIMIENTO */}
                    <Card className="col-span-4 row-span-2 border-zinc-800 bg-zinc-900">
                        <CardContent className="flex h-full flex-col justify-between p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">
                                    Cumplimiento
                                </span>
                                <TrendingUp size={20} />
                            </div>

                            <div className="text-5xl font-bold text-green-500">
                                {cumplimiento}%
                            </div>
                        </CardContent>
                    </Card>

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
                    <Card className="col-span-3 row-span-4 border-zinc-800 bg-zinc-900">
                        <CardContent className="p-5">
                            <h2 className="mb-6 text-lg font-semibold text-white">
                                Estatus de Viajes
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">
                                        Registros
                                    </span>

                                    <span className="font-semibold text-white">
                                        {estatus.data?.length ?? 0}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-zinc-400">
                                        Boletas activas
                                    </span>

                                    <span className="font-semibold text-white">
                                        {boletas.data?.length ?? 0}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-zinc-400">
                                        Cajas registradas
                                    </span>

                                    <span className="font-semibold text-white">
                                        {totalCajas}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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