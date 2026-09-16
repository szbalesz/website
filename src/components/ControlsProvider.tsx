"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ControlsContextType {
  isFrozen: boolean;
  setIsFrozen: (value: boolean) => void;
  emotesEnabled: boolean;
  setEmotesEnabled: (value: boolean) => void;
  cardVisible: boolean;
  setCardVisible: (value: boolean) => void;
  bgMotionEnabled: boolean;
  setBgMotionEnabled: (value: boolean) => void;
  starsEnabled: boolean;
  setStarsEnabled: (value: boolean) => void;
  partyEnabled: boolean;
  setPartyEnabled: (value: boolean) => void;
  hasHydrated: boolean;
}

const ControlsContext = createContext<ControlsContextType | undefined>(undefined);

export function ControlsProvider({ children }: { children: React.ReactNode }) {
  const [hasHydrated, setHasHydrated] = useState(false);
  
  // Load initial settings from localStorage if available
  const [emotesEnabled, setEmotesEnabled] = useState(true);
  const [cardVisible, setCardVisible] = useState(true);
  const [bgMotionEnabled, setBgMotionEnabled] = useState(true);
  const [starsEnabled, setStarsEnabled] = useState(true);
  const [partyEnabled, setPartyEnabled] = useState(true);

  useEffect(() => {
    const savedEmotes = localStorage.getItem("floatingEmotesEnabled");
    if (savedEmotes !== null) setEmotesEnabled(savedEmotes === "true");

    const savedBg = localStorage.getItem("bgMotionEnabled");
    if (savedBg !== null) setBgMotionEnabled(savedBg === "true");

    const savedStars = localStorage.getItem("starsEnabled");
    if (savedStars !== null) setStarsEnabled(savedStars === "true");

    const savedParty = localStorage.getItem("partyEnabled");
    if (savedParty !== null) setPartyEnabled(savedParty === "true");

    setHasHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("floatingEmotesEnabled", String(emotesEnabled));
    }
  }, [emotesEnabled, hasHydrated]);

  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("bgMotionEnabled", String(bgMotionEnabled));
    }
  }, [bgMotionEnabled, hasHydrated]);

  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("starsEnabled", String(starsEnabled));
    }
  }, [starsEnabled, hasHydrated]);

  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("partyEnabled", String(partyEnabled));
    }
  }, [partyEnabled, hasHydrated]);

  return (
    <ControlsContext.Provider
      value={{
        isFrozen: false, // Legacy field for compatibility, unused
        setIsFrozen: () => {},
        emotesEnabled,
        setEmotesEnabled,
        cardVisible,
        setCardVisible,
        bgMotionEnabled,
        setBgMotionEnabled,
        starsEnabled,
        setStarsEnabled,
        partyEnabled,
        setPartyEnabled,
        hasHydrated,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
}

export function useControls() {
  const context = useContext(ControlsContext);
  if (context === undefined) {
    throw new Error("useControls must be used within a ControlsProvider");
  }
  return context;
}
