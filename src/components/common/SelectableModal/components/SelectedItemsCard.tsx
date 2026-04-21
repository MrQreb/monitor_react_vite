import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BaseItem = {
  id: number | string;
};

type Props<T extends BaseItem> = {
  items: T[];
  onRemove: (item: T) => void;
  onClear: () => void;

  getLabel: (item: T) => string;

  title?: string;
  emptyText?: string;
};

export function SelectedItemsCard<T extends BaseItem>({
  items,
  onRemove,
  onClear,
  getLabel,
  title,
  emptyText,
}: Props<T>) {
  return (
    <Card className="w-full mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <Label className="font-semibold">
          {title ?? "Seleccionados"}{" "}
          <Badge>{items.length}</Badge>
        </Label>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
        >
          Quitar todos
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">

          {items.length === 0 && (
            <Label className="text-sm text-muted-foreground">
              {emptyText ?? "No hay elementos seleccionados"}
            </Label>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full border"
            >
              <span className="text-sm">
                {getLabel(item)}
              </span>

              <button
                onClick={() => onRemove(item)}
                className="text-muted-foreground hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}