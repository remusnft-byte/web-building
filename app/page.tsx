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
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Top Right Blob */}
      <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-60 blur-3xl filter" />

      {/* Top Right Line */}
      <div className="absolute top-[15%] right-[5%] h-1 w-48 rotate-[-15deg] transform bg-gradient-to-r from-purple-400 to-purple-600 opacity-80" />

      {/* Bottom Left Blob */}
      <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 opacity-60 blur-3xl filter" />

      {/* Bottom Left Line */}
      <div className="absolute bottom-[15%] left-[5%] h-1 w-48 rotate-[-15deg] transform bg-gradient-to-r from-purple-400 to-purple-600 opacity-80" />

      {/* Center Image */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
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
          className="absolute text-2xl text-gray-800"
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
