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

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);
    
    // const screenwidth = window.screen.availWidth;
    // console.log(screenwidth);

    return (
        <div className="w-full overflow-x-auto"> {/* Enable horizontal scrolling */}
            <div className="min-w-[100px] max-w-[1576px] mx-auto"> {/* Fixed 1576px width */}
                <div className='flex flex-row'>
                    <div
                        style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            width: "100%", // Ensure container takes full width
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                whiteSpace: "nowrap",
                                animation: "marquee 30s linear infinite", // Adjust duration as needed
                            }}
                        >
                            {data.map((item, index) => (
                                <div
                                    key={`duplicate-${index}`}
                                    className="px-4 py-2 flex items-center gap-2 bg-black border-r border-white min-w-[200px]"
                                >
                                    <h1 className="font-bold text-white text-sm">{item?.indexName}</h1>
                                    <h1 className="font-semibold text-white text-sm">{item?.figure}</h1>
                                    <h1
                                        className={`font-medium text-sm flex items-center ${item?.diff_amount > 0 ? 'text-green-500' : 'text-red-500'
                                            }`}
                                    >
                                        {item?.diff_amount > 0 ? <FiArrowUp /> : <FiArrowDown />}
                                        {item?.diff_amount} ({item?.percentage})
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
