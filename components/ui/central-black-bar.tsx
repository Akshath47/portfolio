"use client";

import { useState, useEffect } from "react";

export function CentralBlackBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the first experience card
      const experienceSection = document.getElementById('experience');
      
      if (experienceSection) {
        // Get the first card within the experience section
        const firstCard = experienceSection.querySelector('.layered-section-card');
        
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect();
          // Show the bar only when the card has completely scrolled past the top
          // (when the bottom of the card is above the top of the viewport)
          setIsVisible(cardRect.bottom < 0);
        }
      } else {
        // Fallback to original behavior if experience section not found
        const scrollPosition = window.scrollY;
        const heroHeight = window.innerHeight;
        setIsVisible(scrollPosition > heroHeight * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`central-black-bar ${isVisible ? 'visible' : ''}`}>
      {/* Optional: Add navigation dots or progress indicator here */}
    </div>
  );
}