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
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";

export default function Page() {
    const [sourceFundAmount, setSourceFundAmount] = useState(10000); // Initial investment in source fund
    const [transferToFundAmount, setTransferToFundAmount] = useState(500); // Amount to transfer to destination fund
    const [transferPeriod, setTransferPeriod] = useState(5); // Transfer period in years
    const [expectedReturnSource, setExpectedReturnSource] = useState(5); // Expected return from source fund
    const [expectedReturnDestination, setExpectedReturnDestination] = useState(5); // Expected return from destination fund
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateSTP = () => {
        const years = transferPeriod; // Duration in years
        const annualReturnSource = expectedReturnSource / 100; // Annual rate from source fund as a decimal
        const annualReturnDestination = expectedReturnDestination / 100; // Annual rate from destination fund as a decimal

        // Initial amount invested in the source fund
        const investedAmount = sourceFundAmount; // ₹1,000,000

        // Calculate future value of the source fund after 5 years (with transfers)
        let futureValueSourceFund = investedAmount;

        for (let year = 0; year < years; year++) {
            futureValueSourceFund *= (1 + annualReturnSource); // Compound the return
            futureValueSourceFund -= transferToFundAmount; // Subtract the transfer amount
        }

        // Calculate resultant amount in destination fund after compounding for the same years
        const totalTransferred = transferToFundAmount * years; // Total transferred amount
        const resultantAmount = totalTransferred * Math.pow(1 + annualReturnDestination, years); // Compounded amount

        // Set results
        setResult({
            investedAmount: investedAmount,
            balanceInSourceFund: Math.round(futureValueSourceFund), // Remaining amount in the source fund
            amountTransferredToDestinationFund: totalTransferred, // Total amount transferred to the destination fund
            resultantAmount: Math.round(resultantAmount), // Final amount in the destination fund after growth
        });
    };



    // Update the calculation when any of the values change
    useEffect(() => {
        calculateSTP();
    }, [sourceFundAmount, transferToFundAmount, transferPeriod, expectedReturnSource, expectedReturnDestination]);

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
                            <BreadcrumbPage>STP Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            STP Calculator
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="input-fields mt-5 mb-10">
                                <div className='items-center mt-5'>
                                    <div className='flex justify-between'>
                                        <h1>I want to invest in Source Fund</h1>
                                        <div>
                                            <span className='font-semibold text-green-700'>₹</span>
                                            <input
                                                type="text"
                                                value={sourceFundAmount}
                                                onChange={(e) => setSourceFundAmount(parseFloat(e.target.value))}
                                                className='font-semibold text-green-700 w-24 border-none'
                                            />
                                        </div>
                                    </div>
                                    <Input
                                        type="range"
                                        min="10000"
                                        max="10000000"
                                        step="500"
                                        value={sourceFundAmount}
                                        onChange={(e) => setSourceFundAmount(parseFloat(e.target.value))}
                                        className="w-full text-gray-400"
                                    />
                                </div>
                                <div className='items-center mt-5'>
                                    <div className='flex justify-between mt-5'>
                                        <h1>I want to transfer to Destination Fund</h1>
                                        <div>
                                            <span className='font-semibold text-green-700'>₹</span>
                                            <input
                                                type="text"
                                                value={transferToFundAmount}
                                                onChange={(e) => setTransferToFundAmount(parseFloat(e.target.value))}
                                                className='font-semibold text-green-700 w-24 border-none'
                                            />
                                        </div>
                                    </div>
                                    <Input
                                        type="range"
                                        min="500"
                                        max="1000000"
                                        step="500"
                                        value={transferToFundAmount}
                                        onChange={(e) => setTransferToFundAmount(parseFloat(e.target.value))}
                                        className="w-full text-gray-400"
                                    />
                                </div>
                                <div className='items-center mt-5'>
                                    <div className='flex justify-between mt-5'>
                                        <h1>For a period of (years)</h1>
                                        <input
                                            type="text"
                                            value={transferPeriod}
                                            onChange={(e) => setTransferPeriod(parseFloat(e.target.value))}
                                            className="font-semibold text-green-700 w-10 border-none"
                                        />
                                    </div>
                                    <Input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="1"
                                        value={transferPeriod}
                                        onChange={(e) => setTransferPeriod(parseFloat(e.target.value))}
                                        className="w-full text-gray-400"
                                    />
                                </div>
                                <div className='items-center mt-5'>
                                    <div className='flex justify-between mt-5'>
                                        <h1>Expected Rate of Return from Source Fund (%)</h1>
                                        <input
                                            type="text"
                                            value={expectedReturnSource}
                                            onChange={(e) => setExpectedReturnSource(parseFloat(e.target.value))}
                                            className="font-semibold text-green-700 w-10 border-none"
                                        />
                                    </div>
                                    <Input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="1"
                                        value={expectedReturnSource}
                                        onChange={(e) => setExpectedReturnSource(parseFloat(e.target.value))}
                                        className="w-full text-gray-400"
                                    />
                                </div>
                                <div className='items-center mt-5'>
                                    <div className='flex justify-between mt-5'>
                                        <h1>Expected Rate of Return from Destination Fund (%)</h1>
                                        <input
                                            type="text"
                                            value={expectedReturnDestination}
                                            onChange={(e) => setExpectedReturnDestination(parseFloat(e.target.value))}
                                            className="font-semibold text-green-700 w-10 border-none"
                                        />
                                    </div>
                                    <Input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="1"
                                        value={expectedReturnDestination}
                                        onChange={(e) => setExpectedReturnDestination(parseFloat(e.target.value))}
                                        className="w-full text-gray-400"
                                    />
                                </div>
                            </div>

                            {result && (
                                <div className="mt-5">
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Invested Amount</p>
                                        <p className='font-bold text-lg'>₹{result?.investedAmount?.toLocaleString()}</p>
                                    </div>
                                    <hr className='mb-3' />
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Balance Amount in Source Fund</p>
                                        <p className='font-bold text-lg'>₹{result?.balanceInSourceFund?.toLocaleString()}</p>
                                    </div>
                                    <hr className='mb-3' />
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Amount Transferred to Destination Fund</p>
                                        <p className='font-bold text-lg'>₹{result?.amountTransferredToDestinationFund?.toLocaleString()}</p>
                                    </div>
                                    <hr className='mb-3' />
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Resultant Amount</p>
                                        <p className='font-bold text-lg'>₹{result?.resultantAmount?.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='col-span-1'>
                            <SippieChart
                                piedata={{
                                    totalInvestment: result?.investedAmount,
                                    futureValue: result?.resultantAmount
                                }}
                                title={'Household Expenses, Loan Repayment & Provision For Goals Investment Breakup'}
                                customLabels={{
                                    invested: "Household Expenses",
                                    return: "Loan Repayment",
                                }}
                            />
                            <CalculatorReturnChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
