"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
    >
      Print / Save as PDF
    </button>
  );
}
