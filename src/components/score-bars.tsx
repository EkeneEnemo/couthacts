interface ScoreBarProps {
  label: string;
  value: number; // 0-100
  suffix?: string;
}

function ScoreBar({ label, value, suffix = "%" }: ScoreBarProps) {
  const color = value >= 80 ? "bg-green-500" : value >= 60 ? "bg-sky-500" : value >= 40 ? "bg-amber-500" : "bg-red-500";
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-ocean-800">{Math.round(value)}{suffix}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

export function ScoreBars({ completionRate, onTimeRate, avgRating, avgResponseTime, disputeCount, isVerified }: {
  completionRate: number;
  onTimeRate: number;
  avgRating: number;
  avgResponseTime: number;
  disputeCount: number;
  isVerified: boolean;
}) {
  const responseScore = avgResponseTime < 60 ? 100 : avgResponseTime < 240 ? 70 : avgResponseTime < 1440 ? 40 : 0;
  const disputeScore = Math.max(0, 100 - disputeCount * 33);

  return (
    <div className="space-y-3">
      <ScoreBar label="Completion Rate" value={completionRate * 100} />
      <ScoreBar label="On-Time Rate" value={onTimeRate * 100} />
      <ScoreBar label="Average Review" value={(avgRating / 5) * 100} suffix={` (${avgRating.toFixed(1)}/5)`} />
      <ScoreBar label="Response Time" value={responseScore} suffix="" />
      <ScoreBar label="Dispute Record" value={disputeScore} suffix="" />
      <div className="flex justify-between text-xs">
        <span className="text-gray-600">Verification</span>
        <span className={`font-semibold ${isVerified ? "text-green-600" : "text-red-500"}`}>
          {isVerified ? "Verified ✓" : "Unverified"}
        </span>
      </div>
    </div>
  );
}
