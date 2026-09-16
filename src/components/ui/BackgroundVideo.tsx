"use client";

import { useEffect, useRef, useState } from "react";

export function BackgroundVideo() {
  const appearRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Attempt to play the appear video on mount
    if (appearRef.current) {
      appearRef.current.play().then(() => {
        setHasStarted(true);
      }).catch((e) => {
        console.warn("Autoplay prevented:", e);
      });
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-50 bg-black overflow-hidden pointer-events-none">
        {/* Appear Video */}
        <video
          ref={appearRef}
          src="/background/appear.mp4"
          playsInline
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />
      </div>
    </>
  );
}
