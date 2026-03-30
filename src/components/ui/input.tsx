import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-ocean-800">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-colors",
          "placeholder:text-gray-400",
          "focus:border-sky-500 focus:ring-2 focus:ring-sky-200",
          error ? "border-red-400" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
