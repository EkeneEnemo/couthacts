"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-[13px] text-[#007AFF] hover:text-[#0055D4] font-semibold transition-colors"
    >
      Print / Save as PDF
    </button>
  );
}
