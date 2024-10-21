"use client"
import * as React from "react"
import { useState, useEffect } from "react"
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

export function CarouselSpacing() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/testimonials')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                setTestimonials(result);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    function createMarkup(item) {
        return { __html: item }
    }
    return (
        <section className="lg:px-40 md:px-20 px-6 my-20">
            <div className="text-center">
                {/* Title Section */}
                <h1 className="text-3xl font-bold mb-5 inline-block text-[#422c0a]">Testimonials</h1>
                {/* Line Under the Title */}
                <div className="h-1 w-[200px] bg-gray-900 mx-auto mb-10 rounded"></div>
            </div>
            <h1 className="text-md mb-5 inline-block text-gray-600">Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</h1>
            <Carousel className="max-w-6xl mx-auto">
                <CarouselContent className="-ml-1">
                    {testimonials?.map((item, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center px-6">
                                        <h1 className="text-xl font-normal text-gray-600">
                                            {item?.content && (
                                                <div dangerouslySetInnerHTML={createMarkup(item?.content)} />
                                            )}
                                        </h1>
                                    </CardContent>
                                    <div className="flex -mt-20 px-6 mb-5 align-bottom items-center">
                                        <div className="rounded-full lg:w-24 lg:h-24 w-20 h-16">
                                            <Image src={item?.image?.url} alt='mobile-app' width={550} height={550} className="rounded-full" />
                                        </div>
                                        <div className="ml-4">
                                            <h1 className="font-semibold">{item?.author}</h1>
                                            <p className="text-sm">{item?.designation}</p>
                                        </div>
                                    </div>

                                </Card>
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
