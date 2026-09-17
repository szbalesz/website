"use client";

import React from "react";
import { useSavedEmotes } from "@/components/SavedEmotesProvider";
import { useControls } from "@/components/ControlsProvider";

export function SevenTvLinkButton() {
  const { comboCount } = useSavedEmotes();
  const { cardVisible } = useControls();
  return (
    <a
      href="https://7tv.app/emote-sets/01M16KPPYC70JDYZJ283SN8N89"
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed top-6 right-6 z-50 hidden md:flex items-center justify-center p-2 rounded-full bg-black/40 border border-white/10 transition-all backdrop-blur-sm shadow-lg overflow-hidden animate-button-in ${
        !cardVisible && comboCount > 0 
          ? 'opacity-30 pointer-events-none cursor-not-allowed'
          : 'hover:bg-black/60 text-white/70 hover:text-white cursor-pointer'
      }`}
      style={{ animationDelay: '2.2s' }}
    >
      <span className=" max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:px-2 group-hover:mr-2 transition-all duration-500 ease-in-out text-sm font-medium">
        7TV emoteok
      </span>
      <img
        src="https://cdn.7tv.app/user/01FRG0ZGSR00084PQ73P1BYDX8/profile-picture/01JNE6NR70PTHTBD0WNEH8WMV3/4x.gif"
        alt="7TV Emotes"
        className="w-7 h-7 rounded-full object-cover"
        draggable={false}
      />
    </a>
  );
}
