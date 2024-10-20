import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Homepage = () => {
    return (
        <div className="bg-center bg-no-repeat bg-cover bg-[url('/images/banner_shape.png')]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="px-4 text-start py-40 lg:py-56 lg:px-40" data-aos="fade-right">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Your Financial
                    </h1>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Success Is Our
                    </h1>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Priority
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, laborum? Cupiditate expedita quis consectetur quod aliquam eligendi odit atque quo accusantium.</p>
                    <div>
                        <Button className="uppercase text-md font-bold py-7 px-10 bg-gradient-to-r from-red-900 to-orange-600">
                            Know More
                        </Button>
                    </div>
                </div>
                <div className='mx-auto py-10 hidden md:block' data-aos="fade-left">
                    <Image src="/images/mobiles.png" alt='mobile-app' width={550} height={550} />
                </div>
            </div>
        </div>
    )
}

export default Homepage