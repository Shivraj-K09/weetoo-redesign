import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ChartDataPoint } from "@/types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { TrendingUpIcon } from "lucide-react";

interface DayOfWeekChartProps {
  data: ChartDataPoint[];
}

<Card className="border border-border">
  <CardHeader className="border-b border-border">
    <CardTitle className="text-lg font-medium">Usage by Day of Week</CardTitle>
    <CardDescription>Broadcasting vs listening distribution</CardDescription>
  </CardHeader>
  <CardContent className="p-6">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Legend />
        <Bar
          dataKey="broadcasting"
          fill="#f97316"
          name="Broadcasting (min)"
          radius={[2, 2, 0, 0]}
        />
        <Bar
          dataKey="listening"
          fill="#3b82f6"
          name="Listening (min)"
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>;
