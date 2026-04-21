import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivity() {
  const data = [
    { id: 1, action: "Creó usuario", user: "Admin" },
    { id: 2, action: "Eliminó tag", user: "Juan" },
    { id: 3, action: "Actualizó categoría", user: "Maria" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-semibold">Actividad reciente</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex justify-between border-b pb-3 text-base"
            >
              <span>{item.action}</span>
              <span className="text-muted-foreground">
                {item.user}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}