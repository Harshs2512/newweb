'use client';
import { SectionHeading } from '@/styled-components';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FinancialTool = () => {
    return (
        <div className="bg-no-repeat bg-cover bg-[url('/images/tools-grid.png')] py-1 bg-stone-950 bg-blend-multiply">
            <div className='max-w-screen-xl mx-auto my-10 mt-20'>
                <div className='my-4' data-aos="fade-right">
                <SectionHeading title={'Tools'} subtitle={'Financial Tools'} className={'text-white'} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-10">
                <div className="p-6 shadow border-r border-stone-800 group hover:text-red-500 hover:scale-105 transition-transform duration-300">
                    <div className='flex mb-10 justify-start transition-transform duration-300 group-hover:scale-105'>
                        <Image src="/images/work-pro-white.png" alt="download app" width={50} height={100} className='h-auto max-w-full' />
                    </div>
                    <p className="font-thin text-sm text-white">01</p>
                    <Link href="#">
                        <h3 className="transition ease-linear mb-2 text-2xl font-bold tracking-tight group-hover:text-red-500 text-white ">
                            Download Our App
                        </h3>
                    </Link>
                    <p className="mt-5 font-normal transition-opacity duration-900 text-white"><ArrowRight /></p>
                </div>
                {/* Add more cards as needed */}
                <div className="p-6 shadow border-r border-stone-800 group hover:text-red-500 hover:scale-105 transition-transform duration-300">
                    <div className='flex mb-10 justify-start transition-transform duration-300 group-hover:scale-105'>
                        <Image src="/images/work-pro-white.png" alt="download app" width={50} height={100} className='h-auto max-w-full' />
                    </div>
                    <p className="font-thin text-sm text-white">01</p>
                    <Link href="#">
                        <h3 className="transition ease-linear mb-2 text-2xl font-bold tracking-tight group-hover:text-red-500 text-white ">
                            Download Our App
                        </h3>
                    </Link>
                    <p className="mt-5 font-normal transition-opacity duration-900 text-white"><ArrowRight /></p>
                </div>
                <div className="p-6 shadow border-r border-stone-800 group hover:text-red-500 hover:scale-105 transition-transform duration-300">
                    <div className='flex mb-10 justify-start transition-transform duration-300 group-hover:scale-105'>
                        <Image src="/images/work-pro-white.png" alt="download app" width={50} height={100} className='h-auto max-w-full' />
                    </div>
                    <p className="font-thin text-sm text-white">01</p>
                    <Link href="#">
                        <h3 className="transition ease-linear mb-2 text-2xl font-bold tracking-tight group-hover:text-red-500 text-white ">
                            Download Our App
                        </h3>
                    </Link>
                    <p className="mt-5 font-normal transition-opacity duration-900 text-white"><ArrowRight /></p>
                </div>
                <div className="p-6 shadow border-r border-stone-800 group hover:text-red-500 hover:scale-105 transition-transform duration-300">
                    <div className='flex mb-10 justify-start transition-transform duration-300 group-hover:scale-105'>
                        <Image src="/images/work-pro-white.png" alt="download app" width={50} height={100} className='h-auto max-w-full' />
                    </div>
                    <p className="font-thin text-sm text-white">01</p>
                    <Link href="#">
                        <h3 className="transition ease-linear mb-2 text-2xl font-bold tracking-tight group-hover:text-red-500 text-white ">
                            Download Our App
                        </h3>
                    </Link>
                    <p className="mt-5 font-normal transition-opacity duration-900 text-white"><ArrowRight /></p>
                </div>
            </div>
        </div>
        </div >
    );
}

export default FinancialTool;