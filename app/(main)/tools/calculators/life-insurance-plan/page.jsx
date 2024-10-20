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
    const [loanAmount, setLoanAmount] = useState(100000); // Loan Amount
    const [currentFdRate, setCurrentFdRate] = useState(5); // Current FD Rate
    const [inflationRate, setInflationRate] = useState(5); // Inflation Rate
    const [protectionDuration, setProtectionDuration] = useState(5); // Duration in years
    const [monthlyExpenses, setMonthlyExpenses] = useState(10000); // Monthly Expenses
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateInsurancePlan = () => {
        const years = protectionDuration; // Duration in years
        const totalMonths = years * 12; // Total months over the protection duration

        // Calculate total household expenses over the duration
        const totalHouseholdExpenses = monthlyExpenses * totalMonths; // Total over the years

        // Calculate total insurance cover required
        const totalInsuranceCover = loanAmount + totalHouseholdExpenses;

        // Prepare data for each year to pass to the chart
        const yearlyData = [];

        // Calculate year-wise data
        for (let year = 1; year <= years; year++) {
            // Calculate the total future household expenses up to this year, adjusting for inflation
            // Use the monthly expenses for the current year, adjusted for inflation
            const inflatedMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, year);
            const futureExpensesForYear = inflatedMonthlyExpenses * 12; // Total for the year

            // Accumulate future expenses up to this year
            const cumulativeFutureExpenses = futureExpensesForYear * year; // Total expenses up to this year

            // Push data for the chart every year
            yearlyData.push({
                year: year,
                investedAmount: Math.round(cumulativeFutureExpenses), // Cumulative future value at the end of the year
                growth: Math.round(totalInsuranceCover), // Total insurance cover needed
            });
        }

        // Set results
        setResult({
            loanRepayment: loanAmount,
            householdExpenses: Math.round(totalHouseholdExpenses),
            totalInsuranceCover: Math.round(totalInsuranceCover),
        });

        // Set the chart data based on yearly data
        setChartData(yearlyData);
    };

    // Update the calculation when any of the values change
    useEffect(() => {
        calculateInsurancePlan();
    }, [loanAmount, currentFdRate, inflationRate, protectionDuration, monthlyExpenses]);

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
                            <BreadcrumbPage>Life Insurance Planning Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Life Insurance Planning Calculator
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="insurance-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1>Loan Amount</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={loanAmount}
                                                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="10000"
                                            max="10000000"
                                            step="1000"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Current FD Rate (%)</h1>
                                            <input
                                                type="text"
                                                value={currentFdRate}
                                                onChange={(e) => setCurrentFdRate(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="15"
                                            step="0.1"
                                            value={currentFdRate}
                                            onChange={(e) => setCurrentFdRate(parseFloat(e.target.value))}
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
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>For How Many Years You Want To Protect Your Household Expenses</h1>
                                            <input
                                                type="text"
                                                value={protectionDuration}
                                                onChange={(e) => setProtectionDuration(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="40"
                                            step="1"
                                            value={protectionDuration}
                                            onChange={(e) => setProtectionDuration(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Monthly Expenses</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={monthlyExpenses}
                                                    onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="0"
                                            max="500000"
                                            step="1000"
                                            value={monthlyExpenses}
                                            onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>You need Life Insurance Cover Of</p>
                                            <p className='font-bold text-lg'>₹{result?.totalInsuranceCover?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Loan Repayment</p>
                                            <p className='font-bold text-lg'>₹{result?.loanRepayment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Household Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.householdExpenses?.toLocaleString()}</p>
                                        </div>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <SippieChart
                                piedata={{
                                    totalInvestment: result?.totalInsuranceCover,
                                    futureValue: result?.loanRepayment
                                }}
                                title={'Household Expenses, Loan Repayment & Provision For Goals Investment Breakup'}
                                customLabels={{
                                    invested: "Household Expenses",
                                    return: "Loan Repayment",
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-10">
                        <CalculatorReturnChart data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
