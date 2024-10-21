import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react';
import Link from 'next/link';

const Homepage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of image sources
    const slides = [
        {
            image: "/images/1727757841124_blog.webp",
            title: "FINAURA तरक़्क़ी आपकी साथ हमारा",
            subtitle: "Speedy loans with fast approvals and no complications.",
        },
        {
            image: "/images/1727757841124_blog.webp",
            title: "FINAURA तरक़्क़ी आपकी साथ हमारा",
            subtitle: "Speedy loans with fast approvals and no complications.",
        },
        {
            image: "/images/1727757841124_blog.webp",
            title: "FINAURA तरक़्क़ी आपकी साथ हमारा",
            subtitle: "Speedy loans with fast approvals and no complications.",
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
        <div id="custom-carousel" className="relative w-full">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden md:h-[600px]">
                {/* Carousel items */}
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
                            }`}
                    >
                        {/* Image */}
                        <img
                            src={slide.image}
                            className="block w-full object-cover h-56 md:h-full"
                            alt={`Slide ${index + 1}`}
                        />

                        {/* Text overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 bg-black/30"
                        >
                            <h2 className="text-white text-3xl md:text-6xl font-bold mb-4"
                                data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                                {slide.title}
                            </h2>
                            <p className="text-white text-base md:text-xl mb-6 max-w-md">
                                {slide.subtitle}
                            </p>
                            <div className="d-flex space-x-2">
                                <Link
                                    href="#"
                                    className="bg-[#422c0a] text-white text-lg md:text-xl px-6 py-2 rounded-full hover:bg-red-600 transition"
                                >
                                    MSME Loan
                                </Link>
                                <Link
                                    href="#"
                                    className="bg-[#422c0a] text-white text-lg md:text-xl px-6 py-2 rounded-full hover:bg-red-600 transition"
                                >
                                    Salaried Loan
                                </Link>
                            </div>
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
    )
}

export default Homepage