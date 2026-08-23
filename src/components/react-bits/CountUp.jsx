import React, { useEffect, useState } from 'react';

export default function CountUp({ to, from = 0, duration = 0.5, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const end = to;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 25;
    const totalSteps = totalMiliseconds / incrementTime;
    const increment = (end - start) / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount((prev) => {
        const next = prev + increment;
        if (currentStep >= totalSteps) {
          clearInterval(timer);
          return end;
        }
        return next;
      });
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, from, duration]);

  return <span>{prefix}{Math.round(count).toLocaleString()}{suffix}</span>;
}