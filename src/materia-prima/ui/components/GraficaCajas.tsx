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
import type { CajasEsperadasDto } from "../../api/features/dto"


type Props = {
  cajas: CajasEsperadasDto[] 
}

export function GraficaCajas({ cajas }: Props) {
  return (
    <Card className="flex h-full min-w-0 w-full flex-col rounded-[1.5rem] border-0 bg-white shadow-none">
      <CardHeader className="pb-0 pt-3 text-center">
        <CardTitle className="text-sm font-extrabold text-cyan-700 sm:text-base">
          Estimado y Real
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 min-w-0 px-2 pb-3 pt-0 sm:px-3">
        <div className="min-h-0 h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cajas} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap="16%">
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
              <XAxis dataKey="producto" tick={{ fill: '#52525b', fontSize: 10 }} interval={0} />
              <YAxis tickCount={10} tick={{ fill: '#52525b', fontSize: 10 }} domain={[0, 11000]} />
              <Tooltip
                cursor={{ fill: 'rgba(15, 118, 110, 0.08)' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e4e4e7',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={24}
                wrapperStyle={{ paddingTop: 4 }}
                formatter={(value) => <span style={{ color: '#64748b' }}>{value}</span>}
              />
              <Bar
                dataKey="estimado"
                name="estimado"
                fill="#f97355"
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={750}
                animationEasing="ease-out"
              >
                <LabelList dataKey="estimado" position="top" fill="#8c6b52" fontSize={10} />
              </Bar>
              <Bar
                dataKey="real"
                name="real"
                fill="#2fa79a"
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationBegin={120}
                animationDuration={820}
                animationEasing="ease-out"
              >
                <LabelList dataKey="real" position="top" fill="#8c6b52" fontSize={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}