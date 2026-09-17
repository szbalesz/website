"use client";

import React from "react";
import { Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSavedEmotes } from "@/components/SavedEmotesProvider";
import { useControls } from "@/components/ControlsProvider";

export function CardVisibilityWrapper({ children }: { children: React.ReactNode }) {
  const { cardVisible: isVisible, setCardVisible, isVideoFinished } = useControls();
  const { savedCount, comboCount, comboList, comboState } = useSavedEmotes();
  const displayCount = savedCount !== null ? savedCount.toLocaleString('hu-HU') : "...";

  const [hasToggled, setHasToggled] = React.useState(false);

  return (
    <>
      <div 
        className={`relative z-10 w-full flex justify-center pointer-events-none ${!isVisible ? 'card-hide' : ''} ${hasToggled ? 'card-no-delay' : ''} ${!isVideoFinished && !hasToggled ? 'card-wait-video' : ''}`}
      >
        {children}
      </div>

      <div className={`fixed top-8 z-20 flex flex-col gap-3 pointer-events-none transition-all duration-700 ease-in-out ${
        !isVisible ? 'left-1/2 -translate-x-1/2 items-center' : 'left-8 items-start'
      }`}>
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm shadow-lg transition-all duration-700 ease-in-out opacity-100 scale-100"
        >
          <img src="/GOLDENKAPPA.png" alt="Golden Kappa" className="w-5 h-5 object-contain" />
          <span className="text-xs font-bold text-[#eab308]">
            Megmentett: <span className="text-white/90">{displayCount}</span> emote
          </span>
        </div>

        <AnimatePresence>
          {comboCount > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`flex flex-col gap-1 ${!isVisible ? 'items-center' : 'items-start'}`}
            >
              {comboCount > 1 && (
                <div className={`relative font-black text-xl italic tracking-wider scale-110 flex items-center transition-all duration-700 ${!isVisible ? 'justify-center origin-center ml-0' : 'justify-start origin-left ml-2'}`}>
                  {/* Láthatatlan térfoglaló, hogy a méret mindig jó legyen */}
                  <div className="opacity-0 pointer-events-none whitespace-nowrap">
                    {comboCount}x COMBO!
                  </div>
                  
                  {/* MLG Aktív réteg */}
                  <div className={`absolute inset-0 flex items-center whitespace-nowrap transition-opacity duration-500 ease-in-out ${!isVisible ? 'justify-center' : 'justify-start'} ${
                    comboState === 'active' ? 'opacity-100 animate-mlg-colors' : 'opacity-0'
                  }`}>
                    {comboCount}x COMBO!
                  </div>
                  
                  {/* Pulzáló elhalványuló réteg */}
                  <div className={`absolute inset-0 flex items-center whitespace-nowrap transition-opacity duration-500 ease-in-out ${!isVisible ? 'justify-center' : 'justify-start'} ${
                    comboState === 'fading' ? 'opacity-100 animate-pulse text-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'opacity-0'
                  }`}>
                    {comboCount}x COMBO!
                  </div>
                </div>
              )}
              <div className={`flex flex-col gap-1 mt-1 transition-all duration-700 ${!isVisible ? 'items-center ml-0' : 'items-start ml-2'}`}>
                <AnimatePresence>
                  {comboList.map((emote, idx) => (
                    <motion.div 
                      key={emote.uuid}
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1 - (idx * 0.3), y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                      className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full"
                    >
                      <img src={`https://cdn.7tv.app/emote/${emote.id}/1x.webp`} alt={emote.name} className="w-4 h-4 object-contain" />
                      <span className="text-xs font-bold text-white/90">
                        {emote.name}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => {
          setHasToggled(true);
          setCardVisible(!isVisible);
        }}
        disabled={!isVisible && comboCount > 0}
        className={`group fixed top-1/2 -translate-y-1/2 right-6 z-50 hidden md:flex items-center justify-center p-3 rounded-full bg-black/40 border border-white/10 transition-all backdrop-blur-sm shadow-lg overflow-hidden animate-button-in ${
          !isVisible && comboCount > 0 
            ? 'opacity-30 pointer-events-none cursor-not-allowed text-white/30' 
            : 'hover:bg-black/60 text-white/70 hover:text-white cursor-pointer'
        }`}
        style={{ animationDelay: '2.5s' }}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-500 ease-in-out text-sm font-medium">
          {isVisible ? "Játék mód" : "Kilépés a játékból"}
        </span>
        <Gamepad2 className="w-5 h-5 flex-shrink-0 transition-opacity" />
      </button>
    </>
  );
}

