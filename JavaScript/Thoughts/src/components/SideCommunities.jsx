import React from 'react'

function SideCommunities() {
    const communities = [
        {
            name: "r/AskReddit",
            members: "57,702,776 members",
            icon: "https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png",
        },
        {
            name: "r/leagueoflegends",
            members: "8,335,060 members",
            icon: "https://www.redditstatic.com/avatars/avatar_default_07_FF4500.png",
        },
        {
            name: "r/OutOfTheLoop",
            members: "3,653,694 members",
            icon: "https://www.redditstatic.com/avatars/avatar_default_07_FF4500.png",
        },
        {
            name: "r/discordapp",
            members: "1,484,612 members",
            icon: "https://www.redditstatic.com/avatars/avatar_default_07_FF4500.png",
        },
        {
            name: "r/Twitch",
            members: "2,858,686 members",
            icon: "https://www.redditstatic.com/avatars/avatar_default_07_FF4500.png",
        },
    ];
    return (
        <div className="w-[370px] border-l border-gray-700 absolute right-0 top-0 pt-13 h-screen bg-[#0E1113] px-4 py-6 overflow-y-auto sidebar-scroll border-r">
            <div className="w-[320px] bg-[#0E1113] rounded-2xl pt-10 p-4">

                {/* Title */}
                <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-4">
                    Popular Communities
                </h2>

                {/* List */}
                <div className="flex flex-col gap-1">
                    {communities.map((community, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1A1D1F] cursor-pointer transition"
                        >
                            {/* Icon */}
                            <img
                                src={community.icon}
                                alt="community"
                                className="w-9 h-9 rounded-full"
                            />

                            {/* Text */}
                            <div>
                                <p className="text-white text-sm font-medium">
                                    {community.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {community.members}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More */}
                <button className="text-white text-sm font-medium mt-4 hover:underline">
                    See more
                </button>
            </div>



            <div className="text-gray-500 absolute bottom-10 text-xs mt-6 space-y-2">
                <div className="flex flex-wrap gap-3">
                    <p className="hover:underline cursor-pointer">Reddit Rules</p>
                    <p className="hover:underline cursor-pointer">Privacy Policy</p>
                    <p className="hover:underline cursor-pointer">User Agreement</p>
                    <p className="hover:underline cursor-pointer">Accessibility</p>
                </div>

                <p className="mt-2">
                    Reddit, Inc. © 2026. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default SideCommunities