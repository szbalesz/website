'use client';

import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

let globalViews: number | null = null;
let fetchPromise: Promise<any> | null = null;

export function useViews() {
  const [views, setViews] = useState<number | null>(globalViews);

  useEffect(() => {
    if (globalViews !== null) return;

    if (!fetchPromise) {
      fetchPromise = fetch('/api/views').then(res => res.json());
    }

    fetchPromise
      .then(data => {
        if (data.views !== null) {
          globalViews = data.views;
          setViews(data.views);
        }
      })
      .catch(() => {});
  }, []);

  return views;
}

export function ViewCounter() {
  const views = useViews();

  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex cursor-default" />}>
        <div className="h-[22px] w-[22px] text-[#a855f7] hover:scale-110 transition-transform">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-bg-primary text-text-primary border-border">
        <div className="flex flex-col items-center gap-0.5 text-center">
          <span className="whitespace-nowrap text-xs font-bold text-[#a855f7]">Látogatások</span>
          <span className="block w-max max-w-[250px] text-[11px] leading-tight text-text-muted tabular-nums">
            {views !== null ? `${views.toLocaleString('hu-HU')} látogatás` : '...'}
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function MobileViewRow({ className }: { className?: string }) {
  const views = useViews();

  return (
    <div className={`flex items-center gap-3 px-3 py-2 w-full bg-black/20 rounded-md border border-white/5 ${className || ''}`}>
      <div className="h-5 w-5 text-[#a855f7] flex-shrink-0">
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
      <div className="flex flex-col items-start min-w-0">
        <span className="text-sm font-bold text-[#a855f7] truncate">Látogatások</span>
        <span className="text-xs text-text-muted truncate">
          {views !== null ? `${views.toLocaleString('hu-HU')}` : '...'}
        </span>
      </div>
    </div>
  );
}
