'use client';

import { useEffect, useState, useRef } from 'react';

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch('/api/views')
      .then(res => res.json())
      .then(data => {
        if (data.views !== null) setViews(data.views);
      })
      .catch(() => {});
  }, []);

  return (
    <span className="group relative inline-flex">
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] text-[#a855f7] hover:scale-110 transition-transform" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-[9999] mb-1.5 -translate-x-1/2 w-max rounded-md bg-bg-primary px-3 py-1.5 text-center opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        <span className="flex items-center justify-center gap-1.5">
          <span className="whitespace-nowrap text-xs font-bold text-[#a855f7]">Látogatások</span>
        </span>
        <span className="mt-0.5 block w-max max-w-[250px] text-[11px] leading-tight text-text-muted tabular-nums">
          {views !== null ? `${views.toLocaleString('hu-HU')} látogatás` : '...'}
        </span>
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-bg-primary"></span>
      </span>
    </span>
  );
}
