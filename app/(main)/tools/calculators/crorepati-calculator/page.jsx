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

export default function CrorepatiPlanningCalculator() {
    const [currentAge, setCurrentAge] = useState(10); // Current age of the child
    const [crorepatiStartAge, setCrorepatiStartAge] = useState(18); // Age at which Crorepati starts
    const [targetWealth, setTargetWealth] = useState(50000000); // Target wealth in INR
    const [currentSavings, setCurrentSavings] = useState(100000); // Current savings
    const [expectedReturn, setExpectedReturn] = useState(7); // Expected annual return in %
    const [inflationRate, setInflationRate] = useState(5); // Inflation rate in %

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateCrorepatiPlan = () => {
        const years = crorepatiStartAge - currentAge; // Time left until Crorepati starts
        const annualReturnRate = expectedReturn / 100; // Expected return as a decimal
        const inflationRateDecimal = inflationRate / 100; // Inflation rate as a decimal

        // Step 1: Calculate future target wealth considering inflation
        const futureTargetWealth = targetWealth * Math.pow(1 + inflationRateDecimal, years);

        // Step 2: Growth of current savings at 7% return per annum
        const savingsGrowth = currentSavings * Math.pow(1 + annualReturnRate, years);

        // Step 3: Final target wealth after accounting for savings growth
        const finalTargetWealth = futureTargetWealth - savingsGrowth;

        // Step 4: Calculate monthly SIP amount needed to accumulate the final target wealth
        const monthlyReturnRate = annualReturnRate / 12; // Monthly return rate
        const months = years * 12;
        const sipInvestmentRequired = finalTargetWealth * (monthlyReturnRate / (Math.pow(1 + monthlyReturnRate, months) - 1));

        // Step 5: Total amount invested through SIP in 8 years
        const totalSIPInvestment = sipInvestmentRequired * months;

        // Step 6: Total growth amount from SIP investments
        const sipFutureValue = sipInvestmentRequired * (Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate;
        const sipGrowth = sipFutureValue - totalSIPInvestment;

        // Prepare chart data (optional)
        const yearlyData = [];
        for (let year = 1; year <= years; year++) {
            const futureWealthForYear = targetWealth * Math.pow(1 + inflationRateDecimal, year);
            const lumpsumForYear = futureWealthForYear / Math.pow(1 + annualReturnRate, year);
            yearlyData.push({
                year: currentAge + year,
                investedAmount: Math.round(futureWealthForYear),
                growth: Math.round(lumpsumForYear),
            });
        }

        // Set result
        setResult({
            futureTargetWealth: Math.round(futureTargetWealth),
            growthOfSavings: Math.round(savingsGrowth),
            finalTargetWealth: Math.round(finalTargetWealth),
            sipInvestmentRequired: Math.round(sipInvestmentRequired),
            totalSIPInvestment: Math.round(totalSIPInvestment),
            sipGrowth: Math.round(sipGrowth),
            sipFutureValue: Math.round(sipFutureValue),
        });

        // Optionally set chart data
        setChartData(yearlyData);
    };

    console.log(result)
    useEffect(() => {
        calculateCrorepatiPlan();
    }, [currentAge, crorepatiStartAge, targetWealth, currentSavings, expectedReturn, inflationRate]);
    console.log(chartData)

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
                            <BreadcrumbPage>Crorepati Planning Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Crorepati Planning Calculator
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3">
                                <div className="input-fields mt-5 mb-10">
                                    {/* Target Wealth */}
                                    <div>
                                        <div className='flex justify-between mt-5'>
                                            <h1>Target Wealth (INR)?</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={targetWealth.toLocaleString()}
                                                    onChange={(e) => setTargetWealth(parseFloat(e.target.value.replace(/,/g, '')))}
                                                    className='font-semibold text-green-700 w-28 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="1000000"
                                            max="1000000000"
                                            step="100000"
                                            value={targetWealth}
                                            onChange={(e) => setTargetWealth(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
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
                                            max="80"
                                            step="1"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Crorepati Start Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <h1>Age at the Time of Crorepati</h1>
                                            <input
                                                type="text"
                                                value={crorepatiStartAge}
                                                onChange={(e) => setCrorepatiStartAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="10"
                                            max="100"
                                            step="1"
                                            value={crorepatiStartAge}
                                            onChange={(e) => setCrorepatiStartAge(parseFloat(e.target.value))}
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
                                            max="20"
                                            step="1"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        {/* Current Savings */}
                                        <div className='flex justify-between'>
                                            <h1>Current Savings (INR)?</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={currentSavings.toLocaleString()}
                                                    onChange={(e) => setCurrentSavings(parseFloat(e.target.value.replace(/,/g, '')))}
                                                    className='font-semibold text-green-700 w-28 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="1000000"
                                            max="1000000000"
                                            step="100000"
                                            value={targetWealth}
                                            onChange={(e) => setTargetWealth(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border border-gray-200 rounded-2xl bg-white p-5'>
                            {result && (
                                <div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Your Targeted Wealth (Inflation Adjusted)</p>
                                        <p className='font-bold text-lg'>₹ {result.futureTargetWealth.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Growth of Savings</p>
                                        <p className='font-bold text-lg'>₹ {result.growthOfSavings.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Monthly SIP Amount Required</p>
                                        <p className='font-bold text-lg'>₹ {result.sipInvestmentRequired.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Amount Invested through SIP in {crorepatiStartAge - currentAge} years</p>
                                        <p className='font-bold text-lg'>₹ {result.totalSIPInvestment.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>SIP Growth</p>
                                        <p className='font-bold text-lg'>₹ {result.sipGrowth.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Future Value of SIP</p>
                                        <p className='font-bold text-lg'>₹ {result.sipFutureValue.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="chart-area gap-y-2">
                        <SippieChart
                            piedata={{
                                totalInvestment: result?.sipFutureValue,
                                futureValue: result?.totalSIPInvestment
                            }}
                            title={'Education Planning Projection'}
                            customLabels={{
                                invested: "Current Expenses",
                                return: "Future Expenses",
                            }}
                            className="mb-4"
                        />
                        <CalculatorReturnChart data={chartData} />
                    </div>
                </div>
            </div >
        </div >
    );
}
