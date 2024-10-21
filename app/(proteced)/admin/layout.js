"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiFillSetting } from 'react-icons/ai';
import { MdHome } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import { FaBookOpen } from "react-icons/fa6";
import Link from 'next/link';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = '/'
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [isTestimonialDropdownOpen, setTestimonialDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSettingsDropdown = () => {
    setSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  const toggleTestimonialDropdown = () => {
    setTestimonialDropdownOpen(!isTestimonialDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };
  return (
    <div>
      <div className="fixed w-full z-30 flex bg-gray-200 border-b p-2 items-center justify-between h-16 px-10">
        <div className="logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
          NERVE
        </div>
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
              alt="profile"
              className="shadow rounded-full object-cover w-8 h-8"
            />
            <div className="hidden md:block text-sm md:text-md text-black dark:text-white">John Doe</div>
          </div>
        </div>
      </div>
      <div className={`w-60 fixed transition-transform duration-300 z-50 flex h-screen bg-[#1E293B] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-48'}`}>
        <div className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12">
          <div className="flex pl-4 items-center space-x-2">
            {/* Add any additional icons or buttons here */}
          </div>
          <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 pl-10 pr-2 py-1 rounded-full text-white">
            <div className="transform ease-in-out duration-300 mr-12">NERVE</div>
          </div>
        </div>

        <div onClick={toggleSidebar} className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-red-500 absolute top-2 p-3 rounded-full text-white">
          <RxHamburgerMenu />
        </div>

        <div className={`max text-white mt-20 flex-col space-y-3 w-full h-[calc(100vh)] ${isSidebarOpen ? 'block' : 'hidden'}`}>
          {/* Sidebar Items */}
          <Link href="/admin" onClick={toggleSidebar}>
            <div className="cursor-pointer w-full text-gray-400 hover:text-gray-50 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex items-center space-x-3">
              <MdHome className="w-4 h-4" />
              <div>Home</div>
            </div>
          </Link>
          <div className="cursor-pointer w-full text-gray-400 hover:text-gray-50 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex items-center space-x-3" onClick={toggleSettingsDropdown}>
            <FaBookOpen className="w-4 h-4" />
            <div>Manage Posts</div>
          </div>
          {isSettingsDropdownOpen && (
            <div className="pl-14 flex flex-col space-y-2 text-sm">
              <Link href="/admin/manage-posts/add-post" onClick={toggleSidebar}>
                <div className="text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                  Add Post
                </div>
              </Link>
              <Link href="/admin/manage-posts/manage" onClick={toggleSidebar}>
                <div className="text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                  Manage Posts
                </div>
              </Link>
              <Link href="/admin/manage-posts/category" onClick={toggleSidebar}>
                <div className="text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                  Manage Category
                </div>
              </Link>
            </div>
          )}
          <div className="cursor-pointer w-full text-gray-400 hover:text-gray-50 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex items-center space-x-3" onClick={toggleTestimonialDropdown}>
            <FaBookOpen className="w-4 h-4" />
            <div>Manage Testimonials</div>
          </div>
          {isTestimonialDropdownOpen && (
            <div className="pl-14 flex flex-col space-y-2 text-sm">
              <Link href="/admin/manage-testimonials/add-testimonial" onClick={toggleSidebar}>
                <div className="text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                  Add Testimonial
                </div>
              </Link>
              <Link href="/admin/manage-testimonials/manage" onClick={toggleSidebar}>
                <div className="text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                  Manage Testimonial
                </div>
              </Link>
            </div>
          )}
          <div className="cursor-pointer w-full text-gray-400 hover:text-gray-50 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex items-center space-x-3" onClick={toggleProfileDropdown}>
            <BiUser className="w-4 h-4" />
            <div>Profile</div>
          </div>
          {isProfileDropdownOpen && (
            <div className="pl-14 flex flex-col space-y-2 text-sm">
              <div className="text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                View Profile
              </div>
              <div className="text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                Edit Profile
              </div>
            </div>
          )}
        </div>
        {/* Sidebar Icons When Closed */}
        <div className={`fixed left-52 top-24 transition-transform duration-300 ${isSidebarOpen ? 'hidden' : 'block'}`}>
          <div className="flex flex-col items-center space-y-6 text-2xl">
            <div className="text-white" onClick={toggleSidebar}>
              <MdHome />
            </div>
            <div className="text-white" onClick={toggleSettingsDropdown}>
              <FaBookOpen />
            </div>
            <div className="text-white" onClick={toggleProfileDropdown}>
              <BiUser />
            </div>
          </div>
        </div>
      </div>
      <div className={`${isSidebarOpen ? 'translate-x-48' : '-translate-x-0'} px-20 pt-24`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;