import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "warning"
    | "error"
    | "gradient";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", children, className, ...props },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
      primary:
        "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] focus-visible:ring-[var(--primary)]",
      secondary:
        "bg-[var(--secondary)] text-[var(--gray-900)] hover:bg-[var(--secondary-700)] focus-visible:ring-[var(--secondary)]",
      outline:
        "border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-white focus-visible:ring-[var(--primary)]",
      ghost:
        "text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/10 focus-visible:ring-[var(--primary)]",
      success:
        "bg-[var(--success)] text-white hover:bg-[var(--success-700)] focus-visible:ring-[var(--success)]",
      warning:
        "bg-[var(--warning)] text-white hover:bg-[var(--warning-700)] focus-visible:ring-[var(--warning)]",
      error:
        "bg-[var(--error)] text-white hover:bg-[var(--error-700)] focus-visible:ring-[var(--error)]",
      gradient:
        "bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white hover:from-[var(--gradient-start)] hover:to-[var(--gradient-end)] focus-visible:ring-[var(--gradient-start)]",
    };

    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
