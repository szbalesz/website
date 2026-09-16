"use client";

import { useLanyard } from "@/hooks/useLanyard";

export function DiscordButton() {
  const data = useLanyard();
  const nameplate = data?.discord_user?.collectibles?.nameplate;

  // A Discord CDN media URL az sku_id alapján
  let videoUrl = null;
  if (nameplate?.sku_id) {
    videoUrl = `https://cdn.discordapp.com/media/v1/collectibles-shop/${nameplate.sku_id}/video`;
  }

  return (
    <a href={`https://discordapp.com/users/${process.env.NEXT_PUBLIC_DISCORD_USER_ID}`} target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.1s' }}>
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border relative overflow-hidden group"
        style={{
          backgroundColor: '#5865F215',
          borderColor: '#5865F230',
        }}
      >
        {/* Nameplate video background */}
        {videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen group-hover:opacity-70 transition-opacity"
          />
        )}

        <div className="relative z-10 flex items-center gap-2 w-full">
          <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="#5865F2" className="flex-shrink-0"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c0,0,.04-.06.09-.09C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"></path></svg>
          <div className="min-w-0 text-left">
            <span className="font-medium text-text-primary animate-discord-name">SzBalesz</span>
            <span className="ml-1.5 text-xs text-text-muted font-normal">Discord</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5865F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      </div>
    </a>
  );
}
