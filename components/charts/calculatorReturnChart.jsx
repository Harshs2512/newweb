"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

const chartConfig = {
    investedAmount: {
        label: "investedAmount",
        color: "#9fc9c4",
    },
    growth: {
        label: "growth",
        color: "#af874c",
    },
};

export function CalculatorReturnChart({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Step Up SIP Projected Value</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Adjust the height in the ChartContainer */}
                <ChartContainer config={chartConfig} className="h-56 w-full"> {/* h-56 sets the height to 14rem */}
                    <BarChart
                        accessibilityLayer
                        data={data}
                        height={200}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="investedAmount"
                            stackId="a"
                            fill="var(--color-investedAmount)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="growth"
                            stackId="a"
                            fill="var(--color-growth)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    );
}
