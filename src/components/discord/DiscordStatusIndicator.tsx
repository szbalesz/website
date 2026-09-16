"use client";

import { useEffect, useState } from "react";
import { useLanyard } from "@/hooks/useLanyard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DiscordStatusIndicator() {
  const data = useLanyard();
  const [isHovered, setIsHovered] = useState(false);
  const status = data?.discord_status ?? "offline";

  const getStatusConfig = () => {
    switch (status) {
      case "online":
        return { color: "#23a559", text: "Online" };
      case "idle":
        return { color: "#f0b232", text: "Távollévő" };
      case "dnd":
        return { color: "#f23f43", text: "Ne zavarj" };
      case "offline":
      default:
        return { color: "#80848e", text: "Láthatatlan / Offline" };
    }
  };

  const { color, text } = getStatusConfig();

  return (
    <Tooltip>
      <TooltipTrigger render={<span className="absolute outline-none" style={{ left: '60.599999999999994px', top: '60.599999999999994px', width: '42px', height: '42px', zIndex: 10 }} />}>
        <div className="group w-full h-full">
          <svg width="42" height="42" viewBox="0 0 42 42" style={{ display: 'block' }}>
            <circle fill="var(--color-bg-card)" cx="21" cy="21" r="21"></circle>
            <circle fill="black" cx="21" cy="21" r="16.905" opacity="0.45"></circle>
            <foreignObject x="4.094999999999999" y="4.094999999999999" width="33.81" height="33.81">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-full h-full block transition-colors duration-200 ease-in-out" style={{ color }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.03 9.78a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6-6Z"></path>
                <path d="m14.136 1.2 1.375 1.01c.274.201.593.333.929.384l1.687.259a3.61 3.61 0 0 1 3.02 3.021l.259 1.686c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 0 1 0 4.272l-1.01 1.375a2.106 2.106 0 0 0-.384.929l-.259 1.687a3.61 3.61 0 0 1-3.021 3.02l-1.686.259a2.106 2.106 0 0 0-.929.384l-1.375 1.01a3.61 3.61 0 0 1-4.272 0l-1.375-1.01a2.106 2.106 0 0 0-.929-.384l-1.687-.259a3.61 3.61 0 0 1-3.02-3.021l-.259-1.686a2.117 2.117 0 0 0-.384-.929L1.2 14.136a3.61 3.61 0 0 1 0-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.687a3.61 3.61 0 0 1 3.021-3.02l1.686-.259c.336-.051.655-.183.929-.384L9.864 1.2a3.61 3.61 0 0 1 4.272 0Zm-3.384 1.209-1.375 1.01a3.614 3.614 0 0 1-1.59.658l-1.686.258a2.111 2.111 0 0 0-1.766 1.766l-.258 1.686a3.61 3.61 0 0 1-.658 1.589l-1.01 1.376a2.11 2.11 0 0 0 0 2.496l1.01 1.375c.344.469.57 1.015.658 1.59l.258 1.686c.14.911.855 1.626 1.766 1.766l1.686.258a3.61 3.61 0 0 1 1.589.658l1.376 1.01a2.11 2.11 0 0 0 2.496 0l1.375-1.01a3.613 3.613 0 0 1 1.59-.657l1.686-.26a2.11 2.11 0 0 0 1.766-1.765l.258-1.686a3.61 3.61 0 0 1 .658-1.589l1.01-1.376a2.11 2.11 0 0 0 0-2.496l-1.01-1.375a3.613 3.613 0 0 1-.657-1.59l-.26-1.686a2.11 2.11 0 0 0-1.765-1.766l-1.686-.258a3.61 3.61 0 0 1-1.589-.658l-1.376-1.01a2.11 2.11 0 0 0-2.496 0Z"></path>
              </svg>
            </foreignObject>
          </svg>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-bg-primary text-text-primary border-border">
        <div className="flex flex-col items-center gap-0.5 text-center">
          <span className="whitespace-nowrap text-xs font-bold transition-colors" style={{ color }}>{text}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
