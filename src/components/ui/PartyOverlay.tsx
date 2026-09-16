"use client";

import { useState, useEffect, useRef } from "react";
import { useLanyard } from "@/hooks/useLanyard";
import { useControls } from "@/components/ControlsProvider";

export function PartyOverlay() {
  const lanyard = useLanyard();
  const isSpotifyPlaying = !!lanyard?.spotify;
  const { partyEnabled: isEnabled, hasHydrated } = useControls();
  const [hasAppeared, setHasAppeared] = useState(false);
  const isFirstLoad = useRef(true);
  const appearTimer = useRef<NodeJS.Timeout | null>(null);

  // Delay the initial appearance to match the card animation, but instant on toggle
  useEffect(() => {
    if (isSpotifyPlaying && isEnabled) {
      const delay = isFirstLoad.current ? 2400 : 0;
      isFirstLoad.current = false;
      appearTimer.current = setTimeout(() => setHasAppeared(true), delay);
    } else {
      setHasAppeared(false);
    }
    return () => {
      if (appearTimer.current) clearTimeout(appearTimer.current);
    };
  }, [isSpotifyPlaying, isEnabled]);

  const showOverlay = isSpotifyPlaying && isEnabled;

  if (!hasHydrated) return null;

  return (
    <>
      {/* Party overlay - always rendered, opacity controlled via CSS transition */}
      <div
        className="fixed inset-0 z-[6] pointer-events-none overflow-hidden transition-opacity duration-1000 ease-in-out"
        style={{ opacity: showOverlay && hasAppeared ? 0.4 : 0 }}
      >
        <div className="absolute inset-0 party-flash-1" />
        <div className="absolute inset-0 party-flash-2" />
        <div className="absolute inset-0 party-flash-3" />
        <div className="absolute inset-0 party-beam" />
      </div>
    </>
  );
}
