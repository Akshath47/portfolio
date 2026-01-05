"use client";

import { useEffect, useRef, useState } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isIntense, setIsIntense] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Listen for matrix effect trigger
    const handleMatrixEffect = () => {
      setIsIntense(true);
      setTimeout(() => setIsIntense(false), 5000);
    };
    window.addEventListener("triggerMatrixEffect", handleMatrixEffect);

    // Matrix characters - mixture of Latin letters, numbers, and some symbols
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array of y-positions for each column
    const drops: number[] = Array(columns).fill(1);

    // Array to track if a column should have a bright head
    const brightHeads: boolean[] = Array(columns).fill(false);

    // Initialize some columns with bright heads
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.7) {
        brightHeads[i] = true;
      }
    }

    const draw = () => {
      // Add slight fade effect to create trails (faster fade in intense mode)
      ctx.fillStyle = isIntense ? "rgba(0, 0, 0, 0.03)" : "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Determine color based on position and bright head status
        if (brightHeads[i] && y === drops[i] * fontSize) {
          // Bright head - very bright green (more intense in intense mode)
          ctx.fillStyle = "#00ff41";
          ctx.shadowBlur = isIntense ? 20 : 10;
          ctx.shadowColor = "#00ff41";
        } else {
          // Calculate opacity based on how far behind the head this is
          const distanceFromHead = drops[i] * fontSize - y;
          const opacity = Math.max(0.1, 1 - (distanceFromHead / (fontSize * 15)));

          // Darker green for trailing characters (brighter in intense mode)
          ctx.fillStyle = isIntense
            ? `rgba(0, 255, 65, ${opacity * 1.5})`
            : `rgba(0, 204, 51, ${opacity})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset shadow for next iteration
        ctx.shadowBlur = 0;

        // Move drop down (faster in intense mode, more columns reset)
        const speed = isIntense ? 2 : 1;
        const resetChance = isIntense ? 0.95 : 0.975;

        if (y > canvas.height && Math.random() > resetChance) {
          drops[i] = 0;
          // In intense mode, all columns have bright heads
          brightHeads[i] = isIntense ? true : Math.random() > 0.7;
        }
        drops[i] += speed;
      }
    };

    // Draw at 30fps for performance
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("triggerMatrixEffect", handleMatrixEffect);
    };
  }, [isIntense]);

  return (
    <div className="matrix-rain">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        style={{ opacity: isIntense ? 0.9 : 0.6 }}
      />
    </div>
  );
}
