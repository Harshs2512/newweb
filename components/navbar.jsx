"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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
    return (
        <nav className="bg-white border-gray-200 border-b">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/images/1.png" className="w-20" alt="Esdeefinmart Logo" width={300} height={300} />
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link href="/#" className={`block py-2 px-3 ${path === '/' ? 'text-red-700' : 'text-gray-900'} rounded md:bg-transparent md:p-0`} aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/about-us" className={`block py-2 px-3 ${path === '/about-us' ? 'text-red-700' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0`}>About Us</Link>
                        </li>
                        <li>
                            <DropdownMenu className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                                <DropdownMenuTrigger>Services</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Mutual Funds</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/wealth-management">Wealth Management</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Estate Planning</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Corporate Treasury</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Management</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Fixed Deposits and Bonds</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">PMS & AIF</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Unlisted Equity</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Real Estate</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Insurance</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Loan against</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">MF</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/services/mutual-funds">Corporate Finance and Restructuring Advisory</Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>
                            <DropdownMenu className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                                <DropdownMenuTrigger>Tools</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem><Link href="/tools/risk-profile">Risk Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/tools/financial-health">Financial Health</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/tools/fund-performance">Fund Performance</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/tools/sip-calculator">SIP Calculator</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/tools/download-forms">Download Forms</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/tools/upcoming-news">Upcoming News</Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>
                            <Link href="/blogs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Blog</Link>
                        </li>
                        <li>
                            <Link href="/contactus" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <Button className="uppercase text-md font-bold py-7 px-10">
                        Login Pannel
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar