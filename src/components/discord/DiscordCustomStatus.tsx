"use client";

import { useEffect, useState, useRef } from "react";
import { useLanyard } from "@/hooks/useLanyard";

export function DiscordCustomStatus() {
  const data = useLanyard();
  const [height, setHeight] = useState<number | "auto">(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight((entry.target as HTMLElement).offsetHeight);
      }
    });

    resizeObserver.observe(contentRef.current);
    setHeight(contentRef.current.offsetHeight);

    return () => resizeObserver.disconnect();
  }, []);

  const customStatusActivity = data?.activities?.find((a: any) => a.type === 4);
  const isVisible = !!customStatusActivity;

  // Custom Status details
  const text = customStatusActivity?.state;
  const emoji = customStatusActivity?.emoji;

  let emojiElement = null;
  if (emoji) {
    if (emoji.id) {
      // Custom Discord Emoji
      const extension = emoji.animated ? "gif" : "webp";
      emojiElement = (
        <img
          src={`https://cdn.discordapp.com/emojis/${emoji.id}.${extension}?size=44`}
          alt={emoji.name}
          className="w-5 h-5 object-contain inline-block drop-shadow-sm"
        />
      );
    } else {
      // Unicode Emoji
      emojiElement = <span>{emoji.name}</span>;
    }
  }

  return (
    <div
      className="w-full flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
      style={{
        height: isVisible ? (height ? `${height}px` : "auto") : "0px",
        opacity: isVisible ? 1 : 0,
        marginTop: isVisible ? "0.25rem" : "0",
        paddingTop: isVisible ? "10px" : "0",
        paddingBottom: isVisible ? "15px" : "0"
      }}
    >
      <div ref={contentRef} className="flex items-center justify-center gap-2 text-[15px] leading-normal font-medium text-text-muted animate-fade py-1">
        {emojiElement}
        {text && <span>{text}</span>}
      </div>
    </div>
  );
}
