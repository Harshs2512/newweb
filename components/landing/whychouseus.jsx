'use client'
import { SectionHeading } from '@/styled-components'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const WhyChouseUs = () => {
    const services = [
        {
            id: 1,
            imageUrl: '/images/1727757841124_blog.webp',
            title: "MSME",
            link:""
        },
        {
            id: 2,
            imageUrl: '/images/1727757841124_blog.webp',
            title: "Loan Against Property"
        },
        {
            id: 3,
            imageUrl: '/images/1727757841124_blog.webp',
            title: "Loan Against Securities"
        },
        {
            id: 4,
            imageUrl: '/images/1727757841124_blog.webp',
            title: "Personal Loan"
        }
    ];

    return (
        <div className="text-center py-10 px-20" id="products">
            {/* Title Section */}
            <h1 className="text-3xl font-bold mb-5 inline-block text-[#422c0a]">Why Choose Us?</h1>
            {/* Line Under the Title */}
            <div className="h-1 w-[200px] bg-gray-900 mx-auto mb-10 rounded"></div>

            {/* Services Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="relative overflow-hidden transition-transform transform hover:scale-105 group rounded"
                    >
                        <img
                            src={service.imageUrl}
                            alt={`Service ${service.id}`}
                            className="w-full h-auto transition-transform duration-300 ease-in-out"
                        />

                        {/* Overlay Layer */}
                        <div className="absolute inset-0 items-center justify-center bg-black bg-opacity-80 transform translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 py-5">
                            <h2 className="text-yellow-600 text-xl font-bold mb-3">{service?.title}</h2>
                            <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci soluta quos accusantium praesentium nam </p>
                            <Link href="#" className="text-white text-xs hover:underline">Read More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WhyChouseUs;