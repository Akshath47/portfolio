"use client";

import { useState, useEffect } from "react";

export function CentralBlackBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the bar after scrolling past the hero section (100vh)
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      setIsVisible(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`central-black-bar ${isVisible ? 'visible' : ''}`}>
      {/* Optional: Add navigation dots or progress indicator here */}
    </div>
  );
}