"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, AlertTriangle, CheckCircle, Star, Shield } from "lucide-react";

interface ScoreGaugeProps {
  score: number;
  tier: string;
  size?: number;
}

/* ── Apple-inspired palette ───────────────────────────────────────── */
const TIERS = [
  {
    name: "Probation",
    min: 0,
    max: 59,
    color: "#FF3B30",       // iOS system red
    glow: "rgba(255,59,48,.25)",
    bg: "bg-[#FFF1F0] text-[#C5221F] border-[#FFD4D1]",
    icon: AlertTriangle,
  },
  {
    name: "Established",
    min: 60,
    max: 74,
    color: "#8E8E93",       // iOS system gray
    glow: "rgba(142,142,147,.2)",
    bg: "bg-[#F5F5F7] text-[#6E6E73] border-[#E8E8ED]",
    icon: Shield,
  },
  {
    name: "Trusted",
    min: 75,
    max: 89,
    color: "#007AFF",       // iOS system blue
    glow: "rgba(0,122,255,.2)",
    bg: "bg-[#EDF4FF] text-[#0055D4] border-[#C2DCFF]",
    icon: CheckCircle,
  },
  {
    name: "Elite",
    min: 90,
    max: 100,
    color: "#34C759",       // iOS system green
    glow: "rgba(52,199,89,.2)",
    bg: "bg-[#EEFBF1] text-[#1B8D36] border-[#B8EECA]",
    icon: Star,
  },
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
    tips.push(`You need ${90 - score} more points to reach Elite tier. Focus on your weakest metric above.`);
  } else if (score >= 60) {
    tips.push(`${75 - score} points to Trusted tier. Complete more jobs, maintain on-time delivery, and earn 5-star reviews.`);
  } else {
    tips.push("Your score is in Probation. Focus on completing every accepted job and responding to opportunities within 1 hour.");
  }

  return tips.slice(0, 3);
}

/* ── Interpolate colour along the arc ────────────────────────────── */
function lerpColor(a: string, b: string, t: number) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function scoreColor(s: number) {
  if (s < 60) return lerpColor("#FF3B30", "#FF9500", s / 59);
  if (s < 75) return lerpColor("#FF9500", "#007AFF", (s - 60) / 14);
  if (s < 90) return lerpColor("#007AFF", "#34C759", (s - 75) / 14);
  return "#34C759";
}

export function ScoreGauge({ score, size = 220 }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = Date.now();
          const duration = 1400;
          const step = () => {
            const elapsed = Date.now() - start;
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4); // quartic ease-out
            setAnimatedScore(eased * score);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [score]);

  const currentTier = getTier(score);
  const TierIcon = currentTier.icon;
  const trackWidth = 10;
  const progressWidth = 12;
  const radius = (size - progressWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const arcSpan = circumference * 0.75; // 270 deg
  const filledArc = (animatedScore / 100) * arcSpan;
  const activeColor = scoreColor(animatedScore);

  return (
    <div ref={ref}>
      <div className="flex flex-col items-center gap-3">
        {/* ── Ring ──────────────────────────────────── */}
        <div className="relative" style={{ width: size, height: size }}>
          {/* Soft glow behind the active arc */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-700"
            style={{ backgroundColor: currentTier.glow }}
          />

          <svg width={size} height={size} className="relative">
            {/* Background track */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="#F5F5F7"
              strokeWidth={trackWidth}
              strokeDasharray={`${arcSpan} ${circumference - arcSpan}`}
              strokeDashoffset={-(circumference - arcSpan) / 2 - arcSpan / 2}
              strokeLinecap="round"
              transform={`rotate(0, ${cx}, ${cy})`}
            />

            {/* Active arc — single smooth stroke */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={activeColor}
              strokeWidth={progressWidth}
              strokeDasharray={`${filledArc} ${circumference - filledArc}`}
              strokeDashoffset={-(circumference - arcSpan) / 2 - arcSpan / 2}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 6px ${currentTier.glow})`,
                transition: "stroke 0.6s ease",
              }}
            />

            {/* Tip dot at end of active arc */}
            {animatedScore > 2 && (
              <circle
                cx={
                  cx +
                  radius *
                    Math.cos(
                      (((-135 + (animatedScore / 100) * 270) - 90) * Math.PI) / 180
                    )
                }
                cy={
                  cy +
                  radius *
                    Math.sin(
                      (((-135 + (animatedScore / 100) * 270) - 90) * Math.PI) / 180
                    )
                }
                r={progressWidth / 2 + 2}
                fill="white"
                stroke={activeColor}
                strokeWidth={3}
                style={{
                  filter: `drop-shadow(0 1px 3px ${currentTier.glow})`,
                  transition: "stroke 0.6s ease, filter 0.6s ease",
                }}
              />
            )}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-display tabular-nums leading-none"
              style={{
                fontSize: size * 0.24,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: activeColor,
                transition: "color 0.6s ease",
              }}
            >
              {Math.round(animatedScore)}
            </span>
            <span
              className="text-[#86868B] font-medium uppercase tracking-[0.14em]"
              style={{ fontSize: size * 0.046, marginTop: 2 }}
            >
              CouthActs Score
            </span>
          </div>
        </div>

        {/* ── Tier chip ────────────────────────────── */}
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[11px] font-semibold tracking-wide ${currentTier.bg}`}
          style={{ backdropFilter: "blur(8px)" }}
        >
          <TierIcon className="h-3.5 w-3.5" />
          {currentTier.name}
        </div>

        {/* ── Tier legend — minimal dots, wraps on small screens ─────────── */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {TIERS.map((t) => {
            const active = score >= t.min && score <= t.max;
            return (
              <div
                key={t.name}
                className="flex items-center gap-1.5 transition-opacity duration-500"
                style={{ opacity: active ? 1 : 0.35 }}
              >
                <span
                  className="h-[7px] w-[7px] rounded-full ring-2 ring-offset-1 transition-all duration-500"
                  style={{
                    backgroundColor: t.color,
                    boxShadow: active
                      ? `0 0 0 2px white, 0 0 0 4px ${t.color}, 0 0 8px ${t.glow}`
                      : "none",
                  }}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{ color: active ? t.color : "#86868B" }}
                >
                  {t.name}
                </span>
              </div>
            );
          })}
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
    <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-[#E8E8ED]/60 active:scale-[0.99] transition-transform">
      <ScoreGauge score={score} tier={tier} size={200} />

      {/* Improvement tips */}
      {tips.length > 0 && (
        <div className="mt-7 space-y-2">
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp className="h-3.5 w-3.5 text-[#007AFF]" />
            <p className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-[0.1em]">
              {score >= 90 ? "Maintain Your Edge" : "How to Improve"}
            </p>
          </div>
          {tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl bg-[#F5F5F7]/60 p-3.5"
            >
              <span className="mt-1.5 h-[5px] w-[5px] rounded-full bg-[#007AFF] flex-shrink-0" />
              <p className="text-[12px] text-[#6E6E73] leading-[1.6]">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
