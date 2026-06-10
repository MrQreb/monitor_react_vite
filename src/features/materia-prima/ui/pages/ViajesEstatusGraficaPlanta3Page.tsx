
import { useBoletasPlanta3 } from '../hooks/useBoletasPlanta';
import { useGetCajasPlanta3 } from '../hooks/useCajas';
import { useEstatusPlanta3 } from '../hooks/useEstatus';
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