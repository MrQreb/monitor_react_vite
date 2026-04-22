import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChartCard({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold md:text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-80 flex items-end gap-3">
          {[40, 80, 30, 60, 90, 50].map((h, i) => (
            <div
              key={i}
              className="w-full bg-primary rounded-md"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}