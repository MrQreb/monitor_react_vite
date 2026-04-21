
import { StatCard } from "../components/StatCard";
import { ChartCard } from "../components/ChartCard";
import { RecentActivity } from "../components/RecentActivity";

export default function DashboardPage() {
    
  return (
   
    <div className="w-full min-h-lvh space-y-10 p-6 md:p-10">


      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Resumen general del sistema
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Usuarios" value="1,245" />
        <StatCard title="Tags" value="320" />
        <StatCard title="Categorías" value="58" />
        <StatCard title="Relaciones" value="2,134" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Usuarios por mes" />
        <ChartCard title="Uso de Tags" />
      </div>

      {/* Table */}
      <RecentActivity />

    </div>
  );
}

