import React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "navy";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      href,
      icon,
      iconPosition = "right",
      isLoading = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Standardized fixed heights and padding
    const sizeClasses = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-7 text-base gap-2.5",
    };

    // Consistent semantic variants
    const variantClasses = {
      primary:
        "bg-[#C59B27] hover:bg-[#b58b19] active:bg-[#a07a14] text-[#0C294F] font-bold border border-[#C59B27] shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-[#C59B27] focus-visible:ring-offset-2",
      secondary:
        "bg-white hover:bg-[#EDF2F7] active:bg-slate-200 text-[#0C294F] font-semibold border border-[#CBD5E0] hover:border-[#194072] shadow-sm focus-visible:ring-2 focus-visible:ring-[#194072] focus-visible:ring-offset-2",
      navy:
        "bg-[#0C294F] hover:bg-[#194072] active:bg-[#091f3c] text-white font-bold border border-[#0C294F] shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-[#0C294F] focus-visible:ring-offset-2",
      tertiary:
        "bg-transparent hover:text-[#0C294F] text-[#194072] font-semibold p-0 h-auto gap-1 underline-offset-4 hover:underline focus-visible:ring-1 focus-visible:ring-[#0C294F]",
    };

    const baseClasses = `inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none ${
      sizeClasses[size]
    } ${variantClasses[variant]} ${className}`;

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
