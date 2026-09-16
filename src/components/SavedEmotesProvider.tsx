"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface SavedEmotesContextType {
  savedCount: number | null; // null indicates loading
  saveEmote: () => void;
}

const SavedEmotesContext = createContext<SavedEmotesContextType | undefined>(undefined);

export function SavedEmotesProvider({ children }: { children: React.ReactNode }) {
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const pendingSaves = useRef(0);
  const flushTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const saveEmote = () => {
    // Optimistic UI update
    setSavedCount((prev) => (prev !== null ? prev + 1 : 1));
    pendingSaves.current += 1;

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
    <SavedEmotesContext.Provider value={{ savedCount, saveEmote }}>
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
