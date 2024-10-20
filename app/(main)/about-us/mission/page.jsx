import Image from 'next/image'
import React from 'react'

export const metadata = {
    title: "About Us",
    description: "Generated by create REDVision Technologies.",
    author: "REDVision Technologies Pvt. Ltd.",
};

const AboutUs = () => {
    return (
        <section className="lg:px-40 md:px-20 px-6 my-10">
            <div className='my-5 text-center'>
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-400">Mission - Vision</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 px-5 md:px-29">
                <div className='p-5 border bottom-2 border-gray-400 rounded-lg'>
                    <div className='py-1 flex justify-between items-center mb-7'>
                        <Image src="/images/mission.webp" alt='mobile-app' width={70} height={100} className='' />
                        <h1 className='font-bold text-red-600 text-xl'>Our Mission</h1>
                    </div>
                    <p className='font-normal text-gray-700 text-md'>To empower individuals and businesses by providing accessible, reliable, and customer-centric financial solutions that promote growth and stability.
                    </p>
                </div>
                <div className='p-5 border bottom-2 border-gray-400 rounded-lg'>
                    <div className='py-1 flex justify-between items-center mb-7'>
                        <Image src="/images/vision.webp" alt='mobile-app' width={70} height={100} className='' />
                        <h1 className='font-bold text-red-600 text-xl'>Our Vision</h1>
                    </div>
                    <p className='font-normal text-gray-700 text-md'>To be the leading non-banking financial company that drives financial inclusion and innovation, transforming lives and communities across India.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs