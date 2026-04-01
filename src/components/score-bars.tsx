interface ScoreBarProps {
  label: string;
  value: number; // 0-100
  suffix?: string;
}

/* Apple-inspired smooth gradient stops */
function barColor(v: number): string {
  if (v >= 80) return "#34C759"; // iOS green
  if (v >= 60) return "#007AFF"; // iOS blue
  if (v >= 40) return "#FF9500"; // iOS orange
  return "#FF3B30";              // iOS red
}

function ScoreBar({ label, value, suffix = "%" }: ScoreBarProps) {
  const color = barColor(value);
  return (
    <div className="group">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[12px] text-[#6E6E73] font-medium">{label}</span>
        <span className="text-[12px] font-semibold tabular-nums" style={{ color }}>
          {Math.round(value)}{suffix}
        </span>
      </div>
      <div className="h-[6px] rounded-full bg-[#F5F5F7] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.min(value, 100)}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}33`,
          }}
        />
      </div>
    </div>
  );
}

export function ScoreBars({
  completionRate,
  onTimeRate,
  avgRating,
  avgResponseTime,
  disputeCount,
  isVerified,
}: {
  completionRate: number;
  onTimeRate: number;
  avgRating: number;
  avgResponseTime: number;
  disputeCount: number;
  isVerified: boolean;
}) {
  const responseScore =
    avgResponseTime < 60 ? 100 : avgResponseTime < 240 ? 70 : avgResponseTime < 1440 ? 40 : 0;
  const disputeScore = Math.max(0, 100 - disputeCount * 33);

  return (
    <div className="space-y-4">
      <ScoreBar label="Completion Rate" value={completionRate * 100} />
      <ScoreBar label="On-Time Rate" value={onTimeRate * 100} />
      <ScoreBar label="Average Review" value={(avgRating / 5) * 100} suffix={` (${avgRating.toFixed(1)}/5)`} />
      <ScoreBar label="Response Time" value={responseScore} suffix="" />
      <ScoreBar label="Dispute Record" value={disputeScore} suffix="" />
      <div className="flex justify-between items-baseline pt-1">
        <span className="text-[12px] text-[#6E6E73] font-medium">Verification</span>
        <span
          className="text-[12px] font-semibold"
          style={{ color: isVerified ? "#34C759" : "#FF3B30" }}
        >
          {isVerified ? "Verified" : "Unverified"}
        </span>
      </div>
    </div>
  );
}
