"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";

export default function Page() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(500);
    const [oneTimeInvestment, setOneTimeInvestment] = useState(500);
    const [investmentDuration, setInvestmentDuration] = useState(1);
    const [expectedReturn, setExpectedReturn] = useState(1);
    const [result, setResult] = useState(null);
    const [isMonthlySip, setIsMonthlySip] = useState(true);

    const calculateSip = () => {
        const monthlyRate = expectedReturn / 12 / 100; // Monthly rate as a decimal
        const months = investmentDuration * 12; // Convert years to months

        let futureValue, totalInvestment;

        if (isMonthlySip) {
            // Calculate for Monthly SIP
            futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
            totalInvestment = monthlyInvestment * months;
        } else {
            // Calculate for One-Time Investment
            futureValue = oneTimeInvestment * Math.pow(1 + monthlyRate, months);
            totalInvestment = oneTimeInvestment;
        }

        // Set results with proper precision
        setResult({
            futureValue: Number(futureValue.toFixed(2)),
            totalInvestment: Number(totalInvestment.toFixed(2))
        });
    };

    // Update the calculation when any of the investment values change
    useEffect(() => {
        calculateSip();
    }, [monthlyInvestment, oneTimeInvestment, investmentDuration, expectedReturn, isMonthlySip]);

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
                            <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Sip Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            SIP Calculator
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                {/* Investment Type Toggle */}
                                <div className="flex space-x-4 mb-8">
                                    <Button
                                        onClick={() => { setIsMonthlySip(true) }}
                                        className={`text-xs rounded-full ${isMonthlySip ? 'bg-green-900/90' : 'bg-gray-300 text-gray-800'}`}
                                    >
                                        Monthly SIP
                                    </Button>
                                    <Button
                                        onClick={() => { setIsMonthlySip(false) }}
                                        className={`text-xs rounded-full ${!isMonthlySip ? 'bg-green-900/90' : 'bg-gray-300 text-gray-800'}`}
                                    >
                                        One-Time Investment
                                    </Button>
                                </div>

                                <div className="input-fields mt-5 mb-10">
                                    {isMonthlySip ? (
                                        <div>
                                            <div className='flex justify-between'>
                                                <h1>
                                                    Monthly investment
                                                </h1>
                                                <div>
                                                    <span className='font-semibold text-green-700'>₹</span>
                                                    <input
                                                        type="text" // Change type to number for better input handling
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
                                    ) : (
                                        <div>
                                            <div className='flex justify-between'>
                                                <h1>
                                                    Total investment
                                                </h1>
                                                <div>
                                                    <span className='font-semibold text-green-700'>₹</span>
                                                    <input
                                                        type="text" // Change type to number for better input handling
                                                        value={oneTimeInvestment}
                                                        onChange={(e) => setOneTimeInvestment(parseFloat(e.target.value))}
                                                        className='font-semibold text-green-700 w-14 border-none'
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                type="range"
                                                min="500"
                                                max="50000"
                                                step="500"
                                                value={oneTimeInvestment}
                                                onChange={(e) => setOneTimeInvestment(parseFloat(e.target.value))}
                                                className="w-full text-gray-400"
                                            />
                                        </div>
                                    )}

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>
                                                Time period
                                            </h1>
                                            <input
                                                type="text" // Change type to number for better input handling
                                                value={investmentDuration}
                                                onChange={(e) => setDuration(e.target.value)} // Update duration
                                                className="font-semibold text-green-700 w-5 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="40"
                                            step="1"
                                            value={investmentDuration}
                                            onChange={(e) => setDuration(e.target.value)} // Update duration
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>
                                                Expected Return
                                            </h1>
                                            <input
                                                type="text" // Change type to number for better input handling
                                                value={expectedReturn}
                                                onChange={(e) => setExpectedReturn(e.target.value)} // Update duration
                                                className="font-semibold text-green-700 w-5 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturn}
                                            onChange={(e) => setExpectedReturn(e.target.value)} // Update duration
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Invested Amount </p>
                                            <p className='font-bold text-lg'>₹{result?.totalInvestment.toFixed(2)}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Wealth Gained </p>
                                            <p className='font-bold text-lg'>₹{Math.floor(result.futureValue - result.totalInvestment).toFixed(2)}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Expected Amount </p>
                                            <p className='font-bold text-lg'>₹{result.futureValue.toFixed(2)}</p>
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
                        <CalculatorReturnChart />
                    </div>
                </div>
            </div>
        </div>
    );
}