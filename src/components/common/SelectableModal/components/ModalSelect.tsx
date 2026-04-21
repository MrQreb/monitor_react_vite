import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { EmptySearch } from './EmptySearch';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from "react";

type BaseItem = {
  id: number | string;
};

type Props<T extends BaseItem> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  items: T[];
  selected: T[];
  onToggle: (item: T) => void;

  ItemComponent: React.ComponentType<{
    item: T;
    checked: boolean;
    onToggle: (item: T) => void;
  }>;

  getSearchValue: (item: T) => string;

  title?: string;
  description?: string;
};

export function ModalSelect<T extends BaseItem>({
  open,
  onOpenChange,
  items,
  selected,
  onToggle,
  ItemComponent,
  getSearchValue,
  title,
  description,
}: Props<T>) {

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return items.filter(item =>
      getSearchValue(item).toLowerCase().includes(s)
    );
  }, [items, search, getSearchValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[600px] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>{title ?? "Seleccionar"}</DialogTitle>
          <DialogDescription>
            {description ?? "Selecciona elementos"}
          </DialogDescription>
        </DialogHeader>

        <InputGroup>
          <InputGroupInput
            placeholder="Buscar..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>{filtered.length}</InputGroupAddon>
        </InputGroup>

        <div className="flex justify-end">
          <Label>
            Seleccionados <Badge>{selected.length}</Badge>
          </Label>
        </div>

        {filtered.length === 0 && <EmptySearch />}

        {filtered.map((item) => (
          <ItemComponent
            key={item.id}
            item={item}
            checked={selected.some(s => s.id === item.id)}
            onToggle={onToggle}
          />
        ))}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cerrar</Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}