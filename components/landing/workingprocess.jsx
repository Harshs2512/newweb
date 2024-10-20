'use client'
import { SectionHeading } from '@/styled-components'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const WorkingProcess = () => {
    const [hoverIndex, setHoverIndex] = useState(null)

    const cardData = [
        {
            animation: "fade-right",
            title: 'Download Our App',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            images: {
                default: '/images/work-pro-white.png',
                hover: '/images/work-pro-red.png'
            }
        },
        {
            animation: "fade-up",
            title: 'Video KYC',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            images: {
                default: '/images/work-pro-white.png',
                hover: '/images/work-pro-red.png'
            }
        },
        {
            animation: "fade-left",
            title: 'Invest & Track',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            images: {
                default: '/images/work-pro-white.png',
                hover: '/images/work-pro-red.png'
            }
        }
    ];

    return (
        <div className="bg-no-repeat bg-cover bg-[url('/images/work-pro-grid.png')]">
            <div className="max-w-screen-xl mx-auto my-10 mt-20 px-4">
                <div className='my-4'>
                    <h3 className={`text-red-700 max-w-sm py-1 uppercase text-sm`}>
                        <span className="border-b border-red-700 font-light">Working Process</span>
                    </h3>
                    <h1 className={`mb-4 text-2xl font-bold tracking-tight leading-none text-black md:text-4xl lg:text-5xl my-2`}>
                        Way You Invest
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 bg-center">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className="max-w-sm p-6 bg-white transition ease-in-out duration-100 hover:bg-gradient-to-bl from-stone-600 via-stone-950 to-black border border-gray-300 hover:text-white text-gray-900 rounded-lg shadow group hover:scale-105 relative"
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            data-aos={card.animation}

                        >
                            <div className='flex justify-between'>
                                <div className='bg-red-600 group-hover:bg-white flex w-24 h-24 rounded-full p-5 mb-10 justify-center'>
                                    <Image
                                        src={hoverIndex === index ? card.images.hover : card.images.default}
                                        alt={card.title}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>
                            <Link href="#">
                                <h3 className="mb-2 text-2xl font-bold tracking-tight">
                                    {card.title}
                                </h3>
                            </Link>
                            <p className="mb-3 font-normal transition-opacity duration-900">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WorkingProcess;