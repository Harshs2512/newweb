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
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-400">Mutual Funds</span></h1>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1 my-10 px-5 md:px-29">
                <div className='py-10' data-aos="fade-right">
                    <Image src="/images/aboutus.jpg" alt='mobile-app' width={720} height={750} className='m-auto' />
                </div>
                <div className="text-start py-1 lg:py-7 lg:px-5" data-aos="fade-up"
                >
                    <h1 className="mb-4 text-xl font-bold tracking-tight leading-none md:text-5xl lg:text-2xl text-stone-800">
                        Esdee Finmart Private Limited
                    </h1>
                    <p className="mb-8 text-md font-normal text-gray-600">
                        Welcome to Esdee Finmart Private Limited, your trusted financial companion in India. We understand that your financial journey is more than just numbers; it's a story of dreams, aspirations, and the legacy you want to leave behind. At Esdee Finmart Private Limited, we are driven by the belief that everyone deserves a secure and prosperous future.
                        Our journey began with a simple promise: to empower every individual in India to achieve their financial goals and protect what matters most. We know that life's uncertainties can be overwhelming, but with the right guidance and support, you can navigate them successfully.
                        Our dedicated team of financial experts is committed to providing you with the best guidance and services tailored to your unique needs. We take pride in the relationships we've built with our clients, and their success stories inspire us every day.
                        In a rapidly changing world, we remain steadfast in our dedication to helping you secure your financial future. Your dreams are our top priority, and your trust is the cornerstone of our service.
                        Join us on this journey towards your financial freedom. Let's create a future that's not just financially sound but also peaceful. Together, we can turn dreams into reality.
                    </p>
                </div>
            </div> */}
            <div>
                <h1 className='font-semibold text-gray-800 text-center text-2xl mb-10'>Grow Your Wealth Wisely</h1>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>Diverse Mutual Fund Solutions for Everyone</h1>
                    <p className='text-gray-600 text-md ml-7'>Investing is a powerful way to build wealth over time, and mutual funds offer a flexible and efficient approach to achieving your financial goals. At Esdee Finmart Private Limited, we provide a range of mutual fund options tailored to suit your individual investment needs, whether you’re a beginner or an experienced investor.</p>
                </div>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>What are Mutual Funds?</h1>
                    <p className='text-gray-600 text-md ml-7'>Mutual funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities. This collective investment approach allows individuals to benefit from professional management and diversification, minimizing risks while aiming for attractive returns.</p>
                </div>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>What are Mutual Funds?</h1>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Equity Mutual Funds</AccordionTrigger>
                            <AccordionContent>
                                Invest primarily in stocks, aiming for long-term capital growth.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Debt Mutual Funds</AccordionTrigger>
                            <AccordionContent>
                                Invest in fixed-income securities like government bonds and corporate debt.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Hybrid Mutual Funds</AccordionTrigger>
                            <AccordionContent>
                                Combine investments in both equity and debt securities, balancing risk and return.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Index Funds</AccordionTrigger>
                            <AccordionContent>
                                Aim to replicate the performance of a specific market index, like the Nifty or Sensex.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='mb-10' data-aos="fade-right">
                    <h1 className='text-gray-800 text-lg mb-2'>Features of Our Mutual Funds</h1>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Professional Management:</span> Each fund is managed by experienced professionals who monitor and adjust investments to optimize performance.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Diversification:</
                    span> Investing in a variety of securities reduces risk and enhances potential returns.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Liquidity:</span> Mutual funds offer easy access to your money, allowing you to buy or sell units as needed.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Systematic Investment Plans (SIPs):</span> Invest regularly through SIPs, making it easier to manage your finances and build wealth over time.</p>
                    <p className='text-gray-600 text-md ml-7'><span className='text-gray-800 text-md mb-2 font-bold'>Transparent Reporting:</span> Regular updates on fund performance and holdings keep you informed about your investments.</p>
                </div>
            </div>
        </section>
    )
}

export default MutualFunds