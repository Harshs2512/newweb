"use client";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SipCalculator from "@/components/sipcalculator";
import { ReturnChart } from "@/components/returnchart";

export default function Page() {
    const param = useParams();
    const searchParams = useSearchParams();
    const performanceId = searchParams.get("id");
    const pcode = searchParams.get("pcode");
    const [loading, setLoading] = useState(false);
    const [performanceData, setPerformanceData] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [timeFrame, setTimeFrame] = useState("1Y"); // Default time frame

    const fetchPerformanceData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://wealthelite.in/eliteN/research/top_performer_data",
                { ftype: performanceId, returnFundType: "", duration: "" }
            );
            if (response.status === 200) {
                const foundData = response.data.data?.find(
                    (item) => item.pcode === pcode
                );
                setPerformanceData(foundData);
            }
        } catch (error) {
            console.error("Error fetching performance data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGraphData = async (pCode, timeFrame) => {
        try {
            const response = await axios.post(
                "https://wealthelite.in/eliteN/research/top_Performer_GraphData",
                { pCode: pCode, timeFrame: timeFrame } // Send time frame to the API
            );
            if (response.status === 200) {
                setGraphData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching graph data:", error);
        }
    };

    useEffect(() => {
        if (pcode) {
            fetchPerformanceData();
            fetchGraphData(pcode, timeFrame); // Fetch graph data using pcode and time frame
        }
    }, [performanceId, pcode, timeFrame]);

    const updateGraph = (timeFrame) => {
        setTimeFrame(timeFrame); // Update the time frame
        fetchGraphData(pcode, timeFrame); // Fetch new graph data based on the time frame
    };

    const transformGraphData = (data) => {
        if (!data) return {};

        const labels = data.navDateArray || [];
        const navValues = data.navArray?.map((item) => parseFloat(item)) || [];

        return {
            labels,
            datasets: [
                {
                    label: "NAV over time",
                    data: navValues,
                    fill: false,
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: "rgba(75, 192, 192, 0.2)",
                },
            ],
        };
    };
    console.log(performanceData)
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
                            <BreadcrumbLink href="/tools/fund-performance">
                                Fund Performance
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {performanceId && (
                            <BreadcrumbItem>
                                <BreadcrumbPage>{param.slug}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div>
                {loading ? (
                    <p>Loading performance data...</p>
                ) : (
                    <div>
                        <div className="mb-5">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                {performanceData?.funddes}
                            </h1>
                            <h1 className="text-lg font-medium text-stone-700">
                                {performanceData?.schemeCategory}
                            </h1>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className='col-span-2'>
                                <div className='p-4 shadow rounded mb-5'>
                                    <div className='grid grid-cols-3 mb-2'>
                                        <div>
                                            <h1 className='text-md text-stone-600'>Nav</h1>
                                            <p className='text-lg font-bold text-gray-900'>{performanceData?.threeyear_navStartDate}</p>
                                            <p className='text-xs text-gray-600'>On {performanceData?.threeyear_startDate}</p>
                                        </div>
                                        <div>
                                            <h1 className='text-md text-stone-600'>Nav</h1>
                                            <p className='text-lg font-bold text-gray-900'>{performanceData?.threeyear_navEndDate}</p>
                                            <p className='text-xs text-gray-600'>As of {performanceData?.threeyear_endDate}</p>
                                        </div>
                                        <div>
                                            <p className='text-lg font-bold text-green-700'>
                                                {performanceData?.five_year === '0.00' ? performanceData?.three_year === '0.00' ? performanceData?.one_year : performanceData?.three_year : performanceData?.five_year}%</p>
                                            <p className='text-xs font-semibold text-gray-600'>{performanceData?.five_year === '0.00' ? performanceData?.three_year === '0.00' ? 1 : 3 : 5}Y CAGR returns</p>
                                        </div>
                                    </div>
                                    {graphData ? (
                                        <ReturnChart data={transformGraphData(graphData)} />
                                    ) : (
                                        <p>No graph data available.</p>
                                    )}
                                </div>
                                <div>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-2xl">Scheme Performance</AccordionTrigger>
                                            <AccordionContent className="px-10">
                                                <p className='text-sm font-meduim text-gray-900 mb-3'>Returns and Ranks</p>
                                                <div className='border-y border-stone-500 flex justify-between py-4 items-center'>
                                                    <div>
                                                        <h1 className='text-md font-medium text-gray-800'>Time Line</h1>
                                                    </div>
                                                    <div className='grid grid-cols-4 text-center gap-x-20'>
                                                        <div className='text-lg font-bold text-gray-800'>1Y</div>
                                                        <div className='text-lg font-bold text-gray-800'>3Y</div>
                                                        <div className='text-lg font-bold text-gray-800'>5Y</div>
                                                        <div className='text-lg font-bold text-gray-800'>MAX</div>
                                                    </div>
                                                </div>
                                                <div className='border-b border-stone-500 flex justify-between py-4'>
                                                    <div>
                                                        <h1 className='text-md font-bold text-gray-800'>Trailing Returns</h1>
                                                    </div>
                                                    <div className='grid grid-cols-4 text-center gap-x-16'>
                                                        <div className='text-md font-medium text-gray-800'>{performanceData?.one_year || '-'}%</div>
                                                        <div className='text-md font-medium text-gray-800'>{performanceData?.three_year || '-'}%</div>
                                                        <div className='text-md font-medium text-gray-800'>{performanceData?.five_year || '-'}%</div>
                                                        <div className='text-md font-medium text-gray-800'>{performanceData?.si || '-'}%</div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger className="text-2xl">Fund Managers</AccordionTrigger>
                                            <AccordionContent className="px-10">
                                                <div className='rounded shadow py-2 px-3 mt-2'>
                                                    <div className='flex flex-col gap-1'>
                                                        {performanceData?.fundManager.split(',').map((manager, index) => (
                                                            <div key={index} className='mr-4'>
                                                                <div className='text-md font-bold text-gray-800'>{manager.trim()}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger className="text-2xl">Fund Objective</AccordionTrigger>
                                            <AccordionContent className="px-10">
                                                <div className='mt-2'>
                                                    <div className='text-md text-gray-800'>
                                                        The Investment objective of the scheme is to provide long term capital appreciation by investing in equity and equity related instruments of Public Sector Undertakings (PSUs). The Scheme does not guarantee/indicate any returns. There can be no assurance that the schemes objectives will be achieved.
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                            <div className="col-span-1 border border-gray-300 rounded bg-white">
                                <SipCalculator data={performanceData?.si} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}