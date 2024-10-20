"use client";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";

export default function DelayCostCalculator() {
    const [monthlySIP, setMonthlySIP] = useState(5000); // Monthly SIP amount
    const [timePeriod, setTimePeriod] = useState(10); // Investment period in years
    const [expectedReturn, setExpectedReturn] = useState(7); // Expected annual return in %
    const [delayMonths, setDelayMonths] = useState(6); // Delay in months for starting SIP

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateDelayCost = () => {
        const annualReturnRate = expectedReturn / 100; // Convert percentage to decimal
        const monthsInYear = 12;
        const totalMonths = timePeriod * monthsInYear; // Total investment period in months

        // Calculate the total amount invested
        const totalAmountInvested = monthlySIP * totalMonths;

        // Calculate future value of SIP without delay
        const futureValueWithoutDelay = monthlySIP * (
            (Math.pow(1 + annualReturnRate / monthsInYear, totalMonths) - 1) / (annualReturnRate / monthsInYear)
        );

        // Calculate future value after delay
        const futureValueAfterDelay = monthlySIP * (
            (Math.pow(1 + annualReturnRate / monthsInYear, totalMonths) - 1) / (annualReturnRate / monthsInYear)
        ) * Math.pow(1 + annualReturnRate / monthsInYear, delayMonths);

        // Calculate the cost of delay in future value
        const costOfDelay =  futureValueAfterDelay - futureValueWithoutDelay;

        // Set result
        setResult({
            totalAmountInvested: Math.round(totalAmountInvested),             // Total invested
            futureValue: Math.round(futureValueWithoutDelay),     // Future Value without Delay
            lumpsumInvestment: Math.round(futureValueAfterDelay),                             // Cost of Delay
            cost: Math.round(costOfDelay),         // Future Value after Delay
        });
    };
    
    useEffect(() => {
        calculateDelayCost();
    }, [monthlySIP, timePeriod, expectedReturn, delayMonths]);

    return (
        <div className="px-40 py-10">
            <div className="mb-5">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Delay Cost Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">Delay Cost Calculator</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    {/* Monthly SIP */}
                                    <div className='flex justify-between'>
                                        <h1>Monthly SIP (₹)</h1>
                                        <div>
                                            <input
                                                type="text"
                                                value={monthlySIP.toLocaleString()}
                                                onChange={(e) => setMonthlySIP(parseFloat(e.target.value.replace(/,/g, '')))}
                                                className='font-semibold text-green-700 w-20 border-none'
                                            />
                                        </div>
                                    </div>
                                    <Input
                                        type="range"
                                        min="500"
                                        max="100000"
                                        step="500"
                                        value={monthlySIP}
                                        onChange={(e) => setMonthlySIP(parseFloat(e.target.value))}
                                        className="w-full text-gray-400"
                                    />

                                    {/* Time Period */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Time Period (Years)</h1>
                                            <input
                                                type="text"
                                                value={timePeriod}
                                                onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={timePeriod}
                                            onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    {/* Rate of Return */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Expected Return (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturn}
                                                onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturn}
                                            onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    {/* Delay in SIP */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Delay in Starting SIP (Months)</h1>
                                            <input
                                                type="text"
                                                value={delayMonths}
                                                onChange={(e) => setDelayMonths(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="0"
                                            max="24"
                                            step="1"
                                            value={delayMonths}
                                            onChange={(e) => setDelayMonths(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Future Value without Delay</p>
                                            <p className='font-bold text-lg'>₹{result?.totalAmountInvested?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Future Value without Delay</p>
                                            <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Cost of Delay in Future Value</p>
                                            <p className='font-bold text-lg'>₹{result?.cost?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Future Value after Delay</p>
                                            <p className='font-bold text-lg'>₹{result?.lumpsumInvestment?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <SippieChart
                                piedata={result}
                                title={'Delay Planning Projection'}
                                customLabels={{
                                    invested: "Current SIP",
                                    return: "Future SIP",
                                }}
                            />
                        </div>
                    </div>
                    <CalculatorReturnChart
                        data={chartData}
                        chartType='line'
                        customLabels={{
                            xLabel: "Years",
                            yLabel: "Amount (₹)",
                        }}
                        chartTitle="Delay Planning Projection"
                    />
                </div>
            </div>
        </div>
    );
}
