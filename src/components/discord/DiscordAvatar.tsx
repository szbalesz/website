"use client";

import { useState } from "react";
import { useLanyard } from "@/hooks/useLanyard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DiscordAvatar({ discordId }: { discordId: string | null }) {
  const data = useLanyard();
  const [isHovered, setIsHovered] = useState(false);

  const status = data?.discord_status || "offline";
  const user = data?.discord_user;
  
  const getStatusConfig = () => {
    switch (status) {
      case "online": return { color: "#23a559", text: "Online" };
      case "idle": return { color: "#f0b232", text: "Távollévő" };
      case "dnd": return { color: "#f23f43", text: "Ne zavarj" };
      case "offline":
      default: return { color: "#80848e", text: "Láthatatlan / Offline" };
    }
  };

  const { color, text } = getStatusConfig();

  // Avatar and Decoration fallback
  const fallbackAvatar = discordId ? `https://cdn.discordapp.com/avatars/${discordId}/a_a0b61953e1eaff386c8e1bd2a41285d3.gif?size=512` : "";
  const fallbackDecoration = "https://cdn.discordapp.com/avatar-decoration-presets/a_1a9bd997a5cfdab034f6d512ed494596.png?size=160&passthrough=true";

  const getAvatarUrl = () => {
    if (!user?.avatar) return fallbackAvatar;
    const isGif = user.avatar.startsWith("a_");
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${isGif ? "gif" : "png"}?size=512`;
  };

  const getDecorationUrl = () => {
    if (!user?.avatar_decoration_data) {
      // If there's explicitly no decoration data from the API but we have user data, it means they took it off.
      // But if we don't have user data at all yet, use fallback.
      return user ? null : fallbackDecoration;
    }
    return `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=160&passthrough=true`;
  };

  const avatarUrl = getAvatarUrl();
  const decorationUrl = getDecorationUrl();

  return (
    <div className="relative flex-shrink-0" style={{ width: '96px', height: '96px' }}>
      <Avatar className="w-24 h-24 border-0">
        <AvatarImage src={avatarUrl} className="object-cover" />
        <AvatarFallback>SZ</AvatarFallback>
      </Avatar>
      
      {decorationUrl && (
        <img 
          src={decorationUrl} 
          alt="" 
          className="pointer-events-none absolute" 
          style={{ width: '115px', height: '115px', maxWidth: 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maskImage: 'radial-gradient(circle at 91.1px 91.1px, transparent 20px, black 21px)', WebkitMaskImage: 'radial-gradient(circle at 91.1px 91.1px, transparent 20px, black 21px)' }} 
        />
      )}

      <Tooltip>
        <TooltipTrigger render={<span className="absolute outline-none" style={{ left: '60.599999999999994px', top: '60.599999999999994px', width: '42px', height: '42px', zIndex: 10 }} />}>
          <div className="group w-full h-full flex items-center justify-center rounded-full bg-black/40 border border-white/10 backdrop-blur-sm shadow-lg">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-[75%] h-[75%] block transition-colors duration-200 ease-in-out" style={{ color }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.03 9.78a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6-6Z"></path>
              <path d="m14.136 1.2 1.375 1.01c.274.201.593.333.929.384l1.687.259a3.61 3.61 0 0 1 3.02 3.021l.259 1.686c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 0 1 0 4.272l-1.01 1.375a2.106 2.106 0 0 0-.384.929l-.259 1.687a3.61 3.61 0 0 1-3.021 3.02l-1.686.259a2.106 2.106 0 0 0-.929.384l-1.375 1.01a3.61 3.61 0 0 1-4.272 0l-1.375-1.01a2.106 2.106 0 0 0-.929-.384l-1.687-.259a3.61 3.61 0 0 1-3.02-3.021l-.259-1.686a2.117 2.117 0 0 0-.384-.929L1.2 14.136a3.61 3.61 0 0 1 0-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.687a3.61 3.61 0 0 1 3.021-3.02l1.686-.259c.336-.051.655-.183.929-.384L9.864 1.2a3.61 3.61 0 0 1 4.272 0Zm-3.384 1.209-1.375 1.01a3.614 3.614 0 0 1-1.59.658l-1.686.258a2.111 2.111 0 0 0-1.766 1.766l-.258 1.686a3.61 3.61 0 0 1-.658 1.589l-1.01 1.376a2.11 2.11 0 0 0 0 2.496l1.01 1.375c.344.469.57 1.015.658 1.59l.258 1.686c.14.911.855 1.626 1.766 1.766l1.686.258a3.61 3.61 0 0 1 1.589.658l1.376 1.01a2.11 2.11 0 0 0 2.496 0l1.375-1.01a3.613 3.613 0 0 1 1.59-.657l1.686-.26a2.11 2.11 0 0 0 1.766-1.765l.258-1.686a3.61 3.61 0 0 1 .658-1.589l1.01-1.376a2.11 2.11 0 0 0 0-2.496l-1.01-1.375a3.613 3.613 0 0 1-.657-1.59l-.26-1.686a2.11 2.11 0 0 0-1.765-1.766l-1.686-.258a3.61 3.61 0 0 1-1.589-.658l-1.376-1.01a2.11 2.11 0 0 0-2.496 0Z"></path>
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-bg-primary text-text-primary border-border">
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span className="whitespace-nowrap text-xs font-bold transition-colors" style={{ color }}>{text}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
