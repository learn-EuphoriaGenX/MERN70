import React from "react";
import Menu from "./Menu";

import {
    Compass,
    Flame,
    House,
    Gamepad2,
    Trophy,
    Briefcase,
    Bitcoin,
    Cpu,
    Info,
    CircleHelp,
    ShieldCheck,
    Lock,
    Settings,
    LogOut,
} from "lucide-react";

function Sidebar() {
    const menus = [
        {
            title: "Main",
            items: [
                { name: "Home", icon: <House size={18} />, link: "/" },
                { name: "Popular", icon: <Flame size={18} />, link: "/popular" },
                { name: "Explore", icon: <Compass size={18} />, link: "/explore" },
            ],
        },

        {
            title: "Topics",
            items: [
                { name: "Gaming", icon: <Gamepad2 size={18} />, link: "/topics/gaming" },
                { name: "Sports", icon: <Trophy size={18} />, link: "/topics/sports" },
                { name: "Business", icon: <Briefcase size={18} />, link: "/topics/business" },
                { name: "Crypto", icon: <Bitcoin size={18} />, link: "/topics/crypto" },
                { name: "Technology", icon: <Cpu size={18} />, link: "/topics/technology" },
            ],
        },

        {
            title: "Resources",
            items: [
                { name: "About", icon: <Info size={18} />, link: "/about" },
                { name: "Help Center", icon: <CircleHelp size={18} />, link: "/help" },
                { name: "Community Rules", icon: <ShieldCheck size={18} />, link: "/rules" },
                { name: "Privacy Policy", icon: <Lock size={18} />, link: "/privacy" },
            ],
        },

        {
            title: "More",
            items: [
                { name: "Settings", icon: <Settings size={18} />, link: "/settings" },
                { name: "Logout", icon: <LogOut size={18} />, link: "/logout" },
            ],
        },
    ];

    return (
        <div className="w-[270px] pt-13 h-screen bg-[#0E1113] px-4 py-6 overflow-y-auto sidebar-scroll  border-r border-gray-700">

            {menus.map((menu, index) => (
                <div key={index} className="mb-6">
                    <Menu options={menu} />
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
