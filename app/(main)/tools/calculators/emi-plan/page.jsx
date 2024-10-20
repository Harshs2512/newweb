"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import { EmipieChart } from "@/components/charts/emipiechart";

export default function Page() {
    const [loanAmount, setLoanAmount] = useState(100000); // Principal loan amount
    const [loanTenure, setLoanTenure] = useState(5); // Loan tenure in years
    const [interestRate, setInterestRate] = useState(7); // Annual interest rate
    const [emi, setEmi] = useState(null);
    const [totalAmountPayable, setTotalAmountPayable] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateEmi = () => {
        const principal = loanAmount;
        const tenureInMonths = loanTenure * 12;
        const monthlyInterestRate = interestRate / (12 * 100);

        // EMI formula
        const emiCalculated =
            (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
            (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

        const totalPayment = emiCalculated * tenureInMonths;
        const totalInterestPaid = totalPayment - principal;

        setEmi(Math.round(emiCalculated));
        setTotalAmountPayable(Math.round(totalPayment));
        setTotalInterest(Math.round(totalInterestPaid));

        setResult({
            principalamount: Math.round(principal),
            intrestamount: Math.round(totalInterestPaid),
        });

        // Create year-wise chart data
        const yearlyData = [];
        let remainingPrincipal = loanAmount;

        for (let i = 1; i <= loanTenure; i++) {
            const interestForYear = remainingPrincipal * interestRate / 100;
            const principalForYear = emiCalculated * 12 - interestForYear;
            remainingPrincipal -= principalForYear;

            yearlyData.push({
                year: `Year ${i}`,
                investedAmount: Math.round(principalForYear),
                growth: Math.round(interestForYear),
            });
        }

        setChartData(yearlyData);
    };
    useEffect(() => {
        calculateEmi();
    }, [loanAmount, loanTenure, interestRate]);
    console.log(chartData)
    return (
        <div className="px-40 py-10">
            <div className="mb-5">
                <h1 className="text-4xl font-bold text-gray-800">EMI Calculator</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-1 border border-gray-200 rounded-2xl bg-white p-5">
                    <div className="input-fields mt-5 mb-10">
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <h1>Loan Amount (₹)</h1>
                                <input
                                    type="text"
                                    value={loanAmount.toLocaleString()}
                                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                    className="font-semibold text-green-700 w-24 border-none"
                                />
                            </div>
                            <Input
                                type="range"
                                min="100000"
                                max="100000000"
                                step="1000"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                className="w-full text-gray-400"
                            />
                        </div>
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <h1>Loan Tenure (Years)</h1>
                                <input
                                    type="text"
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(parseFloat(e.target.value))}
                                    className="font-semibold text-green-700 w-10 border-none"
                                />
                            </div>
                            <Input
                                type="range"
                                min="1"
                                max="40"
                                step="1"
                                value={loanTenure}
                                onChange={(e) => setLoanTenure(parseFloat(e.target.value))}
                                className="w-full text-gray-400"
                            />
                        </div>
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <h1>Interest Rate (%)</h1>
                                <input
                                    type="text"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                    className="font-semibold text-green-700 w-10 border-none"
                                />
                            </div>
                            <Input
                                type="range"
                                min="1"
                                max="30"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                className="w-full text-gray-400"
                            />
                        </div>
                    </div>

                    {emi && (
                        <div className="mt-5 bg-gray-50 p-5 rounded-lg shadow">
                            <div className="mb-4 text-center">
                                <h2 className="text-2xl font-bold text-gray-700">Loan EMI</h2>
                                <p className="text-4xl font-extrabold text-green-600">₹{emi.toLocaleString()}</p>
                            </div>
                            <hr className="my-4" />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-lg text-gray-600">Principal Loan Amount</p>
                                    <p className="text-xl font-bold text-gray-800">₹{loanAmount.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-600">Total Interest Payable</p>
                                    <p className="text-xl font-bold text-gray-800">₹{totalInterest.toLocaleString()}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-lg text-gray-600">Total Payment (Principal + Interest)</p>
                                    <p className="text-2xl font-bold text-green-700">₹{totalAmountPayable.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-1">
                    <EmipieChart
                        piedata={result}
                        title={"EMI Breakdown"}
                    />
                </div>
            </div>
            <div>
                <CalculatorReturnChart data={chartData} />
            </div>
        </div>
    );
}