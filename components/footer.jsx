import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import Link from 'next/link'
import React from 'react'
import { TwitterLogoIcon, Facebook } from "@radix-ui/react-icons";
import { AiFillFacebook } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
            <footer className="bg-stone-950">
                <h2 className="font-bold">Company</h2>
            </footer>
            <footer className="bg-no-repeat bg-cover bg-[url('/images/site-footer-shape.png')] bg-stone-950 bg-blend-overlay">
                <div className="mx-auto w-full max-w-screen-xl">
                    <div className="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                        <div>
                            <h2 className="mb-2 text-md font-semibold text-white uppercase">Company</h2>
                            <p className="mb-6 text-sm text-gray-500 border-gray-500 border-b py-4">Lorem ipsum dolor sit amet, consect etur adi pisicing elit sed do eiusmod.</p>
                            <div className="text-gray-500 font-medium">
                                <div className="mb-4 flex items-center">
                                    <IoCall className="text-white" />
                                    <Link href="tel:+919331023407" className="hover:underline ml-3">+91 9331023407, +91 7666573269</Link>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <IoMail className="text-white" />
                                    <Link href="mailto:support@esdeefinmart.com" className="hover:underline ml-3">support@esdeefinmart.com</Link>
                                    {/* <Link href="mailto:esdeefinmart@gmail.com" className="hover:underline ml-3">esdeefinmart@gmail.com</Link> */}
                                </div>
                                <div className="mb-4 flex items-center">
                                    <IoLocationSharp className="text-white" />
                                    <Link href="#" className="hover:underline ml-3">7A, Bentick Street, 2nd Floor, Kolkata - 700001</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-6 text-md font-semibold text-white uppercase">Quick Links</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">About</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Services</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Tools</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Blog</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-md font-semibold text-white uppercase">Service</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Mutual Fund</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Financial Planning</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Tax Planning</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Retirement Planning</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Insurance</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">FD & Bonds</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-md font-semibold text-white uppercase">Follow Us</h2>
                            <div className="flex gap-x-5">
                                <Link href="#">
                                    <h2 className="mb-6 text-4xl font-semibold text-white uppercase w-10 h-10 bg-stone-600 hover:bg-stone-500 rounded-full flex items-center justify-center">
                                        <FaTwitter className={`text-xl w-5 h-5`} />
                                    </h2>
                                </Link>
                                <Link href="#">
                                    <h2 className="mb-6 text-4xl font-semibold text-white uppercase w-10 h-10 bg-stone-600 rounded-full flex items-center justify-center">
                                        <FaFacebookF className={`text-xl w-5 h-5`} />
                                    </h2>
                                </Link>
                                <Link href="#">
                                    <h2 className="mb-6 text-4xl font-semibold text-white uppercase w-10 h-10 bg-stone-600 rounded-full flex items-center justify-center">
                                        <FaInstagram className={`text-xl w-5 h-5`} />
                                    </h2>
                                </Link>
                                <Link href="#">
                                    <h2 className="mb-6 text-4xl font-semibold text-white uppercase w-10 h-10 bg-stone-600 rounded-full flex items-center justify-center">
                                        <FaLinkedin className={`text-xl w-5 h-5`} />
                                    </h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between border-t border-gray-700">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="https://flowbite.com/" className="hover:underline">esdeefinmart</Link>. All Rights Reserved.</span>
                        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                            <li>
                                <Link href="#" className="hover:underline me-4 md:me-6">Terms and Condition</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
