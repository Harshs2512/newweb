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

export default function Page() {
    const [totalInvestment, setCurrentExpenses] = useState(10000); // Current cost of House
    const [investmentDuration, setInvestmentDuration] = useState(5); // Duration in years
    const [expectedReturn, setExpectedReturn] = useState(5); // Expected annual return
    const [inflationRate, setInflationRate] = useState(5); // Inflation rate
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateHousePlan = () => {
        const years = investmentDuration; // Duration in years
        const annualReturnRate = expectedReturn / 100; // Annual rate as a decimal
        const inflationRateDecimal = inflationRate / 100; // Inflation rate as a decimal

        // Calculate the future cost of the House, adjusted for inflation
        const futureHouseCost = totalInvestment * Math.pow(1 + inflationRateDecimal, years);

        // Calculate the lumpsum amount needed today to reach the future cost
        const lumpsumInvestment = futureHouseCost / Math.pow(1 + annualReturnRate, years);

        // Calculate the monthly SIP amount needed to accumulate the future House cost
        const monthlyReturnRate = annualReturnRate / 12; // Convert to monthly rate
        const months = years * 12; // Total number of months
        const sipInvestment = futureHouseCost / ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate);

        // Prepare data for each year to pass to the chart
        const yearlyData = [];

        // Calculate year-wise data
        for (let year = 1; year <= years; year++) {
            // Calculate the total future House cost up to this year, adjusting for inflation
            const futureCostForYear = totalInvestment * Math.pow(1 + inflationRateDecimal, year);

            // Calculate the lumpsum investment needed at the start of this year
            const lumpsumForYear = futureCostForYear / Math.pow(1 + annualReturnRate, year);

            // Push data for the chart every year
            yearlyData.push({
                year: year,
                investedAmount: Math.round(futureCostForYear), // Future value at the end of the year
                growth: Math.round(lumpsumForYear), // Lumpsum needed at the start of the year
            });
        }

        // Set results
        setResult({
            totalInvestment,
            futureValue: Math.round(futureHouseCost),
            lumpsumInvestment: Math.round(lumpsumInvestment),
            sipInvestment: Math.round(sipInvestment),
        });

        // Set the chart data based on yearly data
        setChartData(yearlyData);
    };

    // Update the calculation when any of the values change
    useEffect(() => {
        calculateHousePlan();
    }, [totalInvestment, investmentDuration, expectedReturn, inflationRate]);

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
                            <BreadcrumbPage>House Planning Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            House Planning Calculator
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1>Current Cost</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={totalInvestment}
                                                    onChange={(e) => setCurrentExpenses(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="1000000"
                                            max="100000000"
                                            step="1000"
                                            value={totalInvestment}
                                            onChange={(e) => setCurrentExpenses(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>After How Many Years Do You Wish To Plan Your Dream House</h1>
                                            <input
                                                type="text"
                                                value={investmentDuration}
                                                onChange={(e) => setInvestmentDuration(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="40"
                                            step="1"
                                            value={investmentDuration}
                                            onChange={(e) => setInvestmentDuration(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
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
                                            <p>Current Cost of House</p>
                                            <p className='font-bold text-lg'>₹{result?.totalInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Future Cost of House</p>
                                            <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through SIP</p>
                                            <p className='font-bold text-lg'>₹{result?.sipInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through Lump Sum</p>
                                            <p className='font-bold text-lg'>₹{result?.lumpsumInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <SippieChart
                                piedata={result}
                                title={'Current & Future Cost Of House Breakup'}
                                customLabels={{
                                    invested: "Current Cost of House",
                                    return: "Future Cost of House",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <CalculatorReturnChart data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}