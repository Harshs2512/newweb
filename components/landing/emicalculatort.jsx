"use client";
import React, { useEffect, useState } from "react";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import { EmipieChart } from "@/components/charts/emipiechart";
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { generatePDF } from "@/lib/generatePdf";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function EmiCalculator() {
    const FormSchema = z.object({
        username: z.string().min(2, { message: "Username must be at least 2 characters." }),
        mobile: z.string().nonempty({ message: "Mobile number is required." }),
        email: z.string().email({ message: "Invalid email address." }),
    });
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            mobile: "",
            email: "",
            message: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        setLoading(true)
        const emaildata = {
            user: data?.username,
            to: data?.email,
            subject: 'Test Email',
            text: 'This is a test email sent from Nodemailer!',
        }

        try {
            const response = await axios.post('/api/leads/', data);
            const info = await axios.post('/api/email/', emaildata);
            console.log(info);
            if (response.status === 201) {
                form.reset();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An unexpected error occurred.");
        };
        localStorage.setItem("emiformSubmitted", "true");
        localStorage.setItem("submissionTimestamp", Date.now().toString());
        setIsModalOpen(false)
        setLoading(false)
        setIsSubmitted(true)
        calculateEmi()
    };
    const [loading, setLoading] = useState(false);
    const [loanAmount, setLoanAmount] = useState(100000); // Principal loan amount
    const [loanTenure, setLoanTenure] = useState(5); // Loan tenure in years
    const [interestRate, setInterestRate] = useState(7); // Annual interest rate
    const [emi, setEmi] = useState(null);
    const [totalAmountPayable, setTotalAmountPayable] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
    }, []);

    // Constants for time calculations
    const TWENTY_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

    useEffect(() => {
        // Check if the form has already been submitted (stored in localStorage)
        const formSubmitted = localStorage.getItem("emiformSubmitted");
        const submissionTimestamp = localStorage.getItem("submissionTimestamp");

        if (formSubmitted === "true" && submissionTimestamp) {
            const currentTime = Date.now();
            const timeDifference = currentTime - submissionTimestamp;

            // If 20 days have passed since submission, clear the localStorage
            if (timeDifference > TWENTY_DAYS_IN_MS) {
                localStorage.removeItem("emiformSubmitted");
                localStorage.removeItem("submissionTimestamp");
                setIsSubmitted(false); // Allow form to open again
            } else {
                setIsSubmitted(true); // Keep form closed if within 20 days
            }
        }
    }, []);

    const handleModelOpen = (open) => {
        setIsModalOpen((prevState) => !prevState);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Background Color
        doc.setFillColor(240, 240, 240); // Light gray background
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Title
        doc.setFontSize(24);
        doc.setTextColor(50, 50, 50); // Dark Gray
        doc.text('EMI Calculator Results', 14, 30);

        // Header Line
        doc.setDrawColor(50, 50, 50);
        doc.line(14, 35, pageWidth - 14, 35);

        // Add EMI details
        doc.setFontSize(14);
        doc.setTextColor(70, 70, 70); // Medium Gray
        doc.text(`Loan Amount: ${loanAmount} ₹`, 14, 50);
        doc.text(`Interest Rate: ${interestRate}%`, 14, 60);
        doc.text(`Tenure: ${loanTenure} months`, 14, 70);
        doc.text(`Monthly EMI: ${emi} ₹`, 14, 80);
        doc.text(`Total Amount Payable: ${totalAmountPayable} ₹`, 14, 90);
        doc.text(`Total Interest Paid: ${totalInterest} ₹`, 14, 100);

        // Add a line for separation
        doc.line(14, 105, pageWidth - 14, 105);

        // Add a colorful section for chart data
        doc.setFillColor(255, 204, 204); // Light red background for chart data
        doc.rect(14, 110, pageWidth - 28, 40, 'F');

        // Chart Data Title
        doc.setFontSize(18);
        doc.setTextColor(255, 51, 51); // Red for the title
        doc.text('Yearly Breakdown:', 20, 125);

        // Reset font for chart data
        doc.setFontSize(12);
        doc.setTextColor(70, 70, 70);
        chartData.forEach((data, index) => {
            doc.text(`${data.year}: Invested: ${data.investedAmount} ₹, Growth: ${data.growth} ₹`, 20, 135 + (index * 10));
        });

        // Capture chart as an image
        const chartElement = document.getElementById('chart-container'); // Assume your chart is in a div with this ID
        html2canvas(chartElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 14, 160, pageWidth - 28, 100); // Adjust width/height as needed
            doc.save('emi_calculator_results.pdf');
        });
    };

    return (
        <div className="px-20 py-10">
            <div className="mb-5 text-center">
                {/* Title Section */}
                <h1 className="text-3xl text-center font-bold mb-5 inline-block text-[#422c0a]">EMI Calculator</h1>
                {/* Line Under the Title */}
                <div className="h-1 w-[200px] bg-gray-900 mx-auto mb-10 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-1 border border-gray-200 rounded-2xl bg-white p-5 flex flex-col justify-between">
                    <div className="input-fields mt-5">
                        <h1 className="text-md font-semibold text-gray-800">Welcome to FINAURA</h1>
                        <h1 className="text-sm text-gray-800 mb-4">You may determine your EMI on loans by using the below calculators.</h1>
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <h1>Loan Amount (₹)</h1>
                                <input
                                    type="text"
                                    value={loanAmount.toLocaleString()}
                                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                    className="font-semibold text-[#af874c] w-24 border-none"
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
                                    className="font-semibold text-[#af874c] w-10 border-none"
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
                                    className="font-semibold text-[#af874c] w-10 border-none"
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
                        {isSubmitted ? (
                            <div className="mb-5 flex justify-between">
                                <div className="space-x-2">
                                    <Button onClick={() => calculateEmi()}>Calculate</Button>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="cursor-pointer" onClick={() => generatePDF()}>
                                                <h1 className="text-2xl"><FaFilePdf /></h1>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Download to pdf</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )
                            :
                            <Dialog open={isModalOpen} onOpenChange={() => handleModelOpen(true)}>
                                <DialogTrigger asChild>
                                    <Button>Calculate</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Fill Your Detailes...</DialogTitle>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded p-7 bg-white">
                                            {/* Username Field */}
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Label className="text-sm">Your Name<span className="text-red-700 font-bold ">*</span></Label>
                                                        <FormControl>
                                                            <Input placeholder="User Name" {...field} aria-label="User Name" className="border-2 border-gray-500" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Mobile Field */}
                                            <FormField
                                                control={form.control}
                                                name="mobile"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Label className="text-sm">Mobile Number <span className="text-red-700 font-bold">*</span></Label>
                                                        <FormControl>
                                                            <Input placeholder="Mobile" {...field} aria-label="Mobile Number" className="border-2 border-gray-500" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Email Field */}
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Label className="text-sm">Email<span className="text-red-700 font-bold ">*</span></Label>
                                                        <FormControl>
                                                            <Input type="email" placeholder="Email" {...field} aria-label="Email" className="border-2 border-gray-500" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Address Field */}
                                            <FormField
                                                control={form.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Label className="text-sm">Address</Label>
                                                        <FormControl>
                                                            <Input placeholder="Address" {...field} aria-label="Address" className="border-2 border-gray-500" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Submit Button */}
                                            <Button type="submit">{!loading ? "Submit" : "Loading..."}</Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        }
                    </div>
                    {emi && (
                        <div className="mt-5 bg-gray-50 p-5 rounded-lg shadow">
                            <div className="">
                                <div className="mb-4 text-center flex justify-between">
                                    <h2 className="text-2xl font-bold text-gray-700">Loan EMI</h2>
                                    <p className="text-xl font-extrabold text-[#af874c]">₹{emi.toLocaleString()}</p>
                                </div>
                                <div className="mb-4 text-center flex justify-between">
                                    <p className="text-lg text-gray-600">Principal Loan Amount</p>
                                    <p className="text-xl font-bold text-gray-800">₹{loanAmount.toLocaleString()}</p>
                                </div>
                                <div className="mb-4 text-center flex justify-between">
                                    <p className="text-lg text-gray-600">Total Interest Payable</p>
                                    <p className="text-xl font-bold text-gray-800">₹{totalInterest.toLocaleString()}</p>
                                </div>
                                <div className="mb-4 text-center flex justify-between">
                                    <p className="text-lg text-gray-600">Total Payment (Principal + Interest)</p>
                                    <p className="text-xl font-bold text-gray-800">₹{totalAmountPayable.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-1">
                    <div className="mb-3" id="graphId">
                        <EmipieChart
                            piedata={result}
                            title={"EMI Breakdown"}
                        />
                    </div>
                    <div className="mb-3" id="chart-container">
                        <CalculatorReturnChart data={chartData} />
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}