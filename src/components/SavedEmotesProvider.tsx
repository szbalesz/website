"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface ComboEmote {
  uuid: string;
  name: string;
  id: string;
}

interface SavedEmotesContextType {
  savedCount: number | null; // null indicates loading
  saveEmote: (emote?: Omit<ComboEmote, "uuid">) => void;
  comboList: ComboEmote[];
  comboCount: number;
  comboState: "active" | "fading";
}

const SavedEmotesContext = createContext<SavedEmotesContextType | undefined>(undefined);

export function SavedEmotesProvider({ children }: { children: React.ReactNode }) {
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const [comboList, setComboList] = useState<ComboEmote[]>([]);
  const [comboCount, setComboCount] = useState<number>(0);
  const [comboState, setComboState] = useState<"active" | "fading">("active");
  const pendingSaves = useRef(0);
  const flushTimeout = useRef<NodeJS.Timeout | null>(null);
  const comboTimeout = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial fetch
    fetch("/api/emotes")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setSavedCount(data.count);
        }
      })
      .catch((err) => console.error("Failed to fetch saved emotes:", err));
  }, []);

  const saveEmote = (emote?: Omit<ComboEmote, "uuid">) => {
    // Optimistic UI update
    setSavedCount((prev) => (prev !== null ? prev + 1 : 1));
    pendingSaves.current += 1;

    if (emote) {
      const newEmote = { ...emote, uuid: crypto.randomUUID() };
      setComboList(prev => [newEmote, ...prev].slice(0, 3));
      setComboCount(prev => prev + 1);
      setComboState("active");

      if (comboTimeout.current) clearTimeout(comboTimeout.current);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);

      fadeTimeout.current = setTimeout(() => {
        setComboState("fading");
      }, 500); // 500ms of shake, then start pulsing

      comboTimeout.current = setTimeout(() => {
        setComboList([]);
        setComboCount(0);
      }, 2500);
    }

    // Debounce the network request
    if (flushTimeout.current) {
      clearTimeout(flushTimeout.current);
    }

    flushTimeout.current = setTimeout(() => {
      const countToSave = pendingSaves.current;
      if (countToSave === 0) return;
      
      pendingSaves.current = 0; // reset locally before network call
      
      fetch("/api/emotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: countToSave }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Sync with server truth if needed (optional, we trust our local count mostly)
          if (data && typeof data.count === "number") {
            setSavedCount((prev) => Math.max(prev || 0, data.count));
          }
        })
        .catch((err) => {
          console.error("Failed to save emotes to server:", err);
          // Re-add to pending if failed? Optional, for now just log it.
          pendingSaves.current += countToSave; 
        });
    }, 1500); // 1.5s after the LAST click
  };

  return (
    <SavedEmotesContext.Provider value={{ savedCount, saveEmote, comboList, comboCount, comboState }}>
      {children}
    </SavedEmotesContext.Provider>
  );
}

export function useSavedEmotes() {
  const context = useContext(SavedEmotesContext);
  if (context === undefined) {
    throw new Error("useSavedEmotes must be used within a SavedEmotesProvider");
  }
  return context;
}
