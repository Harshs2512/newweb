import Image from 'next/image';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const MutualFunds = () => {
    return (
        <section className="lg:px-40 md:px-20 px-6 my-10">
            <div className='my-5 text-center mb-10'>
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-400">Wealth Management</span></h1>
            </div>
            <div>
                <h1 className='font-semibold text-gray-800 text-center text-2xl mb-10'>Comprehensive Wealth Management</h1>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>Tailored Solutions for Your Financial Future</h1>
                    <p className='text-gray-600 text-md ml-7'>Effective wealth management is essential for individuals and families looking to secure their financial futures. At Esdee Finmart Private Limited, we offer personalized wealth management services designed to help you grow and protect your assets while achieving your financial goals.</p>
                </div>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>What is Wealth Management?</h1>
                    <p className='text-gray-600 text-md ml-7'>Wealth management is a comprehensive approach to managing an individual’s financial resources, integrating various services such as investment management, financial planning, estate planning, and tax strategies. Our goal is to provide you with a holistic plan that aligns with your aspirations and risk tolerance.</p>
                </div>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>Types of Wealth Management Services</h1>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Investment Management</AccordionTrigger>
                            <AccordionContent>
                                Professional management of your investment portfolio, tailored to your financial objectives.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Financial Planning</AccordionTrigger>
                            <AccordionContent>
                                Comprehensive analysis of your financial situation to create a strategic plan.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Estate Planning</AccordionTrigger>
                            <AccordionContent>
                                Guidance on how to manage and distribute your assets according to your wishes.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Tax Strategies</AccordionTrigger>
                            <AccordionContent>
                                Development of tax-efficient investment strategies to maximize after-tax returns.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>Features of Our Wealth Management Services</h1>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Personalized Approach:</span> Tailored strategies that align with your unique financial situation and goals.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Expert Guidance:</
                    span> Access to experienced professionals who provide insights and recommendations.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Holistic Solutions: </span> Integration of various financial services for a comprehensive management strategy.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Regular Reviews:</span> Ongoing monitoring and adjustments to your financial plan to adapt to changes in your life and the market.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Transparent Reporting:</span> Regular updates on fund performance and holdings keep you informed about your investments.</p>
                </div>
            </div>
        </section>
    )
}

export default MutualFunds