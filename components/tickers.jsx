import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const Carousel = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://wealthelite.in/eliteN/app/live-rates");
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 30000); // Refresh data every 30 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden container mx-auto">
            <div className="flex animate-scroll">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="px-4 py-2 flex items-center gap-2 bg-black border-r border-white min-w-[200px]"
                    >
                        <h1 className="font-bold text-white text-sm">{item?.indexName}</h1>
                        <h1 className="font-semibold text-white text-sm">{item?.figure}</h1>
                        <h1
                            className={`font-medium text-sm flex items-center ${
                                item?.diff_amount > 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            {item?.diff_amount > 0 ? <FiArrowUp /> : <FiArrowDown />}
                            {item?.diff_amount} ({item?.percentage})
                        </h1>
                    </div>
                ))}
                {/* Duplicate items for infinite scroll effect */}
                {data.map((item, index) => (
                    <div
                        key={`duplicate-${index}`}
                        className="px-4 py-2 flex items-center gap-2 bg-black border-r border-white min-w-[200px]"
                    >
                        <h1 className="font-bold text-white text-sm">{item?.indexName}</h1>
                        <h1 className="font-semibold text-white text-sm">{item?.figure}</h1>
                        <h1
                            className={`font-medium text-sm flex items-center ${
                                item?.diff_amount > 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            {item?.diff_amount > 0 ? <FiArrowUp /> : <FiArrowDown />}
                            {item?.diff_amount} ({item?.percentage})
                        </h1>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${200 * data.length}px); }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Carousel;
