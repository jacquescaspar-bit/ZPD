import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = "md",
  shadow = "md",
  ...props
}) => {
  const baseClasses =
    "bg-[var(--background)] border border-[var(--gray-200)] rounded-lg";

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={cn(
        baseClasses,
        paddingClasses[padding],
        shadowClasses[shadow],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
