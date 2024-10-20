"use client"
import React, { useEffect } from 'react'
import { SectionHeading } from '@/styled-components'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
 
const AboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);
 
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 my-10 px-5 md:px-29">
            <div className='py-10' data-aos="fade-right">
                <Image src="/images/laptop.png" alt='mobile-app' width={720} height={750} className='m-auto' />
            </div>
            <div className="text-start py-1 lg:py-7 lg:px-5 lg:mr-32" data-aos="fade-up"
                >
                <div className='my-4'>
                    <SectionHeading title={'About Our Oraganaigation'} subtitle={'Work with a Dedicated'} />
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl lg:text-6xl">
                    Financial Advisory Company
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry iss standard dummy text ever since the 1500s, when an unknown printer took a galley
                </p>
                <div>
                    <div className="flex">
                        <div>
                            <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto mr-3' />
                        </div>
                        <p className='mb-2 text-md font-normal text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className="flex">
                        <div>
                            <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto mr-3' />
                        </div>
                        <p className='mb-2 text-md font-normal text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className="flex">
                        <div>
                            <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto mr-3' />
                        </div>
                        <p className='mb-2 text-md font-normal text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default AboutUs