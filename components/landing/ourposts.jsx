"use client"
import * as React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { SectionHeading } from "@/styled-components"
import Link from "next/link"
import axios from "axios"

export function OurPosts() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/blogs/dashboardblogs");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);
    const services = [
        { title: "Mutual Fund", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", id: 1 },
        { title: "Stocks", description: "The stock market is filled with individuals who know the price of everything but the value of nothing.", id: 2 },
        { title: "Insurance", description: "Insurance is a way to manage your risk.", id: 3 },
        { title: "Loan", description: "Loans allow individuals to borrow money for various purposes.", id: 4 },
        { title: "Retirement Plan", description: "Planning for retirement ensures a secure future.", id: 5 },
        { title: "Real Estate", description: "Investing in real estate is a great way to diversify your portfolio.", id: 6 },
    ];

    return (
        <section className="lg:px-20 md:px-20 px-6 my-36">
            <div className='my-5 text-center'>
                <h3 className={`text-red-700 py-1  uppercase text-sm`}>
                    <span className="border-b border-red-700 font-light">our blog posts</span>
                </h3>
                <h1 className={`mb-4 text-2xl font-bold tracking-tight leading-none text-black md:text-4xl lg:text-5xl my-2`}>
                    News & Articles
                </h1>
            </div>
            <Carousel className="max-w-6xl mx-auto">
                <CarouselContent className="-ml-1">
                    {data?.map((item, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                                    <Link href="#" className="">
                                        <img className="rounded-t-lg hover:scale-110 transition" src={item?.image?.url} alt="" />
                                    </Link>
                                    <div className="p-5 bg-white z-10">
                                        <Link href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.posttitle}</h5>
                                        </Link>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.posttitle}</p>
                                        <Link href={`blogs/${item.slug}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-1">
                {services.map((service) => (
                    <div key={service.id} className="relative group">
                        {/* Image Section */}
                        <img
                            src="/images/blog.jpg"
                            alt={service.title}
                            className="rounded-lg object-cover w-full h-60 transition-transform duration-500 transform"
                        />
                        {/* Hover Content */}
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="text-center text-white p-4">
                                <p className="text-yellow-400 font-bold mb-2">Service {service.id}</p>
                                <h3 className="text-2xl font-semibold">{service.title}</h3>
                                <p className="text-sm mb-4">{service.description}</p>
                                <button className="bg-red-500 text-white py-2 px-4 rounded-lg">
                                    Know More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative bg-[#f64b3c] py-16 px-8">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Section: Text */}
                    <div className="space-y-4 lg:space-y-8 text-white">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            We help to make your wealth
                        </h1>
                        <p className="text-lg lg:text-xl">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div>
                            <a href="#contact" className="text-lg font-semibold border-b-2 border-white">
                                CONTACT US
                            </a>
                        </div>
                    </div>

                    {/* Right Section: Image */}
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src="/path/to/your/laptop-image.png"
                            alt="Wealth Dashboard"
                            className="w-full lg:max-w-lg shadow-xl"
                        />
                    </div>
                </div>

                {/* Arrow Button in the Bottom Right */}
                <div className="absolute bottom-8 right-8">
                    <button className="bg-white p-4 rounded-full shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-[#f64b3c]"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
