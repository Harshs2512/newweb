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
    const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
    const [investmentDuration, setInvestmentDuration] = useState(5); // Duration in years
    const [expectedReturn, setExpectedReturn] = useState(5);
    const [stepUpPercentage, setStepUpPercentage] = useState(5); // Step-up percentage
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);
    const calculateStepUpSip = () => {
        const months = investmentDuration * 12; // Total months of investment
        const annualRate = expectedReturn / 100; // Convert to decimal
        const monthlyRate = annualRate / 12; // Monthly rate
        const stepUpRate = stepUpPercentage / 100; // Step-up rate as a decimal
        let futureValue = 0;
        let totalInvestment = 0;

        // Prepare data for each year
        const yearlyData = [];

        for (let month = 0; month < months; month++) {
            // Calculate the investment for this month
            const currentInvestment = monthlyInvestment * Math.pow(1 + stepUpRate, Math.floor(month / 12));
            totalInvestment += currentInvestment; // Accumulate total investment

            // Calculate the future value of the current investment
            futureValue += currentInvestment * Math.pow(1 + monthlyRate, months - month);

            // Push data for the chart every 12 months
            if ((month + 1) % 12 === 0) {
                yearlyData.push({
                    year: Math.floor(month / 12) + 1,
                    investedAmount: Math.round(totalInvestment),
                    growth: Math.round(futureValue - totalInvestment),
                });
            }
        }

        // Set results with proper rounding
        setResult({
            totalInvestment: Math.round(totalInvestment),
            futureValue: Math.round(futureValue),
            wealthGained: Math.round(futureValue - totalInvestment),
        });

        // Set the chart data based on yearly data
        setChartData(yearlyData);
    };


    // Update the calculation when any of the investment values change
    useEffect(() => {
        calculateStepUpSip();
    }, [monthlyInvestment, investmentDuration, expectedReturn, stepUpPercentage]);

    const setDuration = (years) => {
        const parsedYears = parseFloat(years);
        if (!isNaN(parsedYears)) {
            setInvestmentDuration(parsedYears);
        }
    };

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
                            <BreadcrumbPage>Step-Up SIP Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Step-Up SIP Calculator
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1>Monthly investment</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={monthlyInvestment}
                                                    onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-14 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="500"
                                            max="50000"
                                            step="500"
                                            value={monthlyInvestment}
                                            onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Time period (Years)</h1>
                                            <input
                                                type="text"
                                                value={investmentDuration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className="font-semibold text-green-700 w-5 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="40"
                                            step="1"
                                            value={investmentDuration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Expected Return (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturn}
                                                onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-5 border-none"
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

                                    {/* Step-up percentage field */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Step-up Rate (%)</h1>
                                            <input
                                                type="text"
                                                value={stepUpPercentage}
                                                onChange={(e) => setStepUpPercentage(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-5 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={stepUpPercentage}
                                            onChange={(e) => setStepUpPercentage(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Invested Amount</p>
                                            <p className='font-bold text-lg'>₹{result?.totalInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Growth</p>
                                            <p className='font-bold text-lg'>₹{result?.wealthGained?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Total Future Value</p>
                                            <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                        </div>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <SippieChart piedata={result} />
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