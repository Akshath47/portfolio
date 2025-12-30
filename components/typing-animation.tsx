"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function TypingAnimation({
  text,
  delay = 0,
  speed = 50,
  className = "",
  showCursor = true,
  onComplete,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex === 0 && delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex > text.length && !isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, delay, speed, text, isComplete, onComplete]);

  return (
    <span className={`terminal-glow ${className}`}>
      {displayText}
      {showCursor && !isComplete && <span className="cursor-blink" />}
    </span>
  );
}

interface MultiLineTypingProps {
  lines: string[];
  lineDelay?: number;
  speed?: number;
  className?: string;
}

export function MultiLineTyping({
  lines,
  lineDelay = 500,
  speed = 50,
  className = "",
}: MultiLineTypingProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    if (currentLineIndex < lines.length - 1) {
      setCompletedLines([...completedLines, lines[currentLineIndex]]);
      setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
      }, lineDelay);
    }
  };

  return (
    <div className={className}>
      {completedLines.map((line, index) => (
        <div key={index} className="terminal-glow">
          {line}
        </div>
      ))}
      {currentLineIndex < lines.length && (
        <TypingAnimation
          text={lines[currentLineIndex]}
          speed={speed}
          onComplete={handleLineComplete}
        />
      )}
    </div>
  );
}
