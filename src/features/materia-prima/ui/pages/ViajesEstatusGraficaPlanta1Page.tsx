
import { useBoletasPlanta1 } from '../hooks/useGetBoletasPlanta';
import { useGetCajasPlanta1 } from '../hooks/useGetCajas';
import { useEstatusPlanta1 } from '../hooks/useGetEstatus';
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