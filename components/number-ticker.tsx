"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface NumberTickerProps {
  value: number;
  duration?: number; // animation duration in ms
  decimalPlaces?: number;
  className?: string;
}

export const NumberTicker = ({
  value,
  duration = 1500,
  decimalPlaces = 0,
  className,
}: NumberTickerProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      const eased = easeOutQuad(progress);

      setDisplayValue(Number((value * eased).toFixed(decimalPlaces)));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration, decimalPlaces]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
};

// Smooth easing
function easeOutQuad(t: number) {
  return t * (2 - t);
}
