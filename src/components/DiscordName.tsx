"use client";

import { useLanyard } from "@/hooks/useLanyard";

export function DiscordName() {
  const data = useLanyard();
  const fontId = data?.discord_user?.display_name_styles?.font_id;
  
  // A Discord API-ból jövő 14-es font_id a Pixel betűtípust jelöli
  const isPixelFont = fontId === 14;

  return (
    <span 
      className={`text-text-primary ${!isPixelFont ? "font-medium" : ""}`}
      style={{
        fontFamily: isPixelFont ? `var(--font-mainframe), "gg sans", Arial, sans-serif` : undefined,
        letterSpacing: isPixelFont ? "1px" : undefined,
        fontWeight: isPixelFont ? "normal" : undefined,
        background: `linear-gradient(90deg, #d7605c 0.000%, #a9362e 20.000%, #f45a18 40.000%, #ff9500 60.000%, #ffd447 80.000%, #d7605c 100.000%)`,
        backgroundSize: `max(8ch, 38px) auto`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        whiteSpace: "nowrap",
        animation: "discord-name-gradient 3s linear infinite reverse"
      }}
    >
      SzBalesz
    </span>
  );
}
