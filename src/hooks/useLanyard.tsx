"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const LanyardContext = createContext<any>(null);

export function LanyardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${process.env.NEXT_PUBLIC_DISCORD_USER_ID}?_t=${Date.now()}`, { 
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
  }, []);

  return (
    <LanyardContext.Provider value={data}>
      {children}
    </LanyardContext.Provider>
  );
}

export function useLanyard() {
  return useContext(LanyardContext);
}
