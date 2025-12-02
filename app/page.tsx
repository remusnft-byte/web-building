"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Settings, FlaskConical, ShoppingCart, Twitter, Instagram, User } from 'lucide-react';

const PHRASES = [
    "our slogan here",
    "we build things that shouldn't exist",
    "don't read here please",
];

// Custom TikTok icon since Lucide might not have it or it varies
const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [positions, setPositions] = useState<{ top: string; left: string; rotate: string }[]>([]);
    const [chaosBtnPos, setChaosBtnPos] = useState({ top: '50%', left: '50%' });

    useEffect(() => {
        setMounted(true);
        const newPositions = PHRASES.map(() => ({
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            rotate: `${Math.random() * 30 - 15}deg`,
        }));
        setPositions(newPositions);

        setChaosBtnPos({
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
        });
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-white flex flex-col items-center pt-10 font-sans text-black">
            {/* Top Right Blob */}
            <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-60 blur-3xl filter pointer-events-none" />

            {/* Top Right Line */}
            <div className="absolute top-[15%] right-[5%] h-1 w-48 rotate-[-15deg] transform bg-gradient-to-r from-purple-400 to-purple-600 opacity-80 pointer-events-none" />

            {/* Bottom Left Blob */}
            <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 opacity-60 blur-3xl filter pointer-events-none" />

            {/* Bottom Left Line */}
            <div className="absolute bottom-[15%] left-[5%] h-1 w-48 rotate-[-15deg] transform bg-gradient-to-r from-purple-400 to-purple-600 opacity-80 pointer-events-none" />

            {/* Chaos Button */}
            {mounted && (
                <button
                    className="absolute z-50 bg-purple-600 text-white px-12 py-6 text-4xl font-bold border-4 border-purple-900 rotate-3 hover:scale-110 transition-transform duration-300 ease-out shadow-[5px_5px_0px_0px_rgba(88,28,135,1)] rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-md"
                    style={{
                        top: chaosBtnPos.top,
                        left: chaosBtnPos.left,
                        fontFamily: 'var(--font-indie-flower)',
                    }}
                >
                    ENTER THE CHAOS
                </button>
            )}

            {/* Logo */}
            <div className="relative z-10 mb-8">
                <Image
                    src="/aintlabs-logo.png"
                    alt="Aint Labs Logo"
                    width={1000}
                    height={375}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Center Image */}
            <div className="relative z-10 mb-20">
                <Image
                    src="/characters.jpg"
                    alt="Characters"
                    width={600}
                    height={400}
                    className="object-contain mix-blend-multiply contrast-125 brightness-110"
                    priority
                />
            </div>

            {/* Random Phrases */}
            {mounted && positions.map((pos, index) => (
                <div
                    key={index}
                    className="absolute text-2xl text-gray-800 z-20 pointer-events-none"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        transform: `rotate(${pos.rotate})`,
                        fontFamily: 'var(--font-indie-flower)',
                    }}
                >
                    {PHRASES[index]}
                </div>
            ))}

            {/* Footer Sections */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-20 z-30 relative">
                {/* The Unmethod */}
                <div className="flex flex-col items-center text-center transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
                    <h3 className="text-2xl font-bold mb-1">The Unmethod:</h3>
                    <p className="text-lg mb-4">Why we break rules.</p>
                    <Settings size={64} strokeWidth={1.5} className="text-black" />
                </div>

                {/* Featured Projects */}
                <div className="flex flex-col items-center text-center transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
                    <h3 className="text-2xl font-bold mb-1">Featured Projects:</h3>
                    <p className="text-lg mb-4">See our latest experiments.</p>
                    <FlaskConical size={64} strokeWidth={1.5} className="text-black" />
                </div>

                {/* Visit The Shop */}
                <div className="flex flex-col items-center text-center transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
                    <h3 className="text-2xl font-bold mb-1">Visit The Shop:</h3>
                    <p className="text-lg mb-4">We'll do our worst.</p>
                    <ShoppingCart size={64} strokeWidth={1.5} className="text-black" />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 z-30 relative">
                {/* Socials */}
                <div className="bg-[#1a1a2e] text-white py-16 flex flex-col items-center justify-center rounded-tr-[50px] transition-transform duration-300 ease-out hover:scale-105 cursor-pointer">
                    <h3 className="text-3xl mb-8">Socials</h3>
                    <div className="flex gap-8">
                        <Twitter size={48} />
                        <Instagram size={48} />
                        <TikTokIcon size={48} color="white" />
                    </div>
                </div>

                {/* Team */}
                <div className="bg-[#fdfbf7] py-16 flex flex-col items-center justify-center transition-transform duration-300 ease-out hover:scale-105 cursor-pointer">
                    <h3 className="text-3xl mb-8 text-black">Team</h3>
                    <div className="flex gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-2">
                                <User size={48} className="text-black" />
                            </div>
                            <span className="font-bold text-sm tracking-wider">COFOUNDER</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-2">
                                <User size={48} className="text-black" />
                            </div>
                            <span className="font-bold text-sm tracking-wider">COFOUNDER</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
