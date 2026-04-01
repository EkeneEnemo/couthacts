import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[12px] font-semibold text-[#1D1D1F]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-xl border bg-white/80 backdrop-blur-sm px-4 py-2.5 text-[14px] outline-none transition-all",
          "placeholder:text-[#C7C7CC]",
          "focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15",
          error ? "border-[#FF3B30]" : "border-[#E8E8ED]",
          className
        )}
        {...props}
      />
      {error && <p className="text-[12px] text-[#FF3B30]">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
