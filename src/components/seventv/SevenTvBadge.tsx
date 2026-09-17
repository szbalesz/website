"use client";

import { BadgeTooltip } from "@/components/ui/BadgeTooltip";

export function SevenTvBadge({ badge, isMobile }: { badge: any, isMobile?: boolean }) {
  if (!badge?.host?.url) return null;

  const badgeUrl = `https:${badge.host.url}/2x.webp`;

  if (isMobile) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 w-full bg-black/20 rounded-md border border-white/5">
        <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
          <img src={badgeUrl} alt={badge.name} width={20} height={20} style={{ objectFit: 'contain' }} />
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-bold text-white truncate">{badge.name}</span>
          <span className="text-xs text-text-muted truncate">7TV BADGE</span>
        </div>
      </div>
    );
  }

  const icon = (
    <img
      src={badgeUrl}
      alt={badge.name}
      width={18}
      height={18}
      style={{ objectFit: 'contain' }}
    />
  );

  return (
    <BadgeTooltip
      title={(badge.name).toUpperCase()}
      subtitle="7TV BADGE"
      color="#ffffff"
      icon={icon}
    />
  );
}
