import { useRef, useEffect, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (direction === "up") return "translateY(20px)";
    if (direction === "left") return "translateX(-20px)";
    if (direction === "right") return "translateX(20px)";
    return "none";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : getTransform(),
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggerProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  baseDelay?: number;
  stagger?: number;
}

export function StaggerChildren({
  children,
  className = "",
  itemClassName = "",
  baseDelay = 0,
  stagger = 100,
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimatedSection
          key={i}
          className={itemClassName}
          delay={baseDelay + i * stagger}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
}
