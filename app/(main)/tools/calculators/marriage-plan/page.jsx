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

export default function MarriagePlanningCalculator() {
    const [currentAge, setCurrentAge] = useState(10); // Current age of the child
    const [MarriageStartAge, setMarriageStartAge] = useState(18); // Age at which Marriage starts
    const [totalInvestment, setTotalInvestment] = useState(500000); // Current Marriage cost
    const [expectedReturn, setExpectedReturn] = useState(7); // Expected annual return in %
    const [inflationRate, setInflationRate] = useState(5); // Inflation rate in %

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateMarriagePlan = () => {
        const years = MarriageStartAge - currentAge; // Time left until Marriage starts
        const annualReturnRate = expectedReturn / 100; // Expected return as a decimal
        const inflationRateDecimal = inflationRate / 100; // Inflation rate as a decimal

        // Calculate future cost of Marriage considering inflation
        const futureMarriageCost = totalInvestment * Math.pow(1 + inflationRateDecimal, years);

        // Calculate the lumpsum amount needed today to reach the future cost
        const lumpsumInvestment = futureMarriageCost / Math.pow(1 + annualReturnRate, years);

        // Calculate monthly SIP amount needed to accumulate the future cost
        const monthlyReturnRate = annualReturnRate / 12;
        const months = years * 12;
        const sipInvestment = futureMarriageCost / ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate);

        // Prepare chart data (year-wise breakdown)
        const yearlyData = [];
        for (let year = 1; year <= years; year++) {
            const futureCostForYear = totalInvestment * Math.pow(1 + inflationRateDecimal, year);
            const lumpsumForYear = futureCostForYear / Math.pow(1 + annualReturnRate, year);
            yearlyData.push({
                year: currentAge + year,
                investedAmount: Math.round(futureCostForYear),
                growth: Math.round(lumpsumForYear),
            });
        }

        // Set result and chart data
        setResult({
            totalInvestment,
            futureValue: Math.round(futureMarriageCost),
            lumpsumInvestment: Math.round(lumpsumInvestment),
            sipInvestment: Math.round(sipInvestment),
        });
        setChartData(yearlyData);
    };

    useEffect(() => {
        calculateMarriagePlan();
    }, [currentAge, MarriageStartAge, totalInvestment, expectedReturn, inflationRate]);

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
                            <BreadcrumbPage>Marriage Planning Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Marriage Planning Calculator
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    {/* Current Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <h1>Current Age</h1>
                                            <input
                                                type="text"
                                                value={currentAge}
                                                onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Marriage Start Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <h1>Age at the Start of Marriage</h1>
                                            <input
                                                type="text"
                                                value={MarriageStartAge}
                                                onChange={(e) => setMarriageStartAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="10"
                                            max="50"
                                            step="1"
                                            value={MarriageStartAge}
                                            onChange={(e) => setMarriageStartAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Current Marriage Cost */}
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1>Current Marriage Expenses</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={totalInvestment}
                                                    onChange={(e) => setTotalInvestment(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="100000"
                                            max="10000000"
                                            step="1000"
                                            value={totalInvestment}
                                            onChange={(e) => setTotalInvestment(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Rate of Return */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Rate of Return (%)</h1>
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
                                    {/* Inflation Rate */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Inflation Rate (%)</h1>
                                            <input
                                                type="text"
                                                value={inflationRate}
                                                onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Current Marriage Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.totalInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Future Marriage Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through SIP</p>
                                            <p className='font-bold text-lg'>₹{result?.lumpsumInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through Lumpsum</p>
                                            <p className='font-bold text-lg'>₹{result?.sipInvestment?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <SippieChart
                                piedata={result}
                                title={'Marriage Planning Projection'}
                                customLabels={{
                                    invested: "Current Expenses",
                                    return: "Future Expenses",
                                }}
                            />
                        </div>
                    </div>
                    <CalculatorReturnChart
                        data={chartData}
                        chartType='line'
                        customLabels={{
                            xLabel: "Age",
                            yLabel: "Amount",
                        }}
                        chartTitle="Marriage Planning Projection"
                    />
                </div>
            </div>
        </div>
    );
}
