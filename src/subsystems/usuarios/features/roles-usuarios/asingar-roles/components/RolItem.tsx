import { SelectableCard } from '@/components/common/SelectableModal/components/SelectableCard';
import { Label } from '@/components/ui/label';

type Rol = {
  id: number;
  nombre: string;
  descripcion?: string;
};

type Props = {
  item: Rol;
  checked: boolean;
  onToggle: (rol: Rol) => void;
};

export function RolItem({ item, checked, onToggle }: Props) {
  return (
    <SelectableCard
      item={item}
      checked={checked}
      onToggle={onToggle}
      renderContent={(rol) => (
        <>
          <Label className="font-medium">
            {rol.nombre}
          </Label>
          <p className="text-sm text-muted-foreground">
            {rol.descripcion}
          </p>
        </>
      )}
    />
  );
}