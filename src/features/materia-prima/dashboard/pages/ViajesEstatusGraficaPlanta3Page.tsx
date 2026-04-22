
import { useBoletasPlanta3 } from '../hooks/useGetBoletasPlanta';
import { useGetCajasPlanta3 } from '../hooks/useGetCajas';
import { useEstatusPlanta3 } from '../hooks/useGetEstatus';
import { ViajesEstatusGraficaView } from '../views/ViajesEstatusGraficaView';

export default function ViajesEstatusGraficaPlanta3Page() {
  return (
    <ViajesEstatusGraficaView
      title="Planta 3"
      useCajasHook={useGetCajasPlanta3}
      useBoletasHook={useBoletasPlanta3}
      useEstatusHook={useEstatusPlanta3}
    />
  )
}