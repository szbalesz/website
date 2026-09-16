"use client";

import { useState, useEffect, useRef } from "react";
import { useLanyard } from "@/hooks/useLanyard";
import { PartyPopper } from "lucide-react";

export function PartyOverlay() {
  const lanyard = useLanyard();
  const isSpotifyPlaying = !!lanyard?.spotify;
  const [isEnabled, setIsEnabled] = useState(true);
  const [hasAppeared, setHasAppeared] = useState(false);
  const isFirstLoad = useRef(true);
  const appearTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("partyOverlayEnabled");
    if (saved !== null) {
      setIsEnabled(saved === "true");
    }
  }, []);

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

      {/* Toggle button - always visible on desktop, disabled when no Spotify */}
      <button
        onClick={() => {
          if (!isSpotifyPlaying) return;
          const newState = !isEnabled;
          setIsEnabled(newState);
          localStorage.setItem("partyOverlayEnabled", String(newState));
        }}
        disabled={!isSpotifyPlaying}
        className={`group fixed bottom-[136px] right-6 z-50 hidden md:flex items-center justify-center p-3 rounded-full border transition-all backdrop-blur-sm shadow-lg overflow-hidden animate-button-in ${isSpotifyPlaying
          ? "bg-black/40 hover:bg-black/60 border-white/10 text-white/70 hover:text-white cursor-pointer"
          : "bg-black/20 border-white/5 text-white/20 cursor-not-allowed"
          }`}
        style={{ animationDelay: '2.8s' }}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-500 ease-in-out text-sm font-medium">
          {!isSpotifyPlaying
            ? "Nincs zene tevékenység"
            : isEnabled
              ? "Party kikapcsolása"
              : "Party bekapcsolása"}
        </span>
        <PartyPopper className={`w-5 h-5 flex-shrink-0 transition-opacity ${isSpotifyPlaying && isEnabled ? "opacity-100" : "opacity-30"
          }`} />
      </button>
    </>
  );
}
