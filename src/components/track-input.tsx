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
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-mono text-center outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 sm:w-64 sm:text-left"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-ocean-600 px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-700 transition sm:w-auto"
      >
        Track Now
      </button>
    </form>
  );
}
