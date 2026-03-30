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
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
        {
          primary:
            "bg-ocean-600 text-white hover:bg-ocean-700 focus:ring-ocean-500",
          secondary:
            "bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-400",
          outline:
            "border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-50 focus:ring-ocean-500",
          ghost:
            "text-ocean-600 hover:bg-ocean-50 focus:ring-ocean-500",
        }[variant],
        {
          sm: "px-3 py-1.5 text-sm",
          md: "px-5 py-2.5 text-sm",
          lg: "px-8 py-3.5 text-base",
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
