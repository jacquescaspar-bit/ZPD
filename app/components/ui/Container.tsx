import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = "lg",
  ...props
}) => {
  const baseClasses = "mx-auto px-4 sm:px-6 lg:px-8";

  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div className={cn(baseClasses, sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
