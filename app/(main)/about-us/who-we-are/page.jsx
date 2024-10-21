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
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-400">Who We Are</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-10 px-5 md:px-29">
                <div className='py-10' data-aos="fade-right">
                    <Image src="/images/aboutus.jpg" alt='mobile-app' width={720} height={750} className='m-auto rounded' />
                </div>
                <div className="text-start py-1 lg:py-7 lg:px-5" data-aos="fade-up"
                >
                    <p className="mb-8 text-md font-normal text-gray-600">
                        <span className='text-4xl font-bold text-[#af874c]'>F</span>inaura, established in 2024 and registered under the Reserve Bank of India, is a dynamic Non-Banking Financial Company (NBFC)
                        driven by a highly experienced team, including Nikunj Maheshwari, Adheesh Kabra, Rishi Agarwal, and Brij Mohan Baheti. As a new
                        entrant in the financial services industry, we are committed to offering innovative, reliable, and customer-focused financial solutions
                        that cater to a wide range of evolving needs.
                        Our primary focus is on Loan Against Property, which enables clients to use their property as collateral to secure loans for various
                        needs. We offer loans to both self-employed and salaried individuals based on their collateral and regular income inflow. This
                        approach allows us to tailor our offerings to meet specific customer requirements effectively. Our unique selling proposition lies in
                        our assessment-based income approach, providing flexibility and personalized solutions for securing loans.
                        In this early phase, we strategically target MSMEs (self-employed) & salaried individuals, with loan offerings ranging from ₹5 lakhs
                        to ₹50 lakhs. Our services cater to clients aged 25 to 60, aiming to bridge the financial inclusion gap in underserved communities..
                    </p>
                </div>
            </div>
            <p>
                By offering accessible financial services in these regions, we aspire to contribute to local economic growth and improve the lives of
                individuals and businesses alike.
                At Finaura, we are dedicated to building lasting relationships based on trust, transparency, and excellence in service. Our
                experienced team takes pride in understanding each client's unique needs and delivering personalized financial solutions that drive
                success. As we expand, our unwavering commitment to integrity, innovation, and customer-centricity remains at the heart of
                everything we do. We look forward to shaping a brighter financial future for individuals and businesses across India
            </p>
        </section>
    )
}

export default AboutUs