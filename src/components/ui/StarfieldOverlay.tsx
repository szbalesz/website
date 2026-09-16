"use client";

import { useMemo, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

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
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("starfieldEnabled");
    if (saved !== null) {
      setIsEnabled(saved === "true");
    }
  }, []);

  const starsSmall = useMemo(() => generateStars(800), []);
  const starsMedium = useMemo(() => generateStars(400), []);
  const starsLarge = useMemo(() => generateStars(150), []);

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
      </div>

      <button
        onClick={() => {
          const newState = !isEnabled;
          setIsEnabled(newState);
          localStorage.setItem("starfieldEnabled", String(newState));
        }}
        className="group fixed bottom-20 right-6 z-50 hidden md:flex items-center justify-center p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm shadow-lg overflow-hidden animate-button-in"
        style={{ animationDelay: '2.6s' }}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-500 ease-in-out text-sm font-medium">
          {isEnabled ? "Csillagok kikapcsolása" : "Csillagok bekapcsolása"}
        </span>
        <Sparkles className={`w-5 h-5 flex-shrink-0 transition-opacity ${isEnabled ? "opacity-100" : "opacity-30"}`} />
      </button>
    </>
  );
}
