import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-in-left" | "slide-in-right";
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  className, 
  animation = "fade-in",
  delay = 0 
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        !isVisible && "opacity-0 translate-y-10",
        isVisible && `animate-${animation}`,
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both"
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;