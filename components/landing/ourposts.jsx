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
        <section className="lg:px-20 md:px-10 px-6 my-36">
            <div className='my-5 text-center'>
                {/* Title Section */}
                <h1 className="text-3xl font-bold mb-5 inline-block text-[#422c0a]">Our Blogs</h1>
                {/* Line Under the Title */}
                <div className="h-1 w-[200px] bg-gray-900 mx-auto mb-10 rounded"></div>

            </div>
            <Carousel className="max-w-6xl mx-auto">
                <CarouselContent className="-ml-1">
                    {data?.map((item, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <Link href={`blogs/${item.slug}`}>
                                <div className="p-1">
                                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <img className="rounded-t-lg" src={item?.image?.url} alt="" />
                                        <div className="p-5">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.posttitle}</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.posttitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}
