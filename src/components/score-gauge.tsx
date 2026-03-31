"use client";

import { useEffect, useState, useRef } from "react";

interface ScoreGaugeProps {
  score: number;
  tier: string;
  size?: number;
}

function getTierColor(score: number): string {
  if (score >= 90) return "#C9901A"; // Gold — Elite
  if (score >= 75) return "#94A3B8"; // Silver — Trusted
  if (score >= 60) return "#64748B"; // Slate — Established
  return "#EF4444"; // Red — Probation
}

function getTierBg(score: number): string {
  if (score >= 90) return "bg-amber-50 text-amber-800 border-amber-200";
  if (score >= 75) return "bg-slate-50 text-slate-700 border-slate-200";
  if (score >= 60) return "bg-gray-50 text-gray-600 border-gray-200";
  return "bg-red-50 text-red-700 border-red-200";
}

function getTierIcon(tier: string): string {
  if (tier === "ELITE") return "★";
  if (tier === "TRUSTED") return "◆";
  if (tier === "ESTABLISHED") return "✓";
  return "⚠";
}

export function ScoreGauge({ score, tier, size = 180 }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = Date.now();
          const duration = 1500;
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedScore(eased * score);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score]);

  const color = getTierColor(score);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees
  const progress = (animatedScore / 100) * arcLength;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-[135deg]">
          {/* Background arc */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={10}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        {/* Score number centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl font-display font-bold" style={{ color }}>
            {Math.round(animatedScore)}
          </p>
          <p className="text-xs text-gray-400 -mt-1">out of 100</p>
        </div>
      </div>
      {/* Tier badge */}
      <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${getTierBg(score)}`}>
        <span>{getTierIcon(tier)}</span>
        {tier}
      </div>
    </div>
  );
}
