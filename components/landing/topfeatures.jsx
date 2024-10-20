'use client';
import { SectionHeading } from '@/styled-components';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';

const TopFeatures = () => {
    const cards = [
        { image: '/images/card1.png', count: 500, title: 'Active Clients' },
        { image: '/images/project.png', count: 86, title: 'Project Done' },
        { image: '/images/rating.png', count: 456, title: 'Client Rating' },
        { image: '/images/branch.png', count: 12, title: 'Branch Started' },
    ];

    const [animatedCounts, setAnimatedCounts] = useState(cards.map(card => ({ ...card, currentCount: 0 })));
    const sectionRef = useRef(null); // Create a ref for the section
    const [hasAnimated, setHasAnimated] = useState(false); // To ensure the animation runs only once

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true); // Set to true to prevent further animations
                    animatedCounts.forEach((item, index) => {
                        const targetCount = item.count;
                        const duration = 2000; // Duration in milliseconds
                        const startTime = performance.now();

                        const animateCount = (timestamp) => {
                            const elapsed = timestamp - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const currentCount = Math.floor(progress * targetCount);
                            setAnimatedCounts(prevCounts => {
                                const newCounts = [...prevCounts];
                                newCounts[index].currentCount = currentCount;
                                return newCounts;
                            });

                            if (progress < 1) {
                                requestAnimationFrame(animateCount);
                            }
                        };

                        requestAnimationFrame(animateCount);
                    });
                }
            });
        }, { threshold: 0.1 }); // Adjust the threshold as needed

        if (sectionRef.current) {
            observer.observe(sectionRef.current); // Start observing the section
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current); // Clean up the observer
            }
        };
    }, [animatedCounts, hasAnimated]);

    return (
        <div ref={sectionRef}>
            <div className="bg-red-500">
                <div className='max-w-screen-xl mx-auto my-10 mt-20 px-4 md:px-1 py-10 '>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 lg:my-10">
                        {animatedCounts.map((item, index) => (
                            <div key={index} className="grid p-6 border-r border-gray-200/30 group transition-transform duration-300 text-center">
                                <div className='mx-auto flex mb-10 justify-center transition duration-300 ease-in-out group-hover:bg-gray-900 bg-yellow-600 w-28 h-28 rounded-full p-5'>
                                    <Image src={item.image} alt="download app" width={100} height={100} className='h-auto max-w-full' />
                                </div>
                                <p className="text-6xl text-white font-normal mb-3">{item.currentCount}</p>
                                <Link href="#">
                                    <h3 className="transition ease-linear mb-2 text-xl font-normal tracking-tight text-white ">
                                        {item.title}
                                    </h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 my-10 lg:pl-40">
                    <div className="text-start py-3 lg:py-7 lg:px-10 lg:pl-40 mx-4" data-aos="fade-right">
                        <div className='my-4'>
                            <SectionHeading title={'Features'} subtitle={'Top Features We'} className={'text-white'} />
                        </div>
                        <h1 className="text-white mb-4 text-4xl font-bold tracking-tight leading-none md:text-3xl lg:text-4xl">
                            Provide
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </p>
                        <div>
                            <div className="flex">
                                <div className='pr-3'>
                                    <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto' />
                                </div>
                                <p className='mb-2 text-md font-normal text-gray-300'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            <div className="flex">
                                <div className='pr-3'>
                                    <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto' />
                                </div>
                                <p className='mb-2 text-md font-normal text-gray-300'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            <div className="flex">
                                <div className='pr-3'>
                                    <Image src="/images/tick.png" alt='mobile-app' width={25} height={20} className='m-auto' />
                                </div>
                                <p className='mb-2 text-md font-normal text-gray-300'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-10' data-aos="fade-down">
                        <Image src="/images/mobile2.png" alt='mobile-app' width={420} height={750} className='m-auto' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopFeatures;