import { useMemo } from "react";
import { Bar, BarChart, Cell, Label, Pie, PieChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
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
    for (const exp of expenses) {
      const amount = parseFloat(exp.amount);
      if (!isNaN(amount)) {
        totals[exp.category] = (totals[exp.category] || 0) + amount;
      }
    }

    const categories = Object.keys(totals);
    const config: ChartConfig = {};
    const data = categories.map((category, i) => {
      const color = CHART_COLORS[i % CHART_COLORS.length];
      config[category] = { label: category, color };
      return { category, total: totals[category], fill: color };
    });

    const total = Object.values(totals).reduce((a, b) => a + b, 0);

    return { categoryData: data, chartConfig: config, totalAmount: total };
  }, [expenses]);

  const barData = useMemo(
    () =>
      expenses
        .map((exp, i) => {
          const amount = parseFloat(exp.amount);
          if (isNaN(amount)) return null;
          const color = CHART_COLORS[
            Object.keys(
              expenses.reduce<Record<string, boolean>>((acc, e) => {
                acc[e.category] = true;
                return acc;
              }, {})
            ).indexOf(exp.category) % CHART_COLORS.length
          ];
          return { name: `${exp.category} #${i + 1}`, amount, fill: color };
        })
        .filter(Boolean),
    [expenses]
  );

  if (expenses.length === 0) {
    return (
      <p className="text-muted-foreground mt-4">
        No expenses yet. Add some above!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8 mt-6">
      {/* Bar chart — individual expenses */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Expenses</h3>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart data={barData} accessibilityLayer>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `$${v}`} tickLine={false} axisLine={false} />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              formatter={(value: number) => `$${value}`}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={index} fill={entry!.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      {/* Pie chart — totals by category */}
      <div>
        <h3 className="text-lg font-semibold mb-2">By Category</h3>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" />}
              formatter={(value: number) => `$${value}`}
            />
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
