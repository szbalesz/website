"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSavedEmotes } from "@/components/SavedEmotesProvider";
import { useControls } from "@/components/ControlsProvider";

export function CardVisibilityWrapper({ children }: { children: React.ReactNode }) {
  const { cardVisible: isVisible, setCardVisible } = useControls();
  const { savedCount } = useSavedEmotes();
  const displayCount = savedCount !== null ? savedCount.toLocaleString('hu-HU') : "...";

  return (
    <>
      <div 
        className={`relative z-10 transition-all duration-700 ease-in-out w-full flex justify-center pointer-events-none ${isVisible ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
      >
        {children}
      </div>

      <div 
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm shadow-lg transition-all duration-700 ease-in-out ${!isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <img src="/GOLDENKAPPA.png" alt="Golden Kappa" className="w-5 h-5 object-contain" />
        <span className="text-xs font-bold text-[#eab308]">
          Megmentett: <span className="text-white/90">{displayCount}</span> emote
        </span>
      </div>

      <button
        onClick={() => setCardVisible(!isVisible)}
        className="group fixed top-1/2 -translate-y-1/2 right-6 z-50 hidden md:flex items-center justify-center p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-sm shadow-lg overflow-hidden animate-button-in"
        style={{ animationDelay: '2.5s' }}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-500 ease-in-out text-sm font-medium">
          {isVisible ? "Kártya elrejtése" : "Kártya megjelenítése"}
        </span>
        {isVisible ? (
          <EyeOff className="w-5 h-5 flex-shrink-0 transition-opacity" />
        ) : (
          <Eye className="w-5 h-5 flex-shrink-0 transition-opacity" />
        )}
      </button>
    </>
  );
}

