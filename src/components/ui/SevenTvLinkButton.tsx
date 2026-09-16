"use client";

import React from "react";

export function SevenTvLinkButton() {
  return (
    <a
      href="https://7tv.app/emote-sets/01M16KPPYC70JDYZJ283SN8N89"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed top-6 right-6 z-50 hidden md:flex items-center justify-center p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm shadow-lg overflow-hidden animate-button-in"
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
