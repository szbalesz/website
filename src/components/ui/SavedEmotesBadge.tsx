"use client";

import React from "react";
import { useSavedEmotes } from "@/components/SavedEmotesProvider";
import { BadgeTooltip } from "@/components/ui/BadgeTooltip";

export function SavedEmotesBadge({ isMobile = false }: { isMobile?: boolean }) {
  const { savedCount } = useSavedEmotes();
  const displayCount = savedCount !== null ? savedCount.toLocaleString('hu-HU') : "...";

  const goldenKappa = (
    <img
      src="/GOLDENKAPPA.png"
      alt="Golden Kappa"
      className="w-full h-full object-contain"
    />
  );

  if (isMobile) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 w-full bg-black/20 rounded-md border border-white/5">
        <div className="h-5 w-5 flex-shrink-0">
          {goldenKappa}
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-bold text-[#eab308] truncate">Megmentett</span>
          <span className="text-xs text-text-muted truncate">{displayCount} emote</span>
        </div>
      </div>
    );
  }

  return (
    <BadgeTooltip
      title="Megmentett emoteok"
      subtitle={`${displayCount} db`}
      color="#eab308"
      icon={goldenKappa}
    />
  );
}
