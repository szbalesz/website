"use client";

import { useEffect, useState } from "react";
import { BadgeTooltip } from "@/components/BadgeTooltip";

export function SevenTvBadge({ isMobile }: { isMobile?: boolean }) {
  const [badge, setBadge] = useState<any>(null);

  useEffect(() => {
    async function fetch7TV() {
      try {
        const query = `
          query {
            user(id: "${process.env.NEXT_PUBLIC_SEVENTV_USER_ID}") {
              style {
                badge {
                  id
                  name
                  tooltip
                  host {
                    url
                  }
                }
              }
            }
          }
        `;
        
        const res = await fetch('https://7tv.io/v3/gql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
        
        const json = await res.json();
        const b = json?.data?.user?.style?.badge;
        if (b?.host?.url) {
          setBadge(b);
        }
      } catch (e) {
        console.error("Failed to fetch 7TV badge", e);
      }
    }
    fetch7TV();
  }, []);

  if (!badge) return null;

  const badgeUrl = `https:${badge.host.url}/2x.webp`;
  
  if (isMobile) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 w-full bg-black/20 rounded-md border border-white/5">
        <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
          <img src={badgeUrl} alt={badge.name} width={20} height={20} style={{ objectFit: 'contain' }} />
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-bold text-white truncate">{badge.name}</span>
          <span className="text-xs text-text-muted truncate">7TV</span>
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
      title={(badge.tooltip || badge.name).toUpperCase()}
      subtitle="7TV"
      color="#ffffff"
      icon={icon}
    />
  );
}
