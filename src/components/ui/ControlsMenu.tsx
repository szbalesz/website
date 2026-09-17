"use client";

import React from "react";
import { useControls } from "@/components/ControlsProvider";
import { Power, Ghost, PartyPopper, Galaxy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useSavedEmotes } from "@/components/SavedEmotesProvider";

export function ControlsMenu() {
  const {
    emotesEnabled,
    setEmotesEnabled,
    bgMotionEnabled,
    setBgMotionEnabled,
    starsEnabled,
    setStarsEnabled,
    partyEnabled,
    setPartyEnabled,
    cardVisible,
  } = useControls();
  const { comboCount } = useSavedEmotes();

  const anyEnabled = partyEnabled || starsEnabled || emotesEnabled || bgMotionEnabled;

  return (
    <TooltipProvider delay={0}>
      <div className={`fixed bottom-6 right-6 z-[60] hidden md:flex items-center justify-center p-1 rounded-full bg-black/40 border border-white/10 transition-all backdrop-blur-sm shadow-lg overflow-hidden animate-button-in ${
        !cardVisible && comboCount > 0 
          ? 'opacity-30 pointer-events-none cursor-not-allowed'
          : 'hover:bg-black/60 group'
      }`} style={{ animationDelay: '2.4s' }}>
        
        {/* Expandable options container */}
        <div className="flex items-center gap-1 max-w-0 opacity-0 overflow-hidden group-hover:max-w-[300px] group-hover:opacity-100 group-hover:ml-1 group-hover:mr-1 transition-all duration-500 ease-in-out">
          
          {/* Party Toggle */}
          <Tooltip>
            <TooltipTrigger
              onClick={() => setPartyEnabled(!partyEnabled)}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-all cursor-pointer ${partyEnabled ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'bg-red-500/20 hover:bg-red-500/40 text-red-400'}`}
            >
              <PartyPopper className={`w-5 h-5 transition-opacity ${partyEnabled ? "opacity-100" : "opacity-50"}`} />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/80 text-white border-white/10 backdrop-blur-md">
              {partyEnabled ? "Party effektek kikapcsolása" : "Party effektek bekapcsolása"}
            </TooltipContent>
          </Tooltip>

          {/* Floating Emotes Toggle */}
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                if (cardVisible) setEmotesEnabled(!emotesEnabled)
              }}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                !cardVisible 
                  ? 'cursor-not-allowed bg-white/20 text-white/70'
                  : emotesEnabled 
                    ? 'cursor-pointer hover:bg-white/20 text-white/70 hover:text-white' 
                    : 'cursor-pointer bg-red-500/20 hover:bg-red-500/40 text-red-400'
              }`}
            >
              <Ghost className={`w-5 h-5 transition-opacity ${emotesEnabled || !cardVisible ? "opacity-100" : "opacity-50"}`} />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/80 text-white border-white/10 backdrop-blur-md">
              {!cardVisible ? "Játék módban kötelező" : (emotesEnabled ? "Emote-ok elrejtése" : "Emote-ok megjelenítése")}
            </TooltipContent>
          </Tooltip>

          {/* Background & Stars Toggle */}
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                const newState = !bgMotionEnabled;
                setBgMotionEnabled(newState);
                setStarsEnabled(newState);
              }}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-all cursor-pointer ${bgMotionEnabled ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'bg-red-500/20 hover:bg-red-500/40 text-red-400'}`}
            >
              <Galaxy className="w-5 h-5 transition-opacity" />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/80 text-white border-white/10 backdrop-blur-md">
              {bgMotionEnabled ? "Háttér és csillagok kikapcsolása" : "Háttér és csillagok bekapcsolása"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Main Button (Master Toggle) */}
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              const newState = !anyEnabled;
              setPartyEnabled(newState);
              setStarsEnabled(newState);
              if (cardVisible) setEmotesEnabled(newState);
              setBgMotionEnabled(newState);
            }}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all cursor-pointer ${anyEnabled ? 'text-blue-400 hover:text-blue-300 bg-white/5' : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20'}`}
          >
            <Power className="w-5 h-5 flex-shrink-0" />
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-black/80 text-white border-white/10 backdrop-blur-md">
            {anyEnabled ? "Minden effekt kikapcsolása" : "Minden effekt bekapcsolása"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
