"use client";
import axios from "axios";
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
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { FaFilePdf } from "react-icons/fa6";
import { generatePDF } from "@/lib/generatePdf";
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-label";
import { SwpPerformanceChart } from "@/components/charts/swpPerformanceChart";
import SwpPerformanceTable from "@/components/swpPerformanceTable";

export default function Page() {
    const [loading, setLoading] = useState(false);
    const FormSchema = z.object({
        username: z.string().min(2, { message: "Username must be at least 2 characters." }),
        mobile: z.string().nonempty({ message: "Mobile number is required." }),
        email: z.string().email({ message: "Invalid email address." }),
    });
    function getTodayDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }
    const [schemesData, setSchemesData] = useState([]);
    const [result, setResult] = useState(null);
    const [isMonthlySip, setIsMonthlySip] = useState(true);
    const [allAcmdata, setAllAcmdata] = useState([]);
    const [selectedAcms, setSelectedAcms] = useState([]);
    const [funds, setFunds] = useState([]);
    const [startsipDate, setStartSipDate] = useState('2021-10-14');
    const [endsipDate, setEndSipDate] = useState(getTodayDate());
    const [valuationDate, setValuationDate] = useState('2020-10-14');
    const [initialAmount, setInitialAmount] = useState(100000);
    const [withdrawalAmount, setWithdrawalAmount] = useState(1000);
    const [pcode, setPcode] = useState('');
    const [title, setTitle] = useState('');
    const [viewby, setViewBy] = useState('graph');
    const [assetCategory, setAssetCategory] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [graphData, setGraphData] = useState(false);

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
            if (response.status === 201) {
                toast({
                    description: "Your message has been sent.",
                });
                form.reset();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An unexpected error occurred.");
        };
        localStorage.setItem("formSubmitted", "true");
        localStorage.setItem("submissionTimestamp", Date.now().toString());
        setIsModalOpen(false)
        setLoading(false)
        setIsSubmitted(true)
        setGraphData(true)
        haldleSubmit()
    };

    // Constants for time calculations
    const TWENTY_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

    useEffect(() => {
        // Check if the form has already been submitted (stored in localStorage)
        const formSubmitted = localStorage.getItem("formSubmitted");
        const submissionTimestamp = localStorage.getItem("submissionTimestamp");

        if (formSubmitted === "true" && submissionTimestamp) {
            const currentTime = Date.now();
            const timeDifference = currentTime - submissionTimestamp;

            // If 20 days have passed since submission, clear the localStorage
            if (timeDifference > TWENTY_DAYS_IN_MS) {
                localStorage.removeItem("formSubmitted");
                localStorage.removeItem("submissionTimestamp");
                setIsSubmitted(false); // Allow form to open again
            } else {
                setIsSubmitted(true); // Keep form closed if within 20 days
            }
        }
    }, []);

    const fetcAcm = async () => {
        try {
            const response = await axios.post(
                "https://wealthelite.in/eliteN/research-calculator/get-amc",
                {},
                {
                    auth: {
                        username: "redvision_calcutors_user",
                        password: "7uXtqvbW6PI6r4enIT1MKs7XH897G3Un"
                    }
                }
            );
            setAllAcmdata(response.data);
        } catch (error) {
            console.error("Error fetching AMC data:", error);
        }
    };

    const fetcAssetCategory = async () => {
        try {
            const response = await axios.get(
                "https://dev.wealthelite.in/eliteN/research-calculator/get-asset",
                {
                    auth: {
                        username: "redvision_calcutors_user",
                        password: "7uXtqvbW6PI6r4enIT1MKs7XH897G3Un"
                    }
                }
            );
            setAssetCategory(response.data.data);
        } catch (error) {
            console.error("Error fetching AMC data:", error);
        }
    };

    useEffect(() => {
        fetchSchemes();
    }, [selectedAcms])

    React.useEffect(() => {
        fetcAcm();
        fetcAssetCategory();
    }, []);

    const handleAssetSelect = (scheme) => {
        const assetClass = scheme?.assets_class;
        if (assetClass) {
            setSelectedAssets((prevSelected) => {
                const updatedSelection = new Set(prevSelected);

                if (updatedSelection.has(assetClass)) {
                    // If already selected, remove it
                    updatedSelection.delete(assetClass);
                } else {
                    // If not selected, add it
                    updatedSelection.add(assetClass);
                }
                return updatedSelection; // Return updated Set
            });
        } else {
            console.warn('No valid assets_class found in selectedAcm');
        }
    };

    useEffect(() => {
        // Convert the Set back to an array and filter out undefined values
        const updatedFunds = Array.from(selectedAssets)
            .filter(fund => fund !== undefined); // Remove undefined values
        // Fetch asset data after updating funds
        if (updatedFunds.length > 0) {
            fetchAsset(updatedFunds);
        }
    }, [selectedAssets]);

    const fetchAsset = async (funds) => {
        try {
            const response = await axios.post(
                "https://dev.wealthelite.in/eliteN/research-calculator/get-sub-asset",
                {
                    schemePlan: "growth",
                    subAssetClass: funds, // Use the updated funds
                },
                {
                    auth: {
                        username: "redvision_calcutors_user",
                        password: "7uXtqvbW6PI6r4enIT1MKs7XH897G3Un",
                    },
                }
            );
            setSchemesData(response.data); // Update the state with fetched schemes
        } catch (error) {
            console.error("Error fetching schemes data:", error);
        }
    };

    const fetchSchemes = async (selectedAcm) => {
        // Check if the fund is already in the array to avoid duplicates
        if (!funds?.includes(selectedAcm?.fund)) {
            // Append the new fund to the existing array
            setFunds((prevFunds) => [...prevFunds, selectedAcm?.fund]);
        }
        try {
            const response = await axios.post(
                "https://wealthelite.in/eliteN/research-calculator/get-scheme",
                {
                    schemePlan: "growth",
                    fund: funds,
                    // assetsClass: ["Flexi Cap Fund"]
                }, // Pass the selected AMC
                {
                    auth: {
                        username: "redvision_calcutors_user",
                        password: "7uXtqvbW6PI6r4enIT1MKs7XH897G3Un"
                    }
                }
            );
            setSchemesData(response.data);  // Update the state with fetched schemes
        } catch (error) {
            console.error("Error fetching schemes data:", error);
        }
    };

    // Handle selecting/deselecting AMCs
    const handleAcmSelect = (scheme) => {
        if (selectedAcms.includes(scheme)) {
            setSelectedAcms(selectedAcms.filter((s) => s !== scheme));
        } else {
            setSelectedAcms([...selectedAcms, scheme]);
            fetchSchemes(scheme);  // Fetch schemes when an AMC is selected
        }
    };

    const haldleSubmit = async () => {
        if (selectedAcms.length === 0 && selectedAssets.size === 0) {
            toast({
                variant: "destructive",
                title: "Please select scheme",
            });
            setGraphData(false)
        }
        else {
            try {
                const response = await axios.post(
                    "https://dev.wealthelite.in/eliteN/research-calculator/swp-performance",
                    {
                        startDate: startsipDate,
                        endDate: endsipDate,
                        fundPcode: pcode,
                        investmentDate: valuationDate,
                        initialAmount: Number(initialAmount),
                        withdrawalAmount: Number(withdrawalAmount)
                    },
                    {
                        auth: {
                            username: "redvision_calcutors_user",
                            password: "7uXtqvbW6PI6r4enIT1MKs7XH897G3Un"
                        }
                    }
                );
                if (response.data.data == null) {
                    setGraphData(false)
                }
                else {
                    setGraphData(true)
                    setResult(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching schemes data:", error);
            }
        }
    }

    const handlePdf = async (result, title, startsipDate, valuationDate) => {
        generatePDF(result, title, startsipDate, valuationDate, 'graphId');
    }

    const handleModelOpen = (open) => {
        // Check if no schemes are selected
        if (selectedAcms.length === 0 && selectedAssets.size === 0) {
            toast({
                variant: "destructive",
                title: "Please select scheme",
            });
        } else {
            setIsModalOpen((prevState) => !prevState);
        }
    };

    return (
        <div className="lg:px-40 md:px-20 px-10 py-10">
            <Toaster />
            <div className="mb-5">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/performance">Performance</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Swp Performance</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            SWP Performance
                        </h1>
                    </div>
                    <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5 mb-3'>
                        <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                            {/* Investment Type Toggle */}
                            <div className="flex space-x-4 mb-8">
                                <Button
                                    onClick={() => (setIsMonthlySip(true), setSchemesData([]), setGraphData(false))}
                                    className={`text-sm rounded-full ${isMonthlySip ? 'bg-green-900/90' : 'bg-gray-300 text-gray-800'}`}
                                >
                                    Fund House
                                </Button>
                                <Button
                                    onClick={() => (setIsMonthlySip(false), setSchemesData([]), setGraphData(false))}
                                    className={`text-sm rounded-full ${!isMonthlySip ? 'bg-green-900/90' : 'bg-gray-300 text-gray-800'}`}
                                >
                                    Asset Category
                                </Button>
                            </div>

                            <div className="input-fields mt-5 mb-5">
                                {isMonthlySip ? (
                                    <div className="w-lg">
                                        <h1 className="font-semibold text-gray-700">Select ACM</h1>
                                        <div className="max-w-lg mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                                            <input
                                                type="text"
                                                placeholder="Search Scheme"
                                                className="w-full px-3 py-2 border rounded mb-1"
                                            />
                                            {/* Render checkboxes for each AMC */}
                                            {allAcmdata?.data?.map((scheme, index) => (
                                                <div key={index} className="flex items-center mb-1">
                                                    <input
                                                        type="checkbox"
                                                        id={`acm-${index}`}
                                                        checked={selectedAcms.includes(scheme)}
                                                        onChange={() => handleAcmSelect(scheme)}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={`acm-${index}`} className="text-stone-900 text-sm">
                                                        {scheme?.funddes}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-4 gap-x-4">
                                        <div>
                                            <h1 className="font-semibold text-gray-700">Select Equity Funds</h1>
                                            <div className="max-w-lg mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                                                {/* Render checkboxes for each */}
                                                {assetCategory?.filter((item) => item.nav_c2 === 'Equity').map((scheme, index) => (
                                                    <div key={index} className="flex items-center mb-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`asset-${index}`}
                                                            checked={selectedAssets.has(scheme.assets_class)}
                                                            onChange={() => handleAssetSelect(scheme)}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`asset-${index}`} className="text-stone-900 text-sm">
                                                            Equity - {scheme?.assets_class}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="font-semibold text-gray-700">Select Debt Funds</h1>
                                            <div className="max-w-lg mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                                                {/* Render checkboxes for each AMC */}
                                                {assetCategory?.filter((item) => item.nav_c2 === 'Debt').map((scheme, index) => (
                                                    <div key={index} className="flex items-center mb-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`asset-${index}`}
                                                            checked={selectedAssets.has(scheme.assets_class)}
                                                            onChange={() => handleAssetSelect(scheme)}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`asset-${index}`} className="text-stone-900 text-sm">
                                                            Debt - {scheme?.assets_class}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="font-semibold text-gray-700">Select Hybrid Funds</h1>
                                            <div className="max-w-lg mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                                                {/* Render checkboxes for each AMC */}
                                                {assetCategory?.filter((item) => item.nav_c2 === "Hybrid").map((scheme, index) => (
                                                    <div key={index} className="flex items-center mb-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`asset-${index}`}
                                                            checked={selectedAssets.has(scheme.assets_class)}
                                                            onChange={() => handleAssetSelect(scheme)}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`asset-${index}`} className="text-stone-900 text-sm">
                                                            Hybrid - {scheme?.assets_class}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="font-semibold text-gray-700">Select Commodity Funds/ Others</h1>
                                            <div className="max-w-lg mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                                                {/* Render checkboxes for each AMC */}
                                                {assetCategory?.filter((item) => item.nav_c2 === 'Other ' || item.nav_c2 === 'Others' || item.nav_c2 === 'Sol Oriented').map((scheme, index) => (
                                                    <div key={index} className="flex items-center mb-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`asset-${index}`}
                                                            checked={selectedAssets.has(scheme.assets_class)}
                                                            onChange={() => handleAssetSelect(scheme)}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`asset-${index}`} className="text-stone-900 text-sm">
                                                            Other - {scheme?.assets_class}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <hr />
                            <div className="grid grid-cols-7">
                                <div className="col-span-2 mt-2 overflow-y-auto p-2">
                                    {/* Dropdown for selecting a scheme */}
                                    <div className="mb-4">
                                        <label htmlFor="schemeSelect" className="text-sm block font-semibold text-gray-700 mb-1">
                                            Select Scheme
                                        </label>
                                        <select
                                            id="schemeSelect"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            onChange={(e) => {
                                                const selectedScheme = schemesData?.data.find(
                                                    (scheme) => scheme.funddes === e.target.value
                                                );
                                                setPcode(selectedScheme?.pcode);
                                                setTitle(selectedScheme?.funddes);
                                            }}
                                        >
                                            <option value="" selected>
                                                Choose a scheme
                                            </option>
                                            {schemesData.data ? (
                                                schemesData && schemesData?.data?.map((scheme, index) => (
                                                    <option key={index} value={scheme?.funddes}>
                                                        {scheme?.funddes}
                                                    </option>
                                                ))
                                            ) : "Loading..."}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-1 mt-2 overflow-y-auto p-2">
                                    {/* Text input for scheme name */}
                                    <div className="mb-4">
                                        <label htmlFor="schemeName" className="text-sm block font-semibold text-gray-700 mb-1">Initial Amt</label>
                                        <input
                                            type="number"
                                            id="schemeName"
                                            placeholder="Enter scheme name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={initialAmount}
                                            onChange={(e) => setInitialAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 mt-2 overflow-y-auto p-2">
                                    {/* Text input for scheme name */}
                                    <div className="mb-4">
                                        <label htmlFor="schemeName" className="text-sm block font-semibold text-gray-700 mb-1">Withdrawal Amt</label>
                                        <input
                                            type="number"
                                            id="schemeName"
                                            placeholder="Enter scheme name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={withdrawalAmount}
                                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Date input for selecting a date */}
                                <div className="col-span-1 mt-2 overflow-y-auto p-2">
                                    <div className="mb-4">
                                        <label htmlFor="schemeDate" className="text-sm block font-semibold text-gray-700 mb-1">Investment Date</label>
                                        <input
                                            type="date"
                                            id="schemeDate"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            min={endsipDate}
                                            max={getTodayDate()}
                                            value={valuationDate}
                                            onChange={(e) => setValuationDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Date input for selecting a date */}
                                <div className="col-span-1 mt-2 overflow-y-auto p-2">
                                    <div className="mb-4">
                                        <label htmlFor="schemeDate" className="text-sm block font-semibold text-gray-700 mb-1">SWP Start Date</label>
                                        <input
                                            type="date"
                                            id="schemeDate"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={startsipDate}
                                            onChange={(e) => setStartSipDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Date input for selecting a date */}
                                <div className="col-span-1 mt-2 overflow-y-auto p-2">
                                    <div className="mb-4">
                                        <label htmlFor="schemeDate" className="text-sm block font-semibold text-gray-700 mb-1">SWP End Date</label>
                                        <input
                                            type="date"
                                            id="schemeDate"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            min={startsipDate}
                                            value={endsipDate}
                                            onChange={(e) => setEndSipDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {isSubmitted ? <Button onClick={() => haldleSubmit()}>Show</Button>
                                :
                                <Dialog open={isModalOpen} onOpenChange={() => handleModelOpen(true)}>
                                    <DialogTrigger asChild>
                                        <Button>Show</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Personalised Sip Planning For</DialogTitle>
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
                    </div>
                    <div className='col-span-1'>
                        {graphData &&
                            <div className="mb-5 flex justify-between">
                                <div className="space-x-2">
                                    <Button variant="outline" className={`border ${viewby === 'graph' ? 'border-green-600' : 'border-gray-600'} uppercase font-semibold text-gray-800`} onClick={() => setViewBy('graph')}>Graph</Button>
                                    <Button variant="outline" className={`border ${viewby === 'table' ? 'border-green-600' : 'border-gray-600'} uppercase font-semibold text-gray-800`} onClick={() => setViewBy('table')}>Table</Button>
                                </div>
                                <div className="cursor-pointer" onClick={() => handlePdf(result.resData, title, startsipDate, valuationDate)}>
                                    <h1 className="text-2xl"><FaFilePdf /></h1>
                                </div>
                            </div>
                        }
                        {console.log(result)}
                        {result ? viewby === 'graph' ?
                            <div id="graphId">
                                {graphData && <SwpPerformanceChart piedata={result} startDate={startsipDate} endDate={endsipDate} title={title} withdrawal={withdrawalAmount} />}
                            </div>
                            :
                            <div>
                                {graphData && <SwpPerformanceTable data={result} />}
                            </div> : <div>No Data Found</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}