"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";

const SubscribCard = () => {
    // Define images as an array of strings
    const images = [
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
        "/images/6.png",
        "/images/7.png",
        "/images/8.png",
        "/images/9.png",
        "/images/10.png",
    ];

    return (
        <div className="lg:px-40 md:px-20 px-4 container">
            <Carousel
                className="w-full mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >
                <CarouselContent className="-ml-1">
                    {images.map((src, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <div className="px-5 py-10">
                                <Image src={src} alt={`Image ${index + 1}`} width={160} height={180} className="opacity-80 hover:opacity-100 transition ease-in-out duration-75" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 border md:py-20 py-10 md:px-20 px-5 rounded-lg lg:my-20 my-5">
                <div className="md:flex md:justify-between items-center justify-center">
                    <h1 className="text-white font-semibold uppercase lg:text-3xl md:text-2xl text-2xl">Subscribe Our Newsletter</h1>
                    <Button className="uppercase md:px-14 md:py-9 px-12 py-7 md:mt-0 mt-6">let&apos;s get started</Button>
                </div>
            </div>
        </div>
    );
};

export default SubscribCard;