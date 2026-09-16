"use client";

import { useEffect, useState, useRef } from "react";
import { useLanyard } from "@/hooks/useLanyard";
import { Ghost } from "lucide-react";
import { useSavedEmotes } from "@/components/SavedEmotesProvider";

interface EmoteData {
  id: string;
  name: string;
}

interface FlyingEmote {
  key: string;
  emoteId: string;
  name: string;
  startX: string;
  startY: string;
  duration: number;
  scale: number;
  startRotation: number;
  endRotation: number;
  delay: number;
}

export function FloatingEmotes() {
  const [emotes, setEmotes] = useState<EmoteData[]>([]);
  const [flyingEmotes, setFlyingEmotes] = useState<FlyingEmote[]>([]);
  const nextKey = useRef(0);
  const spawnTimeouts = useRef<Set<NodeJS.Timeout>>(new Set());
  const removeTimeouts = useRef<Set<NodeJS.Timeout>>(new Set());
  const lanyard = useLanyard();
  const currentFlyingEmotes = useRef<FlyingEmote[]>([]);
  const { saveEmote } = useSavedEmotes();

  const [isEnabled, setIsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const isSpotifyPlaying = !!lanyard?.spotify;

  useEffect(() => {
    const saved = localStorage.getItem("floatingEmotesEnabled");
    if (saved !== null) {
      setIsEnabled(saved === "true");
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      // Clean up remove timeouts only on full unmount
      removeTimeouts.current.forEach(clearTimeout);
      removeTimeouts.current.clear();
    };
  }, []);

  useEffect(() => {
    currentFlyingEmotes.current = flyingEmotes;
  }, [flyingEmotes]);

  useEffect(() => {
    fetch("https://api.7tv.app/v3/emote-sets/01M16KPPYC70JDYZJ283SN8N89")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.emotes) {
          setEmotes(data.emotes.map((e: any) => ({ id: e.id, name: e.name })));
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (emotes.length === 0 || !isEnabled || isMobile) return;

    let isEffectActive = true;

    // Filter music emotes
    const musicKeywords = ["dance", "rave", "headbang", "pls", "vibe", "time", "CatGang", "pedro", "party", "disco", "fiesta", "jam", "dj", "amogus", "bass"];
    const musicEmotes = emotes.filter(e =>
      musicKeywords.some(keyword => e.name.toLowerCase().includes(keyword))
    );

    const spawnEmote = (isMusicParty: boolean, initialDelay: number = 0) => {
      if (!isEffectActive) return;

      let selectedEmote: EmoteData | null = null;
      let attempts = 0;

      while (!selectedEmote && attempts < 10) {
        let candidate: EmoteData;
        if (isMusicParty && musicEmotes.length > 0) {
          candidate = musicEmotes[Math.floor(Math.random() * musicEmotes.length)];
        } else {
          candidate = emotes[Math.floor(Math.random() * emotes.length)];
        }

        const count = currentFlyingEmotes.current.filter(e => e.emoteId === candidate.id).length;
        if (count < 2) {
          selectedEmote = candidate;
        }
        attempts++;
      }

      if (!selectedEmote) {
        selectedEmote = emotes[Math.floor(Math.random() * emotes.length)];
        const candidate = selectedEmote;
        const forceCount = currentFlyingEmotes.current.filter(e => e.emoteId === candidate.id).length;
        if (forceCount >= 2) {
          if (isMusicParty) {
            const nextSpawnTime = 1050 + Math.random() * 2100;
            const spawnTimeout = setTimeout(() => spawnEmote(true), nextSpawnTime);
            spawnTimeouts.current.add(spawnTimeout);
          } else {
            const nextSpawnTime = 650 + Math.random() * 1850;
            const spawnTimeout = setTimeout(() => spawnEmote(false), nextSpawnTime);
            spawnTimeouts.current.add(spawnTimeout);
          }
          return;
        }
      }

      // 4-től 25 másodpercig terjedő véletlenszerű utazási idő (nagy sebességkülönbségek)
      const duration = 4 + Math.random() * 21;

      const startEdge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let startX = "0%";
      let startY = "0%";

      switch (startEdge) {
        case 0:
          startX = `${Math.random() * 100}vw`;
          startY = `-50px`;
          break;
        case 1:
          startX = `calc(100vw + 50px)`;
          startY = `${Math.random() * 100}vh`;
          break;
        case 2:
          startX = `${Math.random() * 100}vw`;
          startY = `calc(100vh + 50px)`;
          break;
        case 3:
          startX = `-50px`;
          startY = `${Math.random() * 100}vh`;
          break;
      }

      const startRot = (Math.random() - 0.5) * 60; // -30 to 30 deg start
      // Spin it multiple times as it gets sucked in (e.g. 720 to 1440 degrees)
      const endRot = startRot + (Math.random() > 0.5 ? 1 : -1) * (720 + Math.random() * 720);

      const newEmote: FlyingEmote = {
        key: `emote-${nextKey.current++}`,
        emoteId: selectedEmote.id,
        name: selectedEmote.name,
        startX,
        startY,
        duration: duration,
        scale: 0.64 + Math.random() * 0.96, // 80% of previous (0.8 to 2.0 -> 0.64 to 1.6)
        startRotation: startRot,
        endRotation: endRot,
        delay: initialDelay,
      };

      setFlyingEmotes((prev) => {
        if (prev.length > 60) return prev;
        return [...prev, newEmote];
      });

      const removeTimeout = setTimeout(() => {
        setFlyingEmotes((prev) => prev.filter((e) => e.key !== newEmote.key));
        removeTimeouts.current.delete(removeTimeout);
      }, (duration + initialDelay + 1) * 1000);
      removeTimeouts.current.add(removeTimeout);

      if (isMusicParty) {
        const nextSpawnTime = 1050 + Math.random() * 2100;
        const spawnTimeout = setTimeout(() => spawnEmote(true), nextSpawnTime);
        spawnTimeouts.current.add(spawnTimeout);
      } else {
        const nextSpawnTime = 650 + Math.random() * 1850;
        const spawnTimeout = setTimeout(() => spawnEmote(false), nextSpawnTime);
        spawnTimeouts.current.add(spawnTimeout);
      }
    };

    // Kezdeti löket a szélekről gyorsan egymás után
    for (let i = 0; i < 6; i++) {
      const burstTimeout = setTimeout(() => spawnEmote(false, 0), i * 150);
      spawnTimeouts.current.add(burstTimeout);
    }
    if (isSpotifyPlaying && musicEmotes.length > 0) {
      for (let i = 0; i < 4; i++) {
        const partyBurst = setTimeout(() => spawnEmote(true, 0), i * 150);
        spawnTimeouts.current.add(partyBurst);
      }
      const partyTimeout = setTimeout(() => spawnEmote(true), 800);
      spawnTimeouts.current.add(partyTimeout);
    }

    const initialTimeout = setTimeout(() => spawnEmote(false), 800);
    spawnTimeouts.current.add(initialTimeout);

    return () => {
      isEffectActive = false;
      spawnTimeouts.current.forEach(clearTimeout);
      spawnTimeouts.current.clear();
    };
  }, [emotes, isSpotifyPlaying, isEnabled, isMobile]);

  return (
    <>
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden z-[5] transition-opacity duration-1000 ${isEnabled ? 'opacity-100' : 'opacity-0'}`}
      >
        {flyingEmotes.map((emote) => {
          return (
            <div
              key={emote.key}
              className="absolute animate-suck-into-blackhole pointer-events-auto cursor-pointer select-none"
              onDragStart={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                saveEmote();
                setFlyingEmotes((prev) => prev.filter((e) => e.key !== emote.key));
              }}
              style={{
                '--start-x': emote.startX,
                '--start-y': emote.startY,
                '--start-scale': emote.scale,
                animationDuration: `${emote.duration}s`,
                animationDelay: `${emote.delay}s`,
                animationTimingFunction: 'ease-in',
                animationFillMode: 'forwards'
              } as React.CSSProperties}
            >
              <div
                className="select-none"
                style={{
                  '--start-rotation': `${emote.startRotation}deg`,
                  '--end-rotation': `${emote.endRotation}deg`,
                  animationName: 'spin-into-blackhole',
                  animationDuration: `${emote.duration}s`,
                  animationDelay: `${emote.delay}s`,
                  animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)', // Starts slow, accelerates rapidly at the end
                  animationFillMode: 'forwards'
                } as React.CSSProperties}
              >
                <img
                  src={`https://cdn.7tv.app/emote/${emote.emoteId}/2x.webp`}
                  alt={emote.name}
                  className="w-12 h-12 object-contain pointer-events-none select-none"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          const newState = !isEnabled;
          if (newState) {
            // When turning back on, clear any leftover hidden emotes to start fresh
            setFlyingEmotes([]);
          }
          setIsEnabled(newState);
          localStorage.setItem("floatingEmotesEnabled", String(newState));
        }}
        className="group fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm shadow-lg overflow-hidden animate-button-in"
        style={{ animationDelay: '2.4s' }}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-500 ease-in-out text-sm font-medium">
          {isEnabled ? "Emoteok kikapcsolása" : "Emoteok bekapcsolása"}
        </span>
        <Ghost className={`w-5 h-5 flex-shrink-0 transition-opacity ${isEnabled ? "opacity-100" : "opacity-30"}`} />
      </button>
    </>
  );
}
