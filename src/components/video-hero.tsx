"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/**
 * Cinematic hero with Ken Burns effect — cycles through transport images
 * with slow zoom/pan animation and smooth crossfade.
 */

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=85",
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=85",
  "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=85",
  "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=85",
];

export function VideoHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className={`object-cover ${
              i === current ? "animate-ken-burns" : ""
            }`}
            priority={i === 0}
          />
        </div>
      ))}
      {/* Deep gradient — almost black on the left for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1F]/95 via-[#1D1D1F]/80 to-[#1D1D1F]/60" />
    </div>
  );
}
