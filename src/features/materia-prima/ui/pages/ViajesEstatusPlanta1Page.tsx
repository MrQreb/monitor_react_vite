
import { useBoletasPlanta1 } from '../hooks/useGetBoletasPlanta';
import { useEstatusPlanta1 } from '../hooks/useGetEstatus';
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