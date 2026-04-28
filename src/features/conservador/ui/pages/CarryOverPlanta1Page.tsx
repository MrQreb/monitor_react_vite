import { CarryOverPlantaView } from "../views/CarryOverPlantaView"
import { useCarryOverPlanta1 } from "../hooks/useConservador";

export const CarryOverPlanta1Page = () => {
    const carryOver = useCarryOverPlanta1();

    console.log(carryOver.data)
    return (
        <CarryOverPlantaView
            title="Carry Over Planta 1"
            carrryOver={carryOver.data ?? []}
        />
    )
}