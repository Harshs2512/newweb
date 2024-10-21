"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import dynamic from "next/dynamic";
// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const FormSchema = z.object({
    author: z.string().min(2, { message: "Author must be at least 2 characters." }),
    designation: z.string().nonempty({ message: "Designation is required." }),
    image: z.instanceof(File).optional(),
});

export function InputForm() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            author: "",
            designation: "",
        },
    });
    const onSubmit = async (data) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('author', data.author);
        formData.append('designation', data.designation);
        formData.append('content', content);

        try {
            const response = await axios.post('/api/testimonials/', formData, {
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

    // Sample categories; replace with your actual categories
    // const categories = ["Technology", "Health", "Education", "Entertainment", "Lifestyle"];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded px-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Username Field */}
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author" {...field} aria-label="Author" className="border border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Designation Field */}
                    <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">Designation</FormLabel>
                                <FormControl>
                                    <Input placeholder="Designation" {...field} aria-label="Designation" className="border border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Image Upload Field */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-gray-700">Upload Image</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/*" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setSelectedImage(file);
                                        field.onChange(file); // Update react-hook-form with selected file
                                    }
                                }} aria-label="Image" className="border border-gray-500" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
                <Button type="submit">{!loading ? 'Submit' : 'Loading...'}</Button>
            </form>
        </Form>
    );
}

const AddPost = () => {
    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className='font-bold text-gray-700 text-2xl mb-7'>Add New Testimonial</h1>
                <Link href="/admin/manage-posts/manage">
                    <Button className="">All Post</Button>
                </Link>
            </div>
            <div className='p-5 bg-gray-100 rounded '>
                <InputForm />
                <Toaster />
            </div>
        </div>
    )
}


export default AddPost;