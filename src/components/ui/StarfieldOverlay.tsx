"use client";

import { useMemo } from "react";
import { useControls } from "@/components/ControlsProvider";

// Helper function to generate a random box-shadow string representing stars
const generateStars = (count: number) => {
  let value = "";
  for (let i = 0; i < count; i++) {
    // Generate stars in a 4000x4000 grid centered around 0,0
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    const alpha = (Math.random() * 0.7 + 0.3).toFixed(2);
    value += `${x}px ${y}px rgba(255, 255, 255, ${alpha})${i < count - 1 ? ", " : ""}`;
  }
  return value;
};

export function StarfieldOverlay() {
  const { starsEnabled: isEnabled, hasHydrated } = useControls();

  const starsSmall = useMemo(() => generateStars(800), []);
  const starsMedium = useMemo(() => generateStars(400), []);
  const starsLarge = useMemo(() => generateStars(150), []);

  const suckedStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 40; i++) {
      const startX = `${Math.floor(Math.random() * 140 - 20)}vw`;
      const startY = `${Math.floor(Math.random() * 140 - 20)}vh`;
      const duration = (Math.random() * 6 + 4).toFixed(2);
      const delay = (Math.random() * 15).toFixed(2);
      const scale = (Math.random() * 1.5 + 0.5).toFixed(2);
      const opacity = (Math.random() * 0.6 + 0.2).toFixed(2);
      
      stars.push({
        id: i,
        startX,
        startY,
        duration,
        delay,
        scale,
        opacity,
      });
    }
    return stars;
  }, []);

  if (!hasHydrated) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-transparent transition-opacity duration-1000 ease-in-out ${isEnabled ? 'opacity-100' : 'opacity-0'}`}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .star-container {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 1px;
              height: 1px;
              overflow: visible;
            }

            .star-layer {
              position: absolute;
              top: 0;
              left: 0;
              width: 1px;
              height: 1px;
              background: transparent;
              will-change: transform;
              border-radius: 50%;
            }
            
            .stars-small { 
              box-shadow: ${starsSmall}; 
              animation: orbitStar 200s linear infinite; 
              animation-play-state: ${isEnabled ? 'running' : 'paused'};
            }

            .stars-medium { 
              width: 2px;
              height: 2px;
              box-shadow: ${starsMedium}; 
              animation: orbitStar 250s linear infinite reverse; 
              animation-play-state: ${isEnabled ? 'running' : 'paused'};
            }

            .stars-large { 
              width: 3px;
              height: 3px;
              box-shadow: ${starsLarge}; 
              animation: orbitStar 300s linear infinite; 
              animation-play-state: ${isEnabled ? 'running' : 'paused'};
            }

            @keyframes orbitStar {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `
        }} />

        <div className="star-container">
          <div className="star-layer stars-small" />
          <div className="star-layer stars-medium" />
          <div className="star-layer stars-large" />
        </div>

        {/* Sucked Stars */}
        {isEnabled && suckedStars.map(star => (
          <div
            key={star.id}
            className="fixed w-[2px] h-[2px] bg-white rounded-full animate-suck-into-blackhole"
            style={{
              '--start-x': star.startX,
              '--start-y': star.startY,
              '--start-scale': star.scale,
              '--start-opacity': star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'cubic-bezier(0.5, 0, 0.2, 1)',
              animationFillMode: 'both',
            } as React.CSSProperties}
          />
        ))}
      </div>

    </>
  );
}
