"use client";

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

export function SevenTvName({ name, style }: { name: string, style?: any }) {
  // Ha nincs adat, akkor egyszerűen visszaadjuk a nevet
  if (!style) {
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

    if (bgImage !== 'none') {
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
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            filter: shadowList !== 'none' ? shadowList : undefined
          }}
        >
          {name}
        </span>
      );
    }
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
