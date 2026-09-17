"use client";

import { useEffect, useRef, useState } from "react";
import { useControls } from "@/components/ControlsProvider";

export function BackgroundVideo() {
  const { bgMotionEnabled, hasHydrated, setIsVideoFinished } = useControls();
  const appearRef = useRef<HTMLVideoElement>(null);
  const animRef = useRef<HTMLVideoElement>(null);
  const [isAppearFinished, setIsAppearFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Attempt to play the appear video on mount unconditionally
    if (appearRef.current && hasHydrated) {
      appearRef.current.play().then(() => {
        setHasStarted(true);
      }).catch((e) => {
        console.warn("Autoplay prevented:", e);
      });
    }
  }, [hasHydrated]);

  useEffect(() => {
    const shouldPlay = bgMotionEnabled && hasHydrated;

    if (appearRef.current) {
      if (!isAppearFinished) {
        appearRef.current.play().catch(() => { });
      } else {
        appearRef.current.pause();
      }
    }

    if (animRef.current) {
      if (shouldPlay && isAppearFinished) {
        animRef.current.play().catch(() => { });
      } else {
        animRef.current.pause();
      }
    }
  }, [bgMotionEnabled, isAppearFinished, hasHydrated]);

  const handleTimeUpdate = () => {
    if (appearRef.current) {
      const video = appearRef.current;
      // Kereszttűnés indítása 1 másodperccel a videó vége előtt
      if (video.duration && video.duration - video.currentTime <= 1.0) {
        if (!isAppearFinished) {
          setIsAppearFinished(true);
          setIsVideoFinished(true);
          if (animRef.current && bgMotionEnabled) {
            animRef.current.play().catch((e) => {
              console.warn("Autoplay prevented for anim:", e);
            });
          }
        }
      }
    }
  };

  if (!hasHydrated) {
    return <div className="fixed inset-0 w-full h-full -z-50 bg-black overflow-hidden pointer-events-none" />;
  }

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-50 bg-black overflow-hidden pointer-events-none">
        {/* Loop Video (anim.mp4) */}
        <video
          ref={animRef}
          src="/background/anim.mp4"
          playsInline
          muted
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2500ms] ease-out ${isAppearFinished ? 'opacity-100 scale-100' : 'opacity-0 scale-115'}`}
        />

        {/* Appear Video */}
        <video
          ref={appearRef}
          src="/background/appear.mp4"
          playsInline
          muted
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isAppearFinished ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />
      </div>
    </>
  );
}
