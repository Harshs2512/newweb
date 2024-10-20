import React from 'react';

const SectionHeading = ({ title, subtitle, className }) => {
    return (
        <div>
            <h3 className={`${className ? className : 'text-red-700'} max-w-sm py-1  uppercase text-sm`}>
                <span className="border-b border-red-700 font-light">{title}</span>
            </h3>
            <h1 className={`mb-4 text-2xl font-bold tracking-tight leading-none ${className ? className : 'text-black'} md:text-4xl lg:text-5xl my-2`}>
                {subtitle}
            </h1>
        </div>
    );
}

export default SectionHeading;
