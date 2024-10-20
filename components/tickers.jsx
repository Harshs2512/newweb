"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Tickers = () => {
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
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='p-10'>
            <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-5'>
                {data.map((item, index) => (
                    <div key={index} className='px-3 py-3 bg-white border border-gray-200 rounded shadow'>
                        <h1 className='font-bold text-gray-800 text-sm mb-2'>{item?.indexName}</h1>
                        <div className='flex gap-2'>
                            <h1 className='font-semibold text-gray-700 text-sm'>{item?.figure}</h1>
                            <h1 className='font-medium text-red-700 text-sm'>{item?.diff_amount} ({item?.percentage})</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tickers;
