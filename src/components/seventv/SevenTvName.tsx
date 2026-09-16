"use client";

import { useEffect, useState } from "react";

// Konvertálja a 7TV RGBA color intet rgba formátumba
const intToRgba = (intColor: number) => {
  if (intColor === undefined || intColor === null) return undefined;
  const unsigned = (intColor >>> 0);
  // 7TV colors are encoded as RGBA (Red, Green, Blue, Alpha)
  const r = (unsigned >> 24) & 0xFF;
  const g = (unsigned >> 16) & 0xFF;
  const b = (unsigned >> 8) & 0xFF;
  const a = unsigned & 0xFF;
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
};

export function SevenTvName({ name }: { name: string }) {
  const [style, setStyle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch7TV() {
      try {
        const query = `
          query {
            user(id: "${process.env.NEXT_PUBLIC_SEVENTV_USER_ID}") {
              style {
                color
                paint {
                  id
                  color
                  stops {
                    at
                    color
                  }
                  angle
                  shape
                  repeat
                  image_url
                  shadows {
                    x_offset
                    y_offset
                    radius
                    color
                  }
                }
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
        const userStyle = json?.data?.user?.style;
        if (userStyle) {
          setStyle(userStyle);
        }
      } catch (e) {
        console.error("Failed to fetch 7TV style", e);
      } finally {
        setLoading(false);
      }
    }
    fetch7TV();
  }, []);

  // Ha még tölt, vagy nincs adat, akkor egyszerűen visszaadjuk a nevet
  if (loading || !style) {
    return <span className="font-medium text-text-primary truncate">{name}</span>;
  }

  // Ha van paint (színátmenet vagy animáció)
  if (style.paint) {
    const p = style.paint;
    
    let bgImage = 'none';
    if (p.stops && p.stops.length > 0) {
      const stopsStr = p.stops.map((s: any) => `${intToRgba(s.color)} ${s.at * 100}%`).join(', ');
      const angle = p.angle || 90;
      // 7TV-nél a szög és a gradiens generálása
      bgImage = `linear-gradient(${angle}deg, ${stopsStr})`;
    } else if (p.image_url) {
      bgImage = `url('${p.image_url}')`;
    }

    const shadowList = p.shadows && p.shadows.length > 0 
      ? p.shadows.map((s: any) => `drop-shadow(${s.x_offset}px ${s.y_offset}px ${s.radius}px ${intToRgba(s.color)})`).join(' ')
      : 'none';

    return (
      <span 
        className="font-medium truncate"
        style={{
          backgroundImage: bgImage,
          backgroundSize: p.repeat ? 'auto' : '100% 100%',
          backgroundRepeat: p.repeat ? 'repeat' : 'unset',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: shadowList !== 'none' ? shadowList : undefined
        }}
      >
        {name}
      </span>
    );
  }

  // Ha csak egy sima egyedi szín van beállítva
  if (style.color) {
    return (
      <span className="font-medium truncate" style={{ color: intToRgba(style.color) }}>
        {name}
      </span>
    );
  }

  // Fallback
  return <span className="font-medium text-text-primary truncate">{name}</span>;
}
