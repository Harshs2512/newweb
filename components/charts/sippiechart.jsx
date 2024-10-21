"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a legend"

const chartConfig = {
    invested: {
        label: "Invested",
        color: "hsl(var(--chart-2))",
    },
    return: {
        label: "Return",
        color: "hsl(var(--chart-1))",
    },
}

export function SippieChart({ piedata, title, customLabels }) {
    const chartData = [
        { browser: "invested", visitors: piedata?.totalInvestment, fill: "var(--color-invested)" },
        { browser: "return", visitors: piedata?.futureValue, fill: "var(--color-return)" },
    ]
    
    // Use custom labels if provided; otherwise, fall back to the default labels.
    const labels = customLabels || {
        invested: chartConfig.invested.label,
        return: chartConfig.return.label,
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title ? title : "Data"} - Pie Chart</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="visitors" hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            labelLine={false}
                            label={({ payload, ...props }) => {
                                return (
                                    <text
                                        cx={props.cx}
                                        cy={props.cy}
                                        x={props.x}
                                        y={props.y}
                                        textAnchor={props.textAnchor}
                                        dominantBaseline={props.dominantBaseline}
                                        fill="hsla(var(--foreground))"
                                    >
                                        {`${labels[payload.browser]} (${payload.visitors})`}
                                    </text>
                                )
                            }}
                            nameKey="browser"
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="browser" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
