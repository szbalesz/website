"use client";

import { useEffect, useState, useRef } from "react";
import { Music, Gamepad2, Monitor, Tv, Clock } from "lucide-react";
import { useLanyard } from "@/hooks/useLanyard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Discord képek feloldása (app-assets vagy külső proxy)
const getAssetUrl = (appId: string, assetId: string) => {
  if (!assetId) return null;
  if (assetId.startsWith("mp:external/")) {
    return `https://media.discordapp.net/external/${assetId.replace("mp:external/", "")}`;
  }
  return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`;
};

// Segéd a tevékenység típusának szövegéhez
const getActivityVerb = (type: number) => {
  switch (type) {
    case 0: return "Ezt játssza";
    case 1: return "Ezt közvetíti";
    case 2: return "Ezt hallgatja";
    case 3: return "Ezt nézi";
    case 5: return "Versenyzik";
    default: return "Tevékenység";
  }
};

// Tooltip komponens a képekhez (kezeli az állapotot)
function ActivityImageTooltip({
  image,
  text,
  isSmall
}: {
  image: string;
  text: string;
  isSmall?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        render={<div className={isSmall ? "absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-card border-[2px] border-card overflow-hidden flex items-center justify-center cursor-default" : "w-full h-full cursor-default"} />}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onBlur={() => setOpen(false)}
      >
        <img src={image} alt="Activity Asset" className={isSmall ? "w-full h-full object-cover" : "w-full h-full object-cover rounded-xl shadow-md"} />
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-bg-primary text-text-primary border-border">
        <span className="text-xs font-bold">{text}</span>
      </TooltipContent>
    </Tooltip>
  );
}

// Idő és folyamatjelző komponens
const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const TimeTracker = ({ timestamps }: { timestamps?: { start?: number, end?: number } }) => {
  const [now, setNow] = useState(Date.now());
  const progressRef = useRef<HTMLDivElement>(null);

  const start = timestamps?.start;
  const end = timestamps?.end;
  const isFixedDuration = !!end;

  useEffect(() => {
    if (!start) return;
    
    // Szöveges számláló frissítése másodpercenként
    const interval = setInterval(() => setNow(Date.now()), 1000);
    
    // Progress bar smooth frissítése 60 FPS-el (ha van vége)
    let animationFrameId: number;
    const updateProgress = () => {
      if (end && start && progressRef.current) {
        const totalMs = end - start;
        const elapsedMs = Math.max(0, Math.min(Date.now() - start, totalMs));
        const progress = (elapsedMs / totalMs) * 100;
        progressRef.current.style.width = `${progress}%`;
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    if (end) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => {
      clearInterval(interval);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, end]);

  if (!start) return null;

  if (isFixedDuration) {
    const totalMs = end - start;
    const elapsedMs = Math.max(0, Math.min(now - start, totalMs));

    return (
      <div className="flex items-center gap-2 mt-2 w-full text-[11px] text-text-muted font-mono font-medium">
        <span className="w-10 text-left">{formatTime(elapsedMs)}</span>
        <div className="flex-1 h-1.5 bg-black/20 dark:bg-white/10 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-text-primary rounded-full" 
          />
        </div>
        <span className="w-10 text-right">{formatTime(totalMs)}</span>
      </div>
    );
  }

  // Csak eltelt idő
  const elapsedMs = Math.max(0, now - start);
  return (
    <div className="text-[11px] text-text-muted mt-1.5 font-mono font-medium">
      {formatTime(elapsedMs)} eltelt
    </div>
  );
};

export function LanyardStatus() {
  const data = useLanyard();
  const [lastActivities, setLastActivities] = useState<any[]>([]);
  const [contentHeight, setContentHeight] = useState<number | "auto">(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.activities) {
      const currentActivities = data.activities.filter((a: any) => a.type !== 4);
      if (currentActivities.length > 0) {
        setLastActivities(currentActivities);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use offsetHeight to capture padding properly
        setContentHeight((entry.target as HTMLElement).offsetHeight);
      }
    });

    resizeObserver.observe(contentRef.current);

    // Initial measurement
    setContentHeight(contentRef.current.offsetHeight);

    return () => resizeObserver.disconnect();
  }, []);

  const customActivities = data?.activities?.filter((a: any) => a.type !== 4) || [];
  const hasActivities = customActivities.length > 0;

  // Amikor nincsenek aktív tevékenységek, a legutolsót mutatjuk, hogy szép legyen az összecsukó animáció
  const activitiesToRender = hasActivities ? customActivities : lastActivities;

  return (
    <div
      className="w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
      style={{
        height: hasActivities ? (contentHeight ? `${contentHeight}px` : "auto") : "0px",
        opacity: hasActivities ? 1 : 0,
      }}
    >
      <div ref={contentRef} className="w-full pt-6">
        <div className="flex flex-col w-full bg-black/5 dark:bg-white/5 rounded-xl border border-border/50 text-left overflow-hidden">
          <div className="bg-black/10 dark:bg-white/10 px-4 py-2 border-b border-border/50">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Jelenlegi tevékenység
            </span>
          </div>

          <div className="flex flex-col p-4">
            {activitiesToRender.map((activity: any, index: number) => {
              const isSpotify = activity.id === "spotify:1" && data?.spotify;

              return (
                <div key={activity.id || index} className="flex flex-col">
                  {index > 0 && <div className="h-[1px] bg-border/50 my-4 transition-opacity duration-300" />}

                  {isSpotify ? (
                    <div className="flex flex-col gap-2 animate-fade">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        Ezt hallgatja: Spotify
                      </div>

                      <div className="flex gap-3.5 group">
                        <a href={`https://open.spotify.com/track/${data.spotify.track_id}`} target="_blank" rel="noreferrer" className="relative h-[72px] w-[72px] flex-shrink-0 cursor-pointer">
                          {data.spotify.album_art_url ? (
                            <img src={data.spotify.album_art_url} alt="Album Art" className="w-full h-full object-cover rounded-xl shadow-md" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#1DB954]/20 text-[#1DB954] rounded-xl shadow-md">
                              <Music size={28} className="animate-pulse" />
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-card p-0.5 flex items-center justify-center border-2 border-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                          </div>
                        </a>

                        <div className="flex flex-col min-w-0 flex-1 justify-center">
                          <a href={`https://open.spotify.com/track/${data.spotify.track_id}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-text-primary truncate hover:underline">
                            {data.spotify.song}
                          </a>
                          <span className="text-sm text-text-muted truncate">{data.spotify.artist}</span>
                          {data.spotify.album && (
                            <span className="text-xs text-text-muted truncate mt-0.5 opacity-75">{data.spotify.album}</span>
                          )}
                          {data.spotify.timestamps && (
                            <TimeTracker timestamps={data.spotify.timestamps} />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 animate-fade">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        {getActivityVerb(activity.type)}: <span className="text-text-primary">{activity.name}</span>
                      </div>

                      <div className="flex gap-3.5">
                        <div className="relative h-[72px] w-[72px] flex-shrink-0">
                          {activity.assets?.large_image ? (
                            activity.assets.large_text ? (
                              <ActivityImageTooltip
                                image={getAssetUrl(activity.application_id, activity.assets.large_image) || ''}
                                text={activity.assets.large_text}
                              />
                            ) : (
                              <img src={getAssetUrl(activity.application_id, activity.assets.large_image) || ''} alt="Activity" className="w-full h-full object-cover rounded-xl shadow-md" />
                            )
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 shadow-md">
                              {activity.type === 3 ? <Tv size={28} /> :
                                activity.name.toLowerCase().includes("code") ? <Monitor size={28} /> :
                                  <Gamepad2 size={28} />}
                            </div>
                          )}
                          {activity.assets?.small_image && (
                            activity.assets.small_text ? (
                              <ActivityImageTooltip
                                image={getAssetUrl(activity.application_id, activity.assets.small_image) || ''}
                                text={activity.assets.small_text}
                                isSmall
                              />
                            ) : (
                              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-card border-[2px] border-card overflow-hidden flex items-center justify-center">
                                <img src={getAssetUrl(activity.application_id, activity.assets.small_image) || ''} alt="Small Asset" className="w-full h-full object-cover" />
                              </div>
                            )
                          )}
                        </div>

                        <div className="flex flex-col min-w-0 flex-1 justify-center gap-0.5">
                          {activity.details && (
                            <span className="text-sm font-bold text-text-primary truncate">{activity.details}</span>
                          )}
                          {activity.state && (
                            <span className="text-sm text-text-muted line-clamp-2 leading-tight" title={activity.state}>{activity.state}</span>
                          )}



                          {/* Idővonal / Eltelt idő */}
                          {activity.timestamps && (
                            <TimeTracker timestamps={activity.timestamps} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
