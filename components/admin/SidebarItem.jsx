import React from 'react';

const SidebarItem = ({ icon, label }) => {
    return (
        <div className="cursor-pointer w-full text-gray-400 hover:text-gray-50 bg-[#1E293B] p-2 pl-8 rounded-full flex items-center space-x-3">
            {icon}
            <div>{label}</div>
        </div>
    );
};

export default SidebarItem;
