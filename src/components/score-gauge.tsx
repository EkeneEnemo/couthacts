"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, AlertTriangle, CheckCircle, Star, Shield } from "lucide-react";

interface ScoreGaugeProps {
  score: number;
  tier: string;
  size?: number;
}

const TIERS = [
  { name: "Probation", min: 0, max: 59, color: "#EF4444", bg: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle },
  { name: "Established", min: 60, max: 74, color: "#64748B", bg: "bg-gray-50 text-gray-600 border-gray-200", icon: Shield },
  { name: "Trusted", min: 75, max: 89, color: "#3B82F6", bg: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircle },
  { name: "Elite", min: 90, max: 100, color: "#C9901A", bg: "bg-amber-50 text-amber-800 border-amber-200", icon: Star },
];

function getTier(score: number) {
  return TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[0];
}

function getImprovementTips(
  score: number,
  tier: string,
  completionRate?: number,
  onTimeRate?: number,
  avgRating?: number,
  avgResponseTime?: number,
  disputeCount?: number,
  isVerified?: boolean
): string[] {
  const tips: string[] = [];

  if (!isVerified) {
    tips.push("Complete KYC + KYB verification to gain +15 score points immediately.");
  }

  if (completionRate !== undefined && completionRate < 0.95) {
    tips.push(`Your completion rate is ${(completionRate * 100).toFixed(0)}%. Only accept jobs you can fulfill — target 95%+.`);
  }

  if (onTimeRate !== undefined && onTimeRate < 0.9) {
    tips.push(`On-time rate is ${(onTimeRate * 100).toFixed(0)}%. Build 15-20% time buffers into every trip.`);
  }

  if (avgRating !== undefined && avgRating < 4.5) {
    tips.push(`Average review is ${avgRating.toFixed(1)}/5. Send proactive tracking updates and ask for reviews after delivery.`);
  }

  if (avgResponseTime !== undefined && avgResponseTime > 120) {
    tips.push("Response time is over 2 hours. Check the platform hourly and respond to opportunities within 60 minutes.");
  }

  if (disputeCount !== undefined && disputeCount > 0) {
    tips.push(`You have ${disputeCount} dispute${disputeCount > 1 ? "s" : ""}. Each costs 5 score points. Focus on communication and documentation to prevent disputes.`);
  }

  if (score >= 90) {
    tips.push("You're Elite! Maintain your score to keep access to CouthActs Advance and priority job matching.");
  } else if (score >= 75) {
    const needed = 90 - score;
    tips.push(`You need ${needed} more points to reach Elite tier. Focus on your weakest metric above.`);
  } else if (score >= 60) {
    const needed = 75 - score;
    tips.push(`${needed} points to Trusted tier. Complete more jobs, maintain on-time delivery, and earn 5-star reviews.`);
  } else {
    tips.push("Your score is in Probation. Focus on completing every accepted job and responding to opportunities within 1 hour.");
  }

  return tips.slice(0, 3);
}

export function ScoreGauge({
  score,
  size = 220,
}: ScoreGaugeProps) {
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

  const currentTier = getTier(score);
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const arcTotal = circumference * 0.75; // 270 degrees

  // Each tier's arc segment proportional to its range
  const totalRange = 100;
  const tierArcs = TIERS.map((t) => ({
    ...t,
    arc: ((t.max - t.min + 1) / totalRange) * arcTotal,
  }));

  // Build the colored segments
  let accumulatedOffset = 0;
  const segments = tierArcs.map((t) => {
    const segment = { ...t, offset: accumulatedOffset };
    accumulatedOffset += t.arc;
    return segment;
  });

  // Needle position
  const needleAngle = -135 + (animatedScore / 100) * 270;

  return (
    <div ref={ref}>
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            {/* Tier zone segments */}
            <g transform={`rotate(-135, ${cx}, ${cy})`}>
              {segments.map((seg) => (
                <circle
                  key={seg.name}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${seg.arc - 2} ${circumference - seg.arc + 2}`}
                  strokeDashoffset={-seg.offset}
                  strokeLinecap="round"
                  opacity={score >= seg.min ? 0.9 : 0.15}
                  className="transition-opacity duration-1000"
                />
              ))}
            </g>

            {/* Needle */}
            <g transform={`rotate(${needleAngle}, ${cx}, ${cy})`}>
              <line
                x1={cx}
                y1={cy}
                x2={cx}
                y2={cy - radius + strokeWidth + 4}
                stroke={currentTier.color}
                strokeWidth={3}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={currentTier.color}
                className="transition-all duration-1000"
              />
            </g>

            {/* Center white circle */}
            <circle cx={cx} cy={cy} r={radius - strokeWidth - 10} fill="white" />
          </svg>

          {/* Score number centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-5xl font-display font-black"
              style={{ color: currentTier.color }}
            >
              {Math.round(animatedScore)}
            </p>
            <p className="text-[10px] text-gray-400 -mt-0.5 tracking-wider">
              OUT OF 100
            </p>
          </div>
        </div>

        {/* Tier badge */}
        <div
          className={`-mt-2 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold ${currentTier.bg}`}
        >
          <currentTier.icon className="h-3.5 w-3.5" />
          {currentTier.name.toUpperCase()}
        </div>

        {/* Tier legend */}
        <div className="mt-4 flex items-center justify-center gap-1 flex-wrap">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold transition-all ${
                score >= t.min && score <= t.max
                  ? "ring-2 ring-offset-1"
                  : "opacity-50"
              }`}
              style={{
                color: t.color,
                ...(score >= t.min && score <= t.max
                  ? { ringColor: t.color }
                  : {}),
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: t.color }}
              />
              {t.name} ({t.min}-{t.max})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Extended score widget with improvement tips — used on dashboard.
 */
export function ScoreWidget({
  score,
  tier,
  completionRate,
  onTimeRate,
  avgRating,
  avgResponseTime,
  disputeCount,
  isVerified,
}: {
  score: number;
  tier: string;
  completionRate: number;
  onTimeRate: number;
  avgRating: number;
  avgResponseTime: number;
  disputeCount: number;
  isVerified: boolean;
}) {
  const tips = getImprovementTips(
    score,
    tier,
    completionRate,
    onTimeRate,
    avgRating,
    avgResponseTime,
    disputeCount,
    isVerified
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <ScoreGauge score={score} tier={tier} size={200} />

      {/* Improvement tips */}
      {tips.length > 0 && (
        <div className="mt-6 space-y-2.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-ocean-600" />
            <p className="text-xs font-bold text-ocean-800 uppercase tracking-wider">
              {score >= 90 ? "Maintain Your Edge" : "How to Improve"}
            </p>
          </div>
          {tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-lg bg-cream-50 p-3 border border-gray-100"
            >
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-ocean-500 flex-shrink-0" />
              <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
