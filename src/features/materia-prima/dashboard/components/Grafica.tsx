import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type GraficaResumen = {
  producto: string
  estimado: number
  real: number
}

type Props = {
  datos: GraficaResumen[]
}

export function Grafica({ datos }: Props) {
  return (
    <Card className="rounded-[1.75rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-[1.15rem] font-extrabold text-cyan-700">
          Grafica
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-1">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datos} margin={{ top: 12, right: 10, left: 0, bottom: 0 }} barCategoryGap="16%">
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
              <XAxis dataKey="producto" tick={{ fill: '#52525b', fontSize: 13 }} interval={0} />
              <YAxis tick={{ fill: '#52525b', fontSize: 13 }} domain={[0, 11000]} />
              <Tooltip
                cursor={{ fill: 'rgba(15, 118, 110, 0.08)' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e4e4e7' }}
              />
              <Legend verticalAlign="bottom" height={28} wrapperStyle={{ paddingTop: 8 }} />
              <Bar dataKey="estimado" name="estimado" fill="#f97355" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="estimado" position="top" fill="#8c6b52" fontSize={12} />
              </Bar>
              <Bar dataKey="real" name="real" fill="#2fa79a" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="real" position="top" fill="#8c6b52" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}