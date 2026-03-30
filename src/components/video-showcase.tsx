"use client";

import { useRef, useEffect, useState } from "react";

const VIDEOS = [
  {
    src: "https://videos.pexels.com/video-files/5765290/5765290-sd_640_360_30fps.mp4",
    poster: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    label: "Taxi & Rideshare",
  },
  {
    src: "https://videos.pexels.com/video-files/6868997/6868997-sd_640_360_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    label: "Freight & Shipping",
  },
  {
    src: "https://videos.pexels.com/video-files/3945033/3945033-sd_640_360_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80",
    label: "Aviation",
  },
  {
    src: "https://videos.pexels.com/video-files/3773486/3773486-sd_640_360_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&q=80",
    label: "Maritime",
  },
];

export function VideoShowcase() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {VIDEOS.map((v) => (
        <VideoCard key={v.label} {...v} />
      ))}
    </div>
  );
}

function VideoCard({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && ref.current) {
          ref.current.play().catch(() => {});
        } else if (ref.current) {
          ref.current.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] overflow-hidden rounded-2xl group"
    >
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-2">
          {isVisible && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          )}
          <p className="text-sm font-semibold text-white">{label}</p>
        </div>
      </div>
    </div>
  );
}
