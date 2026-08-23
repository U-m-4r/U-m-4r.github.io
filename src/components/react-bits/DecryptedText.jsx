import React, { useEffect, useState, useRef } from 'react';

export default function DecryptedText({ text, speed = 40, maxIterations = 8, className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]';
  const intervalRef = useRef(null);

  useEffect(() => {
    let iteration = 0;
    const targetText = text;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / maxIterations) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      if (iteration >= targetText.length * maxIterations) {
        clearInterval(intervalRef.current);
      }
      iteration++;
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed, maxIterations]);

  return <span className={className}>{displayText}</span>;
}