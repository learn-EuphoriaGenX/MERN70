import React from "react";

export default function Menu({ options }) {
    return (
        <div className="w-full">

            {/* Section Title */}
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">
                {options.title}
            </p>

            {/* Items */}
            <div className="flex flex-col gap-1">
                {options.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1A1D1F] cursor-pointer transition"
                    >
                        <span className="text-gray-300">{item.icon}</span>
                        <p className="text-gray-200 text-sm font-medium">
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
