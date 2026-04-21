import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

type BaseItem = {
  id: number | string;
};

type Props<T extends BaseItem> = {
  item: T;
  checked: boolean;
  onToggle: (item: T) => void;
  renderContent: (item: T) => React.ReactNode;
};

export function SelectableCard<T extends BaseItem>({
  item,
  checked,
  onToggle,
  renderContent,
}: Props<T>) {
  return (
    <Card
      onClick={() => onToggle(item)}
      className="w-full cursor-pointer hover:shadow-md transition"
    >
      <CardContent className="flex justify-between items-center p-4">

        <div className="flex-1">
          {renderContent(item)}
        </div>

        <Checkbox
          checked={checked}
          onCheckedChange={() => onToggle(item)}
          onClick={(e) => e.stopPropagation()}
        />
      </CardContent>
    </Card>
  );
}