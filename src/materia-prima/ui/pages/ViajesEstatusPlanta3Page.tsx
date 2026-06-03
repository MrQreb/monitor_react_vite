
import { useBoletasPlanta3 } from '../hooks/useBoletasPlanta';
import { useEstatusPlanta3 } from '../hooks/useEstatus';
import { ViajesEstatusView } from "../views/ViajesEstatusView"

export default function ViajesEstatusPlanta3Page() {
  return (
    <ViajesEstatusView
      title="Planta 3"
      useBoletasHook={useBoletasPlanta3}
      useEstatusHook={useEstatusPlanta3}
    />
  )
}