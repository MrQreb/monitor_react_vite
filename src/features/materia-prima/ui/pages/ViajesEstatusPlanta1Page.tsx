
import { useBoletasPlanta1 } from '../hooks/useBoletasPlanta';
import { useEstatusPlanta1 } from '../hooks/useEstatus';
import { ViajesEstatusView } from "../views/ViajesEstatusView"

export default function ViajesEstatusPlanta1Page() {
  return (
    <ViajesEstatusView
      title="Planta 1"
      useBoletasHook={useBoletasPlanta1}
      useEstatusHook={useEstatusPlanta1}
    />
  )
}