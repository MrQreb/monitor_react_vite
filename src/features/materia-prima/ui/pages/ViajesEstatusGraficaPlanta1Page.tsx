
import { useBoletasPlanta1 } from '../hooks/useBoletasPlanta';
import { useGetCajasPlanta1 } from '../hooks/useCajas';
import { useEstatusPlanta1 } from '../hooks/useEstatus';
import { ViajesEstatusGraficaView } from '../views/ViajesEstatusGraficaView';

export default function ViajesEstatusGraficaPlanta1Page() {
  return (
    <ViajesEstatusGraficaView
      title="Planta 1"
      useCajasHook={useGetCajasPlanta1}
      useBoletasHook={useBoletasPlanta1}
      useEstatusHook={useEstatusPlanta1}
    />
  )
}