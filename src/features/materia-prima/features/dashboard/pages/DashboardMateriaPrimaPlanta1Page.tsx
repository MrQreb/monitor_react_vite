import { CardContent } from "@/components/ui/card";
import { useState } from "react";
import NavBar from "@/components/common/NavBar/NavBar";
import type { RangoFechasMateriaPrimaDto } from "../../../api/shared/dto/rangoFechasMateriaPrimaDto.dto";
import { CardHeader } from '../components/CardHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetBoletas } from "../hooks/useGetBoletas";
import { ButtonCalendar } from "../components/ButtonCalendar";
import { ViajesProgramadosV2 } from '../../../ui/components/ViajesProgramadosV2';
import { useMateriaPrimaResumen } from "../hooks/useMateriaPrimaResumen";
import { ThemeButton } from "@/features/menu/components/ThemeButton";
import { useGetCajasPlanta1 } from "@/features/materia-prima/ui/hooks";
import {
    FileText,
    Trash2,
    Calendar1,
    PackageOpen,
    Package2,
    Truck,
} from "lucide-react";
import { useQueryCajas } from "../hooks/useQueryCajas";
import { useBoletasCount } from "../hooks/useBoletasCount";
import { GraficaCajasV2 } from "@/features/materia-prima/ui/components/GraficaCajasV2";

export function DashboardMateriaPrimaPlanta1Page() {

    /** Fecha actual utilizada como valor por defecto */
    const today = new Date().toISOString().split("T")[0];

    /** Estado que maneja el rango de búsqueda de fechas */
    const [rangoFechas, setRangoFechas] =
        useState<RangoFechasMateriaPrimaDto>({
            fechaInicio: null,
            fechaFin: null,
        });

    /** Resetea el filtro de fechas */
    const handleResetFecha = (): void => {
        setRangoFechas({
            fechaInicio: null,
            fechaFin: null,
        });
    };

    //Queries

    /** Obtiene la distribución de cajas por estatus */
    const cajas = useGetCajasPlanta1();

    /** Obtiene las boletas del rango seleccionado */
    const boletas = useGetBoletas({
        fechaBusqueda: {
            fechaInicio: rangoFechas.fechaInicio ?? today,
            fechaFin: rangoFechas.fechaFin ?? today,
        },
        planta: 1,
    });

    /** Obtiene las boletas del rango seleccionado */
    const cajasComparativa = useQueryCajas({
        fechaBusqueda: {
            fechaInicio: rangoFechas.fechaInicio ?? today,
            fechaFin: rangoFechas.fechaFin ?? today,
        },
        planta: 1,
    });

    /** Obtiene el total de boletas registradas */
    const contarBoletas = useBoletasCount({
        rangoFechasMateriaPrimaDto: rangoFechas,
    });

    /** Obtiene el resumen general de materia prima */
    const resumenMateriaPrima = useMateriaPrimaResumen({
        rangoFechasMateriaPrimaDto: rangoFechas,
    });

    /** Cantidad total de boletas */
    const totalBoletas = formatText(contarBoletas.data ?? 0);

    /** Total de cajas estimadas */
    const cajasEstimadas = formatText(
        resumenMateriaPrima.data?.estimado ?? 0
    );

    /** Viajes estimados de materia prima */
    const viajesEsperados = formatText(boletas.data?.length ?? 0);

    /** Total de cajas recibidas */
    const cajasRecibidas = formatText(
        resumenMateriaPrima.data?.real ?? 0
    );
    

    /** Configuración de tarjetas */
    const cards = [
        {
            text: "Boletas",
            value: totalBoletas,
            icon: FileText,
            loading: contarBoletas.isLoading,
        },
        {
            text: "Cajas Recibidas",
            value: cajasRecibidas,
            icon: Package2,
            loading: resumenMateriaPrima.isLoading,
        },
        {
            text: "Cajas Estimadas",
            value: cajasEstimadas,
            icon: PackageOpen,
            loading: resumenMateriaPrima.isLoading,
        },
        {
            text: "Viajes esperados",
            value: String(viajesEsperados),
            icon: Truck,
            loading: resumenMateriaPrima.isLoading,
        },
    ];

    return (
        <section className="flex h-screen flex-col overflow-hidden bg-background px-3">

            <NavBar />

            <main className="flex flex-1 flex-col gap-4 py-4 overflow-hidden">

                {/* HEADER */}

                <section className="flex flex-wrap items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                        <h1 className="text-2xl font-bold">
                            Materia Prima Planta 1
                        </h1>

                        <Badge
                            variant="secondary"
                            className="flex items-center gap-2"
                        >
                            <Calendar1 size={14} />

                            {
                                rangoFechas.fechaInicio &&
                                    rangoFechas.fechaFin
                                    ? `${rangoFechas.fechaInicio} - ${rangoFechas.fechaFin}`
                                    : today
                            }
                        </Badge>

                    </div>

                    <div className="flex items-center gap-2">

                        <ButtonCalendar
                            value={rangoFechas}
                            onChange={setRangoFechas}
                        />

                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={handleResetFecha}
                        >
                            <Trash2 size={16} />
                        </Button>

                        <ThemeButton />

                    </div>

                </section>

                {/* KPIS */}

                <section
                    className="
                    grid
                    gap-4
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
                >
                    {
                        cards.map((card) => (
                            <CardHeader
                                key={card.text}
                                text={card.text}
                                value={card.value}
                                icon={card.icon}
                                isLoading={card.loading}
                            />
                        ))
                    }
                </section>

                {/* CONTENIDO PRINCIPAL */}

                <section
                    className="
                    grid
                    flex-1
                    gap-4
                    min-h-0
                    xl:grid-cols-12
                "
                >

                    {/* GRAFICA */}

                    <div className="xl:col-span-8 overflow-hidden">

                        <CardContent className="h-full p-4">

                            <GraficaCajasV2
                                cajas={cajasComparativa.data ?? []}
                            />

                        </CardContent>

                    </div>

                    {/* VIAJES */}

                    <div className="xl:col-span-4 overflow-hidden">

                        <div className="h-full p-0">

                            <ViajesProgramadosV2
                                isLoading={boletas.isLoading}
                                viajes={boletas.data ?? []}
                            />

                        </div>

                    </div>

                </section>

            </main>

        </section>
    );
}


/** Formatea de string para que parezca cantidad.
 * @example 20000 => 20,0000
 * @returns string
 */
const formatText = (value: string | number) => {
    const formattedText = String(value.toLocaleString("es-MX"));
    return formattedText;
}