import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, direction = "up", delay, className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            setIsVisible(true);
            observer.unobserve(el);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const delayStyle: CSSProperties = {
    ...(typeof delay === "number" && delay > 0 ? { "--reveal-delay": `${delay}s` } : {}),
    ...style,
  };

  const dirClass = direction ? `reveal-${direction}` : "reveal-up";

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={delayStyle}
    >
      {children}
    </div>
  );
}
