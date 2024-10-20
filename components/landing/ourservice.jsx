"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurService = () => {
    useEffect(() => {
        AOS.init({ duration: 900 }); // Initialize AOS
    }, []);

    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-5 lg:px-40 px-4 grid-cols-1">
                {/* Column 1 */}
                <div className="lg:grid grid-rows-3 col-span-1 grid-flow-col gap-5" data-aos="fade-right">
                    <div className="lg:grid row-span-1 bg-no-repeat bg-cover bg-[url('/images/project-one-img-1.png')] rounded-lg group relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                            Financial Planning
                        </div>
                    </div>
                    <div className="lg:grid row-span-2 bg-no-repeat bg-cover bg-[url('/images/project-one-img-4.png')] rounded-lg group relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                            Tax Planning
                        </div>
                    </div>
                </div>

                {/* Column 2-3 */}
                <div className="lg:grid grid-rows-4 col-span-2 grid-flow-col gap-5" data-aos="fade-left">
                    {/* Top section with two columns */}
                    <div className="grid grid-cols-3 row-span-3 gap-5">
                        <div className="col-span-2 bg-no-repeat bg-cover bg-[url('/images/project-one-img-2.png')] rounded-lg group relative">
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                Mutual Fund
                            </div>
                        </div>
                        <div className='col-span-1 grid grid-rows-2 gap-5'>
                            <div className="bg-no-repeat bg-cover bg-[url('/images/project-one-img-1.png')] rounded-lg group relative">
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                    Insurance
                                </div>
                            </div>
                            <div className="bg-no-repeat bg-cover bg-[url('/images/project-one-img-1.png')] rounded-lg group relative">
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                    Retirement Planning
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 row-span-1 gap-5" data-aos="fade-up">
                        <div className="bg-no-repeat bg-cover bg-[url('/images/project-one-img-1.png')] rounded-lg group relative">
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                FD & Bonds
                            </div>
                        </div>
                        <div className="bg-no-repeat bg-cover bg-[url('/images/project-one-img-7.png')] w-full h-40 rounded-lg group relative">
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                Loan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurService;
