"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const CARDS = [
  {
    images: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800&q=80",
    ],
    label: "Taxi & Rideshare",
    sub: "City to airport. Door to door.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    ],
    label: "Freight & Shipping",
    sub: "Pallets to full containers.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
    ],
    label: "Aviation",
    sub: "Charter jets to air cargo.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    ],
    label: "Maritime",
    sub: "Container ships to yacht charters.",
  },
];

export function VideoShowcase() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {CARDS.map((card) => (
        <MotionCard key={card.label} {...card} />
      ))}
    </div>
  );
}

function MotionCard({ images, label, sub }: { images: string[]; label: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible, images.length]);

  return (
    <div ref={ref} className="relative aspect-[3/4] overflow-hidden rounded-3xl group">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: i === imgIndex ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={label}
            fill
            className={`object-cover ${visible && i === imgIndex ? "animate-ken-burns" : ""}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2.5">
          {visible && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]" />
            </span>
          )}
          <div>
            <p className="text-[13px] font-semibold text-white">{label}</p>
            <p className="text-[10px] text-white/50">{sub}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
