"use client";
import React, { useEffect, useState } from 'react';
import { IoCall, IoLocationSharp, IoMail } from 'react-icons/io5';
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast';
// import { Resend } from 'resend';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { footerData } from '@/data/footer';

// Define the schema for form validation
const FormSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    mobile: z.string().nonempty({ message: "Mobile number is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    message: z.string().optional(),
});

export function InputForm() {
    const [hcaptchaToken, setHcaptchaToken] = useState(null);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            mobile: "",
            email: "",
            message: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        if (!hcaptchaToken) {
            alert("Please complete the CAPTCHA.");
            return;
        }

        const emaildata = {
            user: data?.username,
            to: data?.email,
            subject: 'Test Email',
            text: 'This is a test email sent from Nodemailer!',
        }

        try {
            const response = await axios.post('/api/leads/', data);
            const info = await axios.post('/api/email/', emaildata);
            console.log(info);
            if (response.status === 201) {
                toast({
                    description: "Your message has been sent.",
                });
                form.reset();
                setHcaptchaToken(null); // Reset the token after submission
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded px-7">
                {/* Username Field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="User Name" {...field} aria-label="User Name" className="border-2 border-gray-500" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Mobile Field */}
                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Mobile" {...field} aria-label="Mobile Number" className="border-2 border-gray-500" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} aria-label="Email" className="border-2 border-gray-500" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Message Field */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <textarea placeholder="Message" {...field} aria-label="Message" className="border-2 border-gray-500 w-full p-1 rounded" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* hCaptcha */}
                <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}// Replace with your site key
                    onVerify={setHcaptchaToken} // Set the token on successful verification
                />

                {/* Submit Button */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

const AboutUs = () => {
    return (
        <section className="lg:px-40 md:px-20 px-6 my-10">
            <div className="my-5 text-center mb-20">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-yellow-400">
                        Contact Us
                    </span>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10 px-5 md:px-29">
                <ContactInfo
                    icon={<IoLocationSharp />}
                    title="Address"
                    info={footerData?.company?.address}
                />
                <ContactInfo
                    icon={<IoCall />}
                    title="Phone"
                    info={footerData?.company?.mobile}
                />
                <ContactInfo
                    icon={<IoMail />}
                    title="Email"
                    info={footerData?.company?.email}
                />
            </div>

            <div className="my-10 grid grid-cols-1 md:grid-cols-2">
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.238506509894!2d88.35034317523542!3d22.57018123305903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a5f927dd65%3A0x3ad3c7a54271288f!2s2nd%20Floor%2C%207a%2C%20Bentinck%20St%2C%20Mission%20Row%20Extension%2C%20Esplanade%2C%20Lal%20Bazar%2C%20Kolkata%2C%20West%20Bengal%20700001!5e0!3m2!1sen!2sin!4v1727355041591!5m2!1sen!2sin"
                        width="600"
                        height="450"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <div>
                    <InputForm />
                </div>
            </div>
        </section>
    );
};

const ContactInfo = ({ icon, title, info }) => (
    <div className="grid grid-cols-3 justify-center">
        <div className="py-1 col-span-1 flex justify-center items-center mb-7 bg-stone-800 rounded-full w-24 h-24 text-white text-3xl">
            {icon}
        </div>
        <div className="col-span-2 py-3">
            <h1 className="font-bold text-[#af874c] text-xl">{title}</h1>
            <p
                className="font-normal text-gray-700 text-md"
                dangerouslySetInnerHTML={{ __html: info }}
            />
        </div>
        <Toaster />
    </div>
);

export default AboutUs;