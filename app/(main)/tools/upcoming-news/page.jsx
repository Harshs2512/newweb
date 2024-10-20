"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '@/components/landing/newscard';
import { NewsCardSkeleton } from '@/components/skeletons/newscardskeleton';

export default function UpcomingNews() {
    const [alldata, setAlldata] = useState([]);
    const [marketdata, setMarketdata] = useState([]);
    const [ipodata, setIpodata] = useState([]);
    const [category, setCategory] = useState('popular');
    const [loading, setLoading] = useState(true); // Step 1: Create loading state

    const updateNews = async () => {
        await axios.post("/api/upcoming-news/popular-news");
    };

    const updateMarketNews = async () => {
        await axios.post("/api/upcoming-news/market-news");
    };

    const updateIpoNews = async () => {
        await axios.post("/api/upcoming-news/ipo-news");
    };

    const fetchNews = async () => {
        setLoading(true); // Step 2: Set loading to true before fetching
        const res = await axios.get("/api/upcoming-news/popular-news");
        setAlldata(res.data);
        setLoading(false); // Step 3: Set loading to false after fetching
    };

    const fetchMarketNews = async () => {
        setLoading(true); // Set loading to true before fetching
        const res = await axios.get("/api/upcoming-news/market-news");
        setMarketdata(res.data);
        setLoading(false); // Set loading to false after fetching
    };

    const fetchIpoNews = async () => {
        setLoading(true); // Set loading to true before fetching
        const res = await axios.get("/api/upcoming-news/ipo-news");
        setIpodata(res.data);
        setLoading(false); // Set loading to false after fetching
    };

    useEffect(() => {
        updateNews();
        updateIpoNews();
        updateMarketNews();
    }, []);

    useEffect(() => { fetchNews(); }, []);
    useEffect(() => { fetchMarketNews(); }, []);
    useEffect(() => { fetchIpoNews(); }, []);

    const handleCategory = (cat) => {
        setCategory(cat);
    };

    return (
        <section className="lg:px-40 md:px-20 px-6 my-10">
            <div className='my-5 text-center mb-10'>
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-400">Upcoming News</span>
                </h1>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="bg-gray-800 px-5 py-3 text-center rounded cursor-pointer" onClick={() => handleCategory('popular')}>
                        <h1 className="text-2xl text-white">Popular News</h1>
                    </div>
                    <div className="bg-gray-800 px-5 py-3 text-center rounded cursor-pointer" onClick={() => handleCategory('market')}>
                        <h1 className="text-2xl text-white">Market News</h1>
                    </div>
                    <div className="bg-gray-800 px-5 py-3 text-center rounded cursor-pointer" onClick={() => handleCategory('ipo')}>
                        <h1 className="text-2xl text-white">IPO News</h1>
                    </div>
                </div>
                <div>
                    {loading ? ( // Step 4: Conditional rendering based on loading state
                        <div className="">
                            <NewsCardSkeleton />
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-5">
                            {(category === 'popular' ? alldata : category === 'market' ? marketdata : ipodata).map((item, index) => (
                                <NewsCard item={item} key={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}