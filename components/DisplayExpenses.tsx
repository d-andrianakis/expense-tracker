import { useMemo } from "react";
import { Bar, BarChart, Label, Pie, PieChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Expense = { amount: string; category: string };

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export default function DisplayExpenses({ expenses }: { expenses: Expense[] }) {
  const { categoryData, chartConfig, totalAmount } = useMemo(() => {
    const totals: Record<string, number> = {};
    const categoryIndex: Record<string, number> = {};
    let idx = 0;

    for (const exp of expenses) {
      const amount = parseFloat(exp.amount);
      if (!isNaN(amount)) {
        if (!(exp.category in categoryIndex)) {
          categoryIndex[exp.category] = idx++;
        }
        totals[exp.category] = (totals[exp.category] || 0) + amount;
      }
    }

    const config: ChartConfig = {};
    const data = Object.entries(totals).map(([category, total]) => {
      const color = CHART_COLORS[categoryIndex[category] % CHART_COLORS.length];
      config[category] = { label: category, color };
      return { category, total, fill: `var(--color-${category})` };
    });

    const total = Object.values(totals).reduce((a, b) => a + b, 0);
    return { categoryData: data, chartConfig: config, totalAmount: total };
  }, [expenses]);

  const barData = useMemo(() => {
    const categoryIndex: Record<string, number> = {};
    let idx = 0;
    for (const exp of expenses) {
      if (!(exp.category in categoryIndex)) {
        categoryIndex[exp.category] = idx++;
      }
    }

    return expenses
      .map((exp, i) => {
        const amount = parseFloat(exp.amount);
        if (isNaN(amount)) return null;
        return {
          name: `${exp.category} #${i + 1}`,
          amount,
          fill: CHART_COLORS[categoryIndex[exp.category] % CHART_COLORS.length],
        };
      })
      .filter(Boolean);
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <p className="text-muted-foreground">
        No expenses yet. Add some above!
      </p>
    );
  }

  return (
    <div className="flex gap-8 mt-6">
      {/* Bar chart — individual expenses */}
      <div className="w-2/3">
        <h3 className="text-lg font-semibold mb-2">Expenses</h3>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart data={barData} accessibilityLayer>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `$${v}`} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Pie chart — totals by category */}
      <div className="w-1/3">
        <h3 className="text-lg font-semibold mb-2">By Category</h3>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
            <ChartLegend content={<ChartLegendContent nameKey="category" />} />
            <Pie
              data={categoryData}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          ${totalAmount.toFixed(0)}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
