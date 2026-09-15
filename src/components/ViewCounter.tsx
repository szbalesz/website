'use client';

import { useEffect, useState, useRef } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex cursor-default" />}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] text-[#a855f7] hover:scale-110 transition-transform" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
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
