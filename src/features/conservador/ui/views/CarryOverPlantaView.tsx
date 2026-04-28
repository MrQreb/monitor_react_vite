import NavBar from "@/components/common/NavBar/NavBar"
import { NoConnection } from "@/components/common/NoConnection/NoConnection"
import { SelectScroll } from "@/components/common/SelectScroll/SelectScroll"
import useSocketConnection from "@/shared/hooks/useConnetion"
import { CarryOverTabla } from "../components/CarryOverTabla";
import type { CarryOverDto } from "../../api/dto/carry-over-dto";

interface Props {
    title: string;
    carrryOver: CarryOverDto[]
}

export function CarryOverPlantaView({
    title,
    carrryOver
}: Props) {
    const connection = useSocketConnection()


    if (!connection) return <NoConnection />

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#2f2f2f] px-2 pb-2 pt-1 md:px-3">
            <NavBar />

            <div className="mt-4">
                <SelectScroll />
            </div>

            <div className="flex justify-center text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                    {title}
                </h1>
            </div>

            <section className="flex min-h-0 w-full flex-1 flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <CarryOverTabla carryOver={ carrryOver ?? []} />
                </div>
            </section>
        </div>
    )
}