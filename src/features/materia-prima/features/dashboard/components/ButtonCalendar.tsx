import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import type { RangoFechasMateriaPrimaDto } from "@/materia-prima/api/shared/dto/rangoFechasMateriaPrimaDto.dto";
import { es } from 'date-fns/locale'

interface Props {
    value: RangoFechasMateriaPrimaDto;
    onChange: (value: RangoFechasMateriaPrimaDto) => void;
}

/** Permite pasar una fecha */
const formatDate = (date?: Date) => date?.toISOString().split("T")[0];

/** Despliega calendario */
export const ButtonCalendar = ({
    value,
    onChange,
}: Props) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: value.fechaInicio
            ? new Date(value.fechaInicio)
            : undefined,

        to: value.fechaFin
            ? new Date(value.fechaFin)
            : undefined,
    });

    return (
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
                            captionLayout="dropdown"
                            locale={es}
                            mode="range"
                            selected={dateRange}
                            onSelect={(range) => {
                                setDateRange(range);

                                onChange({
                                    fechaInicio: formatDate(range?.from),
                                    fechaFin: formatDate(range?.to),
                                });
                            }}
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
    );
};