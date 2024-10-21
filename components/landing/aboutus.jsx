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
        <div className="my-10 px-5 md:px-20">
            <div className="text-center py-1 lg:py-7 lg:px-5" data-aos="fade-up">
                {/* Title Section */}
                <h1 className="text-3xl  font-bold mb-5 inline-block text-[#422c0a]">What We Offer</h1>
                {/* Line Under the Title */}
                <div className="h-1 w-[200px] bg-gray-900 mx-auto mb-10 rounded"></div>
                <p className="mb-8 text-lg font-normal text-gray-600">We provide financing solutions tailored for individuals and businesses who are underserved by traditional banks.
                </p>
                <div>
                    <div className="flex">
                        <div>
                            <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto mr-3' />
                        </div>
                        <p className='mb-2 text-md font-normal text-gray-600'>Our key offering is Loan Against Property, enabling clients to unlock the value of their property and secure funding for business & personal needs.</p>
                    </div>
                    <div className="flex text-start">
                        <div>
                            <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto mr-4' />
                        </div>
                        <p className='mb-2 text-md font-normal text-gray-600'>
                            This financing option supports MSMEs by meeting their working capital requirements and fueling business growth. Our unique approach includes accepting income based on assessment years, which sets us apart.
                        </p>
                    </div>
                    <div className="flex">
                        <div>
                            <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto mr-3' />
                        </div>
                        <p className='mb-2 text-md font-normal text-gray-600'>
                            Additionally, we offer loans for salaried individuals, providing a secured and accessible path to achieving their financial goals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs