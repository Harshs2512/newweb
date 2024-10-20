"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const path = usePathname()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Flowbite
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-multi-level"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-multi-level"
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'
                        } w-full md:block md:w-auto`}
                    id="navbar-multi-level"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <button
                                id="dropdownNavbarLink"
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                Dropdown
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div
                                    id="dropdownNavbar"
                                    className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                >
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownNavbarLink"
                                    >
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li aria-labelledby="dropdownNavbarLink">
                                            <button
                                                id="doubleDropdownButton"
                                                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() =>
                                                    setIsSubDropdownOpen(!isSubDropdownOpen)
                                                }
                                            >
                                                Dropdown
                                                <svg
                                                    className="w-2.5 h-2.5 ms-2.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 4 4 4-4"
                                                    />
                                                </svg>
                                            </button>
                                            {isSubDropdownOpen && (
                                                <div
                                                    id="doubleDropdown"
                                                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                                >
                                                    <ul
                                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                        aria-labelledby="doubleDropdownButton"
                                                    >
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Overview
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                My downloads
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Billing
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Rewards
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Earnings
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        // <nav className="bg-white border-gray-200 border-b">
        //     <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        //         <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        //             <Image src="/images/1.png" className="w-20" alt="Esdeefinmart Logo" width={300} height={300} />
        //         </Link>
        //         <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        //             <span className="sr-only">Open main menu</span>
        //             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        //             </svg>
        //         </button>
        //         <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        //             <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
        //                 <li>
        //                     <Link href="/#" className={`block py-2 px-3 ${path === '/' ? 'text-red-700' : 'text-gray-900'} rounded md:bg-transparent md:p-0`} aria-current="page">Home</Link>
        //                 </li>
        //                 <li>
        //                     <Link href="/about-us" className={`block py-2 px-3 ${path === '/about-us' ? 'text-red-700' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0`}>About Us</Link>
        //                 </li>
        //                 <li>
        //                     <DropdownMenu className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
        //                         <DropdownMenuTrigger>Services</DropdownMenuTrigger>
        //                         <DropdownMenuContent>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Mutual Funds</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/wealth-management">Wealth Management</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Estate Planning</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Corporate Treasury</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Management</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Fixed Deposits and Bonds</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">PMS & AIF</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Unlisted Equity</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Real Estate</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Insurance</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Loan against</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">MF</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/services/mutual-funds">Corporate Finance and Restructuring Advisory</Link></DropdownMenuItem>
        //                         </DropdownMenuContent>
        //                     </DropdownMenu>
        //                 </li>
        //                 <li>
        //                     <DropdownMenu className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
        //                         <DropdownMenuTrigger>Tools</DropdownMenuTrigger>
        //                         <DropdownMenuContent>
        //                             <DropdownMenuItem><Link href="/tools/risk-profile">Risk Profile</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/tools/financial-health">Financial Health</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/tools/fund-performance">Fund Performance</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/tools/sip-calculator">SIP Calculator</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/tools/download-forms">Download Forms</Link></DropdownMenuItem>
        //                             <DropdownMenuItem><Link href="/tools/upcoming-news">Upcoming News</Link></DropdownMenuItem>
        //                         </DropdownMenuContent>
        //                     </DropdownMenu>
        //                 </li>
        //                 <li>
        //                     <Link href="/blogs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Blog</Link>
        //                 </li>
        //                 <li>
        //                     <Link href="/contactus" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Contact</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div>
        //             <Button className="uppercase text-md font-bold py-7 px-10">
        //                 Login Pannel
        //             </Button>
        //         </div>
        //     </div>
        // </nav>
    )
}

export default Navbar