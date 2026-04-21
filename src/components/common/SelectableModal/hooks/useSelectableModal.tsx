import { useEffect, useState } from "react";

type BaseItem = {
  id: number | string;
};

type UseSelectableModalProps<T> = {
  items?: T[];
  initialSelectedIds?: (number | string)[];
};

export function useSelectableModal<T extends BaseItem>({
  items,
  initialSelectedIds,
}: UseSelectableModalProps<T>) {

  const [selected, setSelected] = useState<T[]>([]);


  const toggle = (item: T) => {
    setSelected(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const clear = () => setSelected([]);
  
  const setAll = (items: T[]) => setSelected(items);

  
  useEffect(() => {
    if (!items || !initialSelectedIds) return;

    const ids = new Set(initialSelectedIds);

    const preSelected = items.filter(item => ids.has(item.id));

    setSelected(preSelected);

  }, [items, initialSelectedIds]);

  return {
    selected,
    toggle,
    clear,
    setAll,
  };
}