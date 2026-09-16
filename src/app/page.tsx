import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { ViewCounter } from "@/components/ui/ViewCounter";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BadgeTooltip } from "@/components/ui/BadgeTooltip";

import { MobileViewRow } from "@/components/ui/ViewCounter";
import { LanyardProvider } from "@/hooks/useLanyard";
import { LanyardStatus } from "@/components/discord/LanyardStatus";
import { DiscordAvatar } from "@/components/discord/DiscordAvatar";
import { DiscordCustomStatus } from "@/components/discord/DiscordCustomStatus";
import { DiscordButton } from "@/components/discord/DiscordButton";
import { SevenTvName } from "@/components/seventv/SevenTvName";
import { SevenTvBadge } from "@/components/seventv/SevenTvBadge";
import { SocialButton } from "@/components/ui/SocialButton";
import { FloatingEmotes } from "@/components/ui/FloatingEmotes";
import { PartyOverlay } from "@/components/ui/PartyOverlay";
import { StarfieldOverlay } from "@/components/ui/StarfieldOverlay";
import { SevenTvLinkButton } from "@/components/ui/SevenTvLinkButton";
import { SavedEmotesProvider } from "@/components/SavedEmotesProvider";
import { SavedEmotesBadge } from "@/components/ui/SavedEmotesBadge";

export default async function Home() {
  let mainTitle = "SZBALESZ";
  try {
    if (process.env.NEXT_PUBLIC_DISCORD_USER_ID) {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${process.env.NEXT_PUBLIC_DISCORD_USER_ID}`, {
        next: { revalidate: 3600 }
      });
      const data = await res.json();
      const discordUser = data?.data?.discord_user;
      if (discordUser) {
        mainTitle = (discordUser.global_name || discordUser.username).toUpperCase();
      }
    }
  } catch (e) {
    console.error("Failed to fetch Discord username for page", e);
  }

  return (
    <LanyardProvider>
      <SavedEmotesProvider>
        <main className="flex min-h-[100dvh] flex-col items-center justify-center text-text-primary antialiased relative">
          <BackgroundVideo />
          <StarfieldOverlay />
          <PartyOverlay />
          <FloatingEmotes />
          <SevenTvLinkButton />
          <div className="mx-auto w-full max-w-2xl px-4 z-10 relative">
            <Card className="!bg-black/40 backdrop-blur-md !ring-white/10 rounded-xl shadow-[0_0_30px_5px_rgba(0,0,0,0.5)] animate-card transition-transform duration-300 ease-out p-0" style={{ animationDelay: '2.2s' }}>
              <div className="animate-card-inner w-full">
                <div className="relative rounded-xl overflow-hidden w-full">

                  {/* BANNER */}
                  <div
                    className="relative h-25 overflow-hidden rounded-t-xl md:h-40"
                    style={{
                      backgroundImage: `url('https://cdn.discordapp.com/banners/${process.env.NEXT_PUBLIC_DISCORD_USER_ID}/a_df5e94147df1f27e6aaf29a72e1f710d.gif?size=4096')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/60" />
                  </div>

                  {/* CARD BODY */}
                  <div className="relative px-6 pb-6 pt-16 rounded-b-xl border-t-0 border-x border-b border-white/5 bg-gradient-to-b from-black/60 to-transparent">

                    {/* BADGES (DESKTOP) */}
                    <div className="absolute right-6 top-4 hidden sm:flex items-center gap-1">

                      <BadgeTooltip
                        title="Születésnap"
                        subtitle="2005. 08. 20."
                        color="#f59e0b"
                        icon={<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2 1 2 1" /><path d="M2 21h20" /><path d="M7 8v3" /><path d="M12 8v3" /><path d="M17 8v3" /><path d="M7 4h.01" /><path d="M12 4h.01" /><path d="M17 4h.01" /></svg>}
                      />
                      <SevenTvBadge />
                      <SavedEmotesBadge />
                      <ViewCounter />
                    </div>

                    {/* AVATAR OVERLAY */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                      <DiscordAvatar />
                    </div>

                    {/* USER INFO */}
                    <div className="mb-4 text-center mt-2">
                      <div className="flex items-center justify-center gap-2 ">
                        <span className="text-2xl font-bold text-text-primary animate-text-glow-shine font-designer tracking-wider transition-transform duration-300 ease-out hover:scale-102 cursor-default">{mainTitle}</span>
                      </div>

                      <DiscordCustomStatus />
                    </div>

                    {/* MOBILE BADGES (LIST) */}
                    <div className="flex flex-col gap-2 mb-6 sm:hidden">

                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="flex items-center gap-3 px-3 py-2 w-full bg-black/20 rounded-md border border-white/5">
                          <div className="h-5 w-5 text-[#f59e0b] flex-shrink-0">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2 1 2 1" /><path d="M2 21h20" /><path d="M7 8v3" /><path d="M12 8v3" /><path d="M17 8v3" /><path d="M7 4h.01" /><path d="M12 4h.01" /><path d="M17 4h.01" /></svg>
                          </div>
                          <div className="flex flex-col items-start min-w-0">
                            <span className="text-sm font-bold text-[#f59e0b] truncate">Születésnap</span>
                            <span className="text-xs text-text-muted truncate">2005. 08. 20.</span>
                          </div>
                        </div>
                        <MobileViewRow />
                        <SavedEmotesBadge isMobile />
                        <SevenTvBadge isMobile />
                      </div>
                    </div>

                    {/* STATS */}
                    {/* STATS */}

                    {/* CONNECTIONS */}
                    <div className="text-center justify-center mt-4">
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">


                        {/* Discord */}
                        <DiscordButton />

                        {/* Twitch */}
                        <SocialButton
                          href="https://twitch.tv/szbalesz"
                          platform="Twitch"
                          username={<SevenTvName name="سباليس (szbalesz)" />}
                          icon={<svg viewBox="0 0 24 24" fill="#9146FF"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"></path></svg>}
                          color="#9146FF"
                          animationDelay="3.2s"
                        />

                        {/* Instagram */}
                        <SocialButton
                          href="https://instagram.com/szbalesz"
                          platform="Instagram"
                          username="szbalesz"
                          icon={<svg viewBox="0 0 24 24" fill="#E4405F"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path></svg>}
                          color="#E4405F"
                          animationDelay="3.3s"
                        />

                        {/* YouTube */}
                        <SocialButton
                          href="https://youtube.com/@szbalesz"
                          platform="YouTube"
                          username="szbalesz"
                          icon={<svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>}
                          color="#FF0000"
                          animationDelay="3.4s"
                        />

                        {/* Kick */}
                        <SocialButton
                          href="https://kick.com/szbalesz"
                          platform="Kick"
                          username={<SevenTvName name="SZBALESZ" />}
                          icon={<svg className="w-[14px] h-[14px]" viewBox="0 0 512 512" fill="#53fc18"><path d="M37 .036h164.448v113.621h54.71v-56.82h54.731V.036h164.448v170.777h-54.73v56.82h-54.711v56.8h54.71v56.82h54.73V512.03H310.89v-56.82h-54.73v-56.8h-54.711v113.62H37V.036z" /></svg>}
                          color="#53fc18"
                          animationDelay="3.5s"
                        />

                        {/* Spotify */}
                        <SocialButton
                          href="https://open.spotify.com/user/szbalesz"
                          platform="Spotify"
                          username="SzBalesz"
                          icon={<svg viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>}
                          color="#1DB954"
                          animationDelay="3.6s"
                        />

                        {/* GitHub */}
                        <SocialButton
                          href="https://github.com/szbalesz"
                          platform="GitHub"
                          username="szbalesz"
                          icon={<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>}
                          color="#FFFFFF"
                          animationDelay="3.7s"
                        />

                        {/* TikTok */}
                        <SocialButton
                          href="https://tiktok.com/@notszbalesz"
                          platform="TikTok"
                          username="notszbalesz"
                          icon={<svg viewBox="0 0 24 24" fill="#ffffff"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>}
                          color="#ffffff"
                          animationDelay="3.8s"
                        />


                      </div>
                    </div>

                    <LanyardStatus />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </SavedEmotesProvider>
    </LanyardProvider>
  );
}
