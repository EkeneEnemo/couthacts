"use client";

export function TrackInput() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.currentTarget.elements.namedItem("code") as HTMLInputElement).value.trim();
        if (input) window.location.href = `/track/${input}`;
      }}
      className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
    >
      <input
        name="code"
        type="text"
        placeholder="Enter your tracking code"
        className="w-full rounded-2xl border border-[#E8E8ED] bg-white/80 backdrop-blur-xl px-5 py-3.5 text-[14px] font-mono text-center outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-all sm:w-72 sm:text-left"
      />
      <button
        type="submit"
        className="w-full rounded-2xl bg-[#007AFF] px-6 py-3.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition-colors sm:w-auto"
      >
        Track Now
      </button>
    </form>
  );
}
