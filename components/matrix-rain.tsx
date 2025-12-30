"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      // Add slight fade effect to create trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Determine color based on position and bright head status
        if (brightHeads[i] && y === drops[i] * fontSize) {
          // Bright head - very bright green
          ctx.fillStyle = "#00ff41";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#00ff41";
        } else {
          // Calculate opacity based on how far behind the head this is
          const distanceFromHead = drops[i] * fontSize - y;
          const opacity = Math.max(0.1, 1 - (distanceFromHead / (fontSize * 15)));

          // Darker green for trailing characters
          ctx.fillStyle = `rgba(0, 204, 51, ${opacity})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset shadow for next iteration
        ctx.shadowBlur = 0;

        // Move drop down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          // Randomly assign bright head
          brightHeads[i] = Math.random() > 0.7;
        }
        drops[i]++;
      }
    };

    // Draw at 30fps for performance
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="matrix-rain">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
    </div>
  );
}
