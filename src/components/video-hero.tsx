"use client";

import { useRef, useEffect } from "react";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure autoplay works on all browsers
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1920&q=85"
      >
        {/* Multiple transport clips — browser picks first supported */}
        <source src="https://videos.pexels.com/video-files/2491284/2491284-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/3183204/3183204-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/95 via-ocean-900/85 to-ocean-900/70" />
    </div>
  );
}
