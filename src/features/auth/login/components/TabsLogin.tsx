import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SYSTEMS } from "../const/SYSTEMS";
import { useSystemStore } from "../store/system.store";

export const TabsLogin = () => {
  const { setSystem } = useSystemStore();

    return (
        <div className="w-full max-w-md">
            <Tabs defaultValue={String(SYSTEMS[0].id)} className="gap-4">
                <TabsList className="group-data-[orientation=horizontal]/tabs:h-fit">
                    {SYSTEMS.map(({ id, name, icon: Icon }) => (
                        <TabsTrigger
                            key={id}
                            value={String(id)}
                            onClick={() => setSystem(SYSTEMS.find(s => s.id === id)!)}
                            className="flex flex-col items-center gap-1 px-2.5 sm:px-3"
                        >
                            {Icon && <Icon className="h-4 w-4" />}
                            <span>{name}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};