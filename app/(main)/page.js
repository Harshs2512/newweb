"use client"
import React, { Fragment, useEffect, useCallback, useState } from "react";
import Homepage from "@/components/landing/homepage";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import WorkingProcess from "@/components/landing/workingprocess";
import FinancialTool from "@/components/landing/financialtools";
import AboutUs from "@/components/landing/aboutus";
import OurService from "@/components/landing/ourservice";
import TopFeatures from "@/components/landing/topfeatures";
import { CarouselSpacing } from "@/components/landing/carousel";
import SubscribCard from "@/components/landing/subscribcard";
import { OurPosts } from "@/components/landing/ourposts";
import SlipcalCulator from "@/components/landing/slipcalculator";
import Tickers from "@/components/tickers";

export default function Page({ children }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of image sources
    const slides = [
        {
            image: "/images/1.png",
            text: "Slide 1: Welcome to our platform!",
        },
        {
            image: "/images/2.png",
            text: "Slide 2: Explore our features.",
        },
        {
            image: "/images/3.png",
            text: "Slide 3: Experience seamless service.",
        },
        {
            image: "/images/4.png",
            text: "Slide 4: Your satisfaction is our priority.",
        },
        {
            image: "/images/5.png",
            text: "Slide 5: Get started today!",
        },
    ];

    // Function to handle next slide
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Function to handle previous slide
    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    // Function to handle slide indicator click
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    
    return (
        <div className="bg-slate-50 flex flex-col items-center">
            <main>
                <Suspense fallback={<Skeleton />}>
                    <Tickers />
                </Suspense>
                <Suspense fallback={<Skeleton />}>
                    <Homepage />
                </Suspense>
                <WorkingProcess />
                <FinancialTool />
                <AboutUs />
                <OurService />
                <TopFeatures />
                <CarouselSpacing />
                <SlipcalCulator />
                <OurPosts />
                <SubscribCard />
                <div id="custom-carousel" className="relative w-full">
                    {/* Carousel wrapper */}
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {/* Carousel items */}
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute block w-full transition-all duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                            >
                                <img
                                    src={slide.image}
                                    className="block w-full object-cover"
                                    alt={`Slide ${index + 1}`}
                                />
                                {/* Text overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h2 className="text-white text-2xl md:text-4xl font-bold bg-black/50 px-4 py-2 rounded">
                                        {slide.text}
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slider indicators */}
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-white" : "bg-gray-400"}`}
                                aria-current={i === currentIndex ? "true" : "false"}
                                aria-label={`Slide ${i + 1}`}
                                onClick={() => goToSlide(i)}
                            ></button>
                        ))}
                    </div>

                    {/* Slider controls */}
                    <button
                        type="button"
                        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        onClick={goToPreviousSlide}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                            <svg
                                className="w-4 h-4 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        onClick={goToNextSlide}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                            <svg
                                className="w-4 h-4 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </main>
        </div>
    );
}