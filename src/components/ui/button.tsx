import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          primary:
            "bg-[#007AFF] text-white hover:bg-[#0055D4] focus:ring-[#007AFF]/40 shadow-sm",
          secondary:
            "bg-[#1D1D1F] text-white hover:bg-[#2C2C2E] focus:ring-[#1D1D1F]/30",
          outline:
            "border border-[#E8E8ED] text-[#1D1D1F] hover:bg-[#F5F5F7] focus:ring-[#007AFF]/20",
          ghost:
            "text-[#007AFF] hover:bg-[#007AFF]/5 focus:ring-[#007AFF]/20",
        }[variant],
        {
          sm: "px-3.5 py-1.5 text-[12px]",
          md: "px-5 py-2.5 text-[13px]",
          lg: "px-8 py-3.5 text-[14px]",
        }[size],
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
);

Button.displayName = "Button";
