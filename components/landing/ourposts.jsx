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

    return (
        <section className="lg:px-40 md:px-20 px-6 my-36">
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
        </section>
    )
}
