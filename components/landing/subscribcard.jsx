"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SubscribCard = () => {
    const FormSchema = z.object({
        posttitle: z.string().min(2, { message: "Post title must be at least 2 characters." }),
        metatitle: z.string().nonempty({ message: "Meta Title is required." }),
        description: z.string().nonempty({ message: "Description is required." }),
        image: z.instanceof(File).optional(),
        category: z.string().nonempty({ message: "Please select a category." }),
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            posttitle: "",
            metatitle: "",
            description: "",
            keywords: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('posttitle', data.posttitle);
        formData.append('metatitle', data.metatitle);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('keywords', data.keywords);
        formData.append('content', content);

        try {
            const response = await axios.post('/api/blogs/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            if (response.status === 201) {
                toast({
                    variant: '',
                    title: "Data uploaded successfully",
                    // description: "There was a problem with your request.",
                });
                form.reset();
                setSelectedImage(null);
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An unexpected error occurred.");
        }
        finally { setLoading(false) }
    };

    // Define images as an array of strings
    const images = [
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
        "/images/6.png",
        "/images/7.png",
        "/images/8.png",
        "/images/9.png",
        "/images/10.png",
    ];

    return (
        <div className="lg:px-20 md:px-10 px-4 container">
            <Carousel
                className="w-full mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >
                <CarouselContent className="-ml-1">
                    {images.map((src, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <div className="px-5 py-10">
                                <Image src={src} alt={`Image ${index + 1}`} width={160} height={180} className="opacity-80 hover:opacity-100 transition ease-in-out duration-75" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 border md:py-20 py-10 md:px-20 px-5 rounded-lg lg:my-20 my-5">
                <div className="md:flex md:justify-between items-center justify-center">
                    <h1 className="text-white font-semibold uppercase lg:text-3xl md:text-2xl text-2xl">Subscribe Our Newsletter</h1>
                    <div className="flex">
                        <Input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:px-14 md:py-9 px-12 py-7"></Input>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded px-7">
                                <FormField
                                    control={form.control}
                                    name="posttitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-gray-700">Post Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Post Title" {...field} aria-label="Post Title" className="border border-gray-500" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <Button className="uppercase md:px-10 md:py-9 px-8 py-7 md:mt-0 mt-6 ml-3">let&apos;s get started</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscribCard;