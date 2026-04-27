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
        <TabsList className='rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='flex items-center gap-1 rounded-full px-2.5 text-slate-600 data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:text-slate-300 dark:data-[state=active]:bg-slate-100 dark:data-[state=active]:text-slate-950 sm:px-3'
            >
              <Icon className='h-4 w-4' />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};