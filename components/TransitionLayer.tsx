"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export interface TransitionLayerHandle {
    startTransition: (x: number, y: number, href: string) => void;
}

const TransitionLayer = forwardRef<TransitionLayerHandle>((props, ref) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
    const [targetHref, setTargetHref] = useState('');
    const [tiles, setTiles] = useState<{ id: number; x: number; y: number }[]>([]);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // Grid configuration
    const COLS = 12;
    const ROWS = 8;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            const newTiles = [];
            for (let i = 0; i < ROWS * COLS; i++) {
                newTiles.push({
                    id: i,
                    x: (i % COLS),
                    y: Math.floor(i / COLS),
                });
            }
            setTiles(newTiles);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        startTransition: (x, y, href) => {
            setClickPos({ x, y });
            setTargetHref(href);
            setIsActive(true);
        },
    }));

    const handleAnimationComplete = () => {
        if (targetHref) {
            router.push(targetHref);
            // Optional: Reset after a delay or keep it covered until new page loads
            // For now, we'll let the new page load. The transition layer is on the current page,
            // so it will disappear when the new page mounts (since it's not in layout).
            // If we wanted a persistent transition, we'd put this in layout or template.
            // But user asked for "reveal via expansion... which then transitions".
        }
    };

    // Calculate distance from click for stagger delay
    const getDelay = (tileIndex: number) => {
        if (!windowSize.width) return 0;

        const tileWidth = windowSize.width / COLS;
        const tileHeight = windowSize.height / ROWS;

        const tileX = (tileIndex % COLS) * tileWidth + tileWidth / 2;
        const tileY = Math.floor(tileIndex / COLS) * tileHeight + tileHeight / 2;

        const dx = tileX - clickPos.x;
        const dy = tileY - clickPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Max distance is roughly diagonal of screen
        const maxDist = Math.sqrt(windowSize.width ** 2 + windowSize.height ** 2);

        return (distance / maxDist) * 0.8; // 0.8s max delay
    };

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none flex flex-wrap">
            {tiles.map((tile) => (
                <motion.div
                    key={tile.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.05, opacity: 1 }} // Scale > 1 to avoid gaps
                    transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: getDelay(tile.id),
                    }}
                    onAnimationComplete={tile.id === tiles.length - 1 ? handleAnimationComplete : undefined}
                    style={{
                        width: `${100 / COLS}%`,
                        height: `${100 / ROWS}%`,
                    }}
                    className="bg-purple-600 border border-purple-800" // Purple tiles
                />
            ))}
        </div>
    );
});

TransitionLayer.displayName = 'TransitionLayer';

export default TransitionLayer;
