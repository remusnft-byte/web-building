"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const PHRASES = [
    "our slogan here",
    "we build things that shouldn't exist",
    "don't read here please",
];

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [positions, setPositions] = useState<{ top: string; left: string; rotate: string }[]>([]);

    useEffect(() => {
        setMounted(true);
        const newPositions = PHRASES.map(() => ({
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            rotate: `${Math.random() * 30 - 15}deg`,
        }));
        setPositions(newPositions);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-white flex flex-col items-center pt-10">
            {/* Top Right Blob */}
            <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-60 blur-3xl filter pointer-events-none" />

            {/* Top Right Line */}
            <div className="absolute top-[15%] right-[5%] h-1 w-48 rotate-[-15deg] transform bg-gradient-to-r from-purple-400 to-purple-600 opacity-80 pointer-events-none" />

            {/* Bottom Left Blob */}
            <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 opacity-60 blur-3xl filter pointer-events-none" />

            {/* Bottom Left Line */}
            <div className="absolute bottom-[15%] left-[5%] h-1 w-48 rotate-[-15deg] transform bg-gradient-to-r from-purple-400 to-purple-600 opacity-80 pointer-events-none" />

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
            <div className="relative z-10">
                <Image
                    src="/characters.jpg"
                    alt="Characters"
                    width={600}
                    height={400}
                    className="object-contain"
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
        </div>
    );
}
