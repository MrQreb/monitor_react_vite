import { Factory, Thermometer } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'



const tabs = [
  { name: 'Ambas', value: 'Ambas', icon: Factory },
  { name: 'Planta 1', value: 'Planta 1', icon: Factory },
  { name: 'Planta 3', value: 'Planta 3', icon: Factory },
  { name: 'Cedis', value: 'Cedis', icon: Thermometer },
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const TabsMenu = ({ value, onChange }: Props) => {
  return (
    <div className='w-full max-w-md'>
      <Tabs value={value} onValueChange={onChange} className='gap-4'>
        <TabsList>
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='flex items-center gap-1 px-2.5 sm:px-3'
            >
              <Icon />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};