"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export function BadgeTooltip({
  icon,
  title,
  subtitle,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  color: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        render={<span className="inline-flex cursor-default outline-none touch-manipulation" />}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onBlur={() => setOpen(false)}
      >
        <div
          className="flex items-center justify-center h-[22px] w-[22px] hover:scale-110 transition-transform [&>svg]:w-full [&>svg]:h-full"
          style={{ color: color }}
        >
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-bg-primary text-text-primary border-border">
        <div className="flex flex-col items-center gap-0.5 text-center">
          <span className="whitespace-nowrap text-xs font-bold" style={{ color: color }}>
            {title}
          </span>
          {subtitle && (
            <span className="block w-max max-w-[250px] text-[11px] leading-tight text-text-muted">
              {subtitle}
            </span>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
