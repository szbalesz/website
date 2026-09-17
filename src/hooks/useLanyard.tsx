"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const LanyardContext = createContext<any>(null);

export function LanyardProvider({ children, discordId }: { children: ReactNode, discordId: string | null }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!discordId) return;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}?_t=${Date.now()}`, { 
          cache: "no-store" 
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Lanyard fetch error:", err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [discordId]);

  useEffect(() => {
    if (data?.discord_user?.display_name_styles?.colors) {
      const colors = data.discord_user.display_name_styles.colors;
      if (colors.length > 0) {
        document.documentElement.style.setProperty('--discord-name-color-1', `#${colors[0].toString(16).padStart(6, '0')}`);
        document.documentElement.style.setProperty('--discord-name-color-2', `#${colors[1 % colors.length].toString(16).padStart(6, '0')}`);
        document.documentElement.style.setProperty('--discord-name-color-3', `#${colors[2 % colors.length].toString(16).padStart(6, '0')}`);
        document.documentElement.style.setProperty('--discord-name-color-4', `#${colors[3 % colors.length].toString(16).padStart(6, '0')}`);
        document.documentElement.style.setProperty('--discord-name-color-5', `#${colors[4 % colors.length].toString(16).padStart(6, '0')}`);
      }
    }
  }, [data]);

  return (
    <LanyardContext.Provider value={data}>
      {children}
    </LanyardContext.Provider>
  );
}

export function useLanyard() {
  return useContext(LanyardContext);
}
