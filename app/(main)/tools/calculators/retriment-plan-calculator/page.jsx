"use client";

import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart"; // Ensure you have the chart component
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart"; // Ensure you have the chart component

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);
    const [requirement, setRequirement] = useState(1000); // Current Monthly Expenses
    const [expectedReturnPreRetirement, setExpectedReturnPreRetirement] = useState(8); // in percentage
    const [expectedReturnPostRetirement, setExpectedReturnPostRetirement] = useState(24); // in percentage
    const [inflationRate, setInflationRate] = useState(7); // in percentage
    const [futureMonthlyExpenses, setFutureMonthlyExpenses] = useState(null);
    const [retirementCorpus, setRetirementCorpus] = useState(null);
    const [monthlySavings, setMonthlySavings] = useState(null);

    const calculateRetirement = () => {
        // Calculate the number of years until retirement
        const yearsUntilRetirement = retirementAge - currentAge;
    
        // Calculate future monthly expenses (FV = PV * (1 + r)^n)
        const futureMonthlyExpenses = requirement * Math.pow(1 + (inflationRate / 100), yearsUntilRetirement);
        setFutureMonthlyExpenses(Math.round(futureMonthlyExpenses));
    
        // Calculate the required annual income at retirement
        const futureAnnualIncomeRequired = futureMonthlyExpenses * 12; // Convert to yearly
    
        // Adjusted return rate for inflation
        const adjustedReturnRate = (1 + expectedReturnPreRetirement / 100) / (1 + inflationRate / 100) - 1;
    
        // Calculate the retirement period based on life expectancy
        const retirementPeriodMonths = (lifeExpectancy - retirementAge) * 12; // Adjust for life expectancy
    
        // Calculate the corpus needed to generate the future income
        const monthlyIncomeAdjusted = futureAnnualIncomeRequired / 12; // Monthly income needed
        const corpusNeeded = (monthlyIncomeAdjusted * ((1 - Math.pow(1 + (adjustedReturnRate / 12), -retirementPeriodMonths)) / (adjustedReturnRate / 12)));
    
        setRetirementCorpus(Math.round(corpusNeeded));
    
        // Calculate monthly savings needed to accumulate the corpus
        const monthlySavingsNeeded = (corpusNeeded / Math.pow(1 + (expectedReturnPreRetirement / 100 / 12), yearsUntilRetirement * 12)) / (yearsUntilRetirement * 12);
    
        setMonthlySavings(Math.round(monthlySavingsNeeded));
        
        // Prepare data for the chart (optional)
        // setChartData([{
        //     year: currentAge + yearsUntilRetirement,
        //     corpusNeeded: Math.round(corpusNeeded),
        //     futureExpenses: Math.round(futureMonthlyExpenses * 12),
        //     monthlySavingsNeeded: Math.round(monthlySavingsNeeded
        // )}]);
    };
    
    useEffect(() => {
        calculateRetirement();
    }, [currentAge, retirementAge, requirement, expectedReturnPreRetirement, expectedReturnPostRetirement, inflationRate]);

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
                            <BreadcrumbPage>Retirement Planning Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Retirement Planning Calculator
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1>Current Age</h1>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={currentAge}
                                                    onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-10 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="20"
                                            max="80"
                                            step="1"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Retirement Age</h1>
                                            <input
                                                type="text"
                                                value={retirementAge}
                                                onChange={(e) => setRetirementAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="30"
                                            max="100"
                                            step="1"
                                            value={retirementAge}
                                            onChange={(e) => setRetirementAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Life Expectancy</h1>
                                            <input
                                                type="text"
                                                value={lifeExpectancy}
                                                onChange={(e) => setLifeExpectancy(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="60"
                                            max="100"
                                            step="1"
                                            value={lifeExpectancy}
                                            onChange={(e) => setLifeExpectancy(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Current Monthly Expenses</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={requirement}
                                                    onChange={(e) => setRequirement(parseFloat(e.target.value))}
                                                    className="font-semibold text-green-700 w-14 border-none"
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="1000"
                                            max="100000"
                                            step="1000"
                                            value={requirement}
                                            onChange={(e) => setRequirement(parseFloat(e.target.value))}
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
                                            min="0"
                                            max="30"
                                            step="1"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Expected Return Pre-Retirement (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturnPreRetirement}
                                                onChange={(e) => setExpectedReturnPreRetirement(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturnPreRetirement}
                                            onChange={(e) => setExpectedReturnPreRetirement(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Expected Return Post-Retirement (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturnPostRetirement}
                                                onChange={(e) => setExpectedReturnPostRetirement(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturnPostRetirement}
                                            onChange={(e) => setExpectedReturnPostRetirement(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    {/* Display Results */}
                                    {monthlySavings && retirementCorpus && (
                                        <div className="mt-5">
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Future Monthly Expenses</p>
                                                <p className='font-bold text-lg'>₹{futureMonthlyExpenses?.toLocaleString()}</p>
                                            </div>
                                            <hr className='mb-3' />
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Required Corpus At Retirement</p>
                                                <p className='font-bold text-lg'>₹{retirementCorpus?.toLocaleString()}</p>
                                            </div>
                                            <hr className='mb-3' />
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Planning Through SIP</p>
                                                <p className='font-bold text-lg'>₹{monthlySavings?.toLocaleString()}</p>
                                            </div>
                                            <hr className='mb-3' />
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Planning Through Lump Sum</p>
                                                <p className='font-bold text-lg'>₹{(retirementCorpus * 0.80).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <SippieChart piedata={requirement} />
                        </div>
                    </div>
                    <div>
                        {/* <CalculatorReturnChart data={chartData} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
