"use client";

import { useCounter } from "@/hooks/useCounter";

export default function StatCounter({ target, suffix = "" }) {
  const { ref, value } = useCounter(target);

  return (
    <span ref={ref} className="stat-number">
      {value}
      {suffix}
    </span>
  );
}
