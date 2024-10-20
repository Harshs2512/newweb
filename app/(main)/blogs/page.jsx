"use client"
import BlogCards from '@/components/landing/blogcards'
import axios from 'axios'
import React, { Suspense } from 'react'
import Loading from './loading'

const Blogs = () => {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // await new Promise((resolve) => setTimeout(resolve, 2000));
                const res = await axios.get("/api/blogs/dashboardblogs");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='md:px-40 my-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <Suspense fallback={<Loading />}>
                    {data?.map((item, index) => (
                        <div key={index}>
                            <BlogCards item={item} />
                        </div>
                    ))}
                </Suspense>
            </div>
        </div>
    )
}

export default Blogs