import React, { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { MdHome } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import SidebarItem from './SidebarItem';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const toggleSettingsDropdown = () => {
        setSettingsDropdownOpen(!isSettingsDropdownOpen);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    return (
        <div className={`w-60 fixed transition-transform duration-300 z-50 flex h-screen bg-[#1E293B] ${isOpen ? 'translate-x-0' : '-translate-x-60'}`}>
            <div className="max text-white mt-20 flex-col space-y-3 w-full h-[calc(100vh)]">
                <SidebarItem icon={<MdHome />} label="Home" />
                <div onClick={toggleSettingsDropdown}>
                    <SidebarItem icon={<AiFillSetting />} label="Settings" />
                    {isSettingsDropdownOpen && (
                        <div className="pl-14 flex flex-col space-y-2 text-sm">
                            <div className="text-white hover:text-purple-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                                Profile Settings
                            </div>
                            <div className="text-white hover:text-purple-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                                Account Settings
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={toggleProfileDropdown}>
                    <SidebarItem icon={<BiUser />} label="Profile" />
                    {isProfileDropdownOpen && (
                        <div className="pl-14 flex flex-col space-y-2 text-sm">
                            <div className="text-white hover:text-purple-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                                View Profile
                            </div>
                            <div className="text-white hover:text-purple-500 bg-[#1E293B] p-2 rounded-full flex items-center">
                                Edit Profile
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;