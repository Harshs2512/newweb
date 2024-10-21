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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
                <Link href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="/images/finaura.png"
                        className="h-20"
                        alt="Finaura Logo"
                    />
                </Link>
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
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link
                                href="/"
                                className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${path === '/' ? 'md:text-[#af874c]' : 'md:text-gray-800'} md:p-0`}
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${path === '/#products' ? 'md:text-[#af874c]' : 'md:text-gray-800'} md:p-0`}
                                aria-current="page"
                                href="#products"
                            >
                                Products
                            </Link>
                        </li>
                        <li className="relative group">
                            <button
                                id="dropdownNavbarLink"
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#af874c] md:p-0 md:w-auto"
                            >
                                About Us
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
                            <div className="absolute left-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44  group-hover:block">
                                <ul
                                    className="py-2 text-sm text-gray-700"
                                    aria-labelledby="dropdownNavbarLink"
                                >
                                    <li>
                                        <Link
                                            href="/about-us/who-we-are"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Who We Are
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about-us/mission"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Mission - Vision
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about-us/core-values"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Core Values
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about-us/promoters"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Promoters & Directors
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="relative group">
                            <button
                                id="dropdownNavbarLink"
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#af874c] md:p-0 md:w-auto"
                            >
                                Customer Education
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
                            <div className="absolute left-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44  group-hover:block">
                                <ul
                                    className="py-2 text-sm text-gray-700"
                                    aria-labelledby="dropdownNavbarLink"
                                >
                                    <li>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Policies and Disclosure
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            NPA
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Cibil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Impact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#af874c] md:p-0"
                            >
                                Partner With Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#af874c] md:p-0"
                            >
                                Career
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contactus"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#af874c] md:p-0"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar