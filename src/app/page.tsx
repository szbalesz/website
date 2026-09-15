import { BackgroundVideo } from "@/components/BackgroundVideo";
import { ViewCounter } from "@/components/ViewCounter";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center text-text-primary antialiased relative">
      <BackgroundVideo />
      <div className="mx-auto w-full max-w-2xl px-4 z-10 relative">
        <Card className="rounded-xl shadow-[0_0_20px_2px_#13141666,0_0_60px_10px_#13141633] animate-card transition-transform duration-300 ease-out hover:scale-105 p-0" style={{ animationDelay: '2.2s' }}>
          <div className="animate-card-inner w-full">
            <div className="relative rounded-xl overflow-hidden w-full">

              {/* BANNER */}
              <div
                className="relative h-25 overflow-hidden rounded-t-xl md:h-40"
                style={{
                  backgroundImage: "url('https://cdn.discordapp.com/banners/305732881144086528/a_df5e94147df1f27e6aaf29a72e1f710d.gif?size=4096')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* CARD BODY */}
              <div className="relative px-6 pb-6 pt-16 rounded-b-xl border border-border">

                {/* BADGES */}
                <div className="absolute right-6 top-4 flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger render={<span className="inline-flex cursor-default" />}>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] text-[#f59e0b] hover:scale-110 transition-transform" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2 1 2 1" /><path d="M2 21h20" /><path d="M7 8v3" /><path d="M12 8v3" /><path d="M17 8v3" /><path d="M7 4h.01" /><path d="M12 4h.01" /><path d="M17 4h.01" /></svg>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-bg-primary text-text-primary border-border">
                      <div className="flex flex-col items-center gap-0.5 text-center">
                        <span className="whitespace-nowrap text-xs font-bold text-[#f59e0b]">Születésnap</span>
                        <span className="block w-max max-w-[250px] text-[11px] leading-tight text-text-muted">2005. 08. 20.</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger render={<span className="inline-flex cursor-default" />}>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] text-[#3b82f6] hover:scale-110 transition-transform" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-bg-primary text-text-primary border-border">
                      <div className="flex flex-col items-center gap-0.5 text-center">
                        <span className="whitespace-nowrap text-xs font-bold text-[#3b82f6]">Egyetemi hallgató</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <ViewCounter />
                </div>

                {/* AVATAR OVERLAY */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="relative flex-shrink-0" style={{ width: '96px', height: '96px' }}>
                    <Avatar className="w-24 h-24 border-0">
                      <AvatarImage src="https://cdn.discordapp.com/avatars/305732881144086528/a_a0b61953e1eaff386c8e1bd2a41285d3.gif?size=512" className="object-cover" />
                      <AvatarFallback>SZ</AvatarFallback>
                    </Avatar>
                    <img src="https://cdn.discordapp.com/avatar-decoration-presets/a_1a9bd997a5cfdab034f6d512ed494596.png?size=160&passthrough=true" alt="" className="pointer-events-none absolute" style={{ width: '115px', height: '115px', maxWidth: 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maskImage: 'radial-gradient(circle at 91.1px 91.1px, transparent 20px, black 21px)', WebkitMaskImage: 'radial-gradient(circle at 91.1px 91.1px, transparent 20px, black 21px)' }} />
                    <div className="group absolute" style={{ left: '60.599999999999994px', top: '60.599999999999994px', width: '42px', height: '42px' }}>
                      <svg width="42" height="42" viewBox="0 0 42 42" style={{ display: 'block' }}>
                        <circle fill="var(--color-bg-card)" cx="21" cy="21" r="21"></circle>
                        <circle fill="black" cx="21" cy="21" r="16.905" opacity="0.45"></circle>
                        <foreignObject x="4.094999999999999" y="4.094999999999999" width="33.81" height="33.81">
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-[#f23f43] w-full h-full block transition-colors duration-200 ease-in-out" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.03 9.78a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6-6Z"></path><path d="m14.136 1.2 1.375 1.01c.274.201.593.333.929.384l1.687.259a3.61 3.61 0 0 1 3.02 3.021l.259 1.686c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 0 1 0 4.272l-1.01 1.375a2.106 2.106 0 0 0-.384.929l-.259 1.687a3.61 3.61 0 0 1-3.021 3.02l-1.686.259a2.106 2.106 0 0 0-.929.384l-1.375 1.01a3.61 3.61 0 0 1-4.272 0l-1.375-1.01a2.106 2.106 0 0 0-.929-.384l-1.687-.259a3.61 3.61 0 0 1-3.02-3.021l-.259-1.686a2.117 2.117 0 0 0-.384-.929L1.2 14.136a3.61 3.61 0 0 1 0-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.687a3.61 3.61 0 0 1 3.021-3.02l1.686-.259c.336-.051.655-.183.929-.384L9.864 1.2a3.61 3.61 0 0 1 4.272 0Zm-3.384 1.209-1.375 1.01a3.614 3.614 0 0 1-1.59.658l-1.686.258a2.111 2.111 0 0 0-1.766 1.766l-.258 1.686a3.61 3.61 0 0 1-.658 1.589l-1.01 1.376a2.11 2.11 0 0 0 0 2.496l1.01 1.375c.344.469.57 1.015.658 1.59l.258 1.686c.14.911.855 1.626 1.766 1.766l1.686.258a3.61 3.61 0 0 1 1.589.658l1.376 1.01a2.11 2.11 0 0 0 2.496 0l1.375-1.01a3.613 3.613 0 0 1 1.59-.657l1.686-.26a2.11 2.11 0 0 0 1.766-1.765l.258-1.686a3.61 3.61 0 0 1 .658-1.589l1.01-1.376a2.11 2.11 0 0 0 0-2.496l-1.01-1.375a3.613 3.613 0 0 1-.657-1.59l-.26-1.686a2.11 2.11 0 0 0-1.765-1.766l-1.686-.258a3.61 3.61 0 0 1-1.589-.658l-1.376-1.01a2.11 2.11 0 0 0-2.496 0Z"></path></svg>
                        </foreignObject>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* USER INFO */}
                <div className="mb-4 text-center mt-2">
                  <div className="flex items-center justify-center gap-2 ">
                    <span className="text-2xl font-bold text-text-primary font-designer tracking-wider transition-transform duration-300 ease-out hover:scale-102 cursor-default">SZBALESZ</span>
                  </div>
                </div>

                <div className="mb-4 space-y-3"></div>

                {/* STATS */}
                {/* STATS */}

                {/* CONNECTIONS */}
                <div className="text-center justify-center mt-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">


                    {/* Discord */}
                    <a href="https://discordapp.com/users/305732881144086528" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.1s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#5865F215', borderColor: '#5865F230' }}>
                        <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="#5865F2" className="flex-shrink-0"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c0,0,.04-.06.09-.09C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"></path></svg>
                        <div className="min-w-0 text-left">
                          <span className="font-medium text-text-primary">SzBalesz</span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">Discord</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5865F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>

                    {/* Twitch */}
                    <a href="https://twitch.tv/szbalesz" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.2s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#9146FF15', borderColor: '#9146FF30' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#9146FF" className="flex-shrink-0"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"></path></svg>
                        <div className="min-w-0 text-left" dir="ltr">
                          <span className="font-medium" style={{ opacity: 1, backgroundImage: 'linear-gradient(0deg, rgb(255, 200, 82) 0%, rgb(254, 239, 144) 15%, rgb(254, 213, 124) 30%, rgb(255, 255, 255) 60%)', backgroundSize: '100% 100%', backgroundRepeat: 'unset', filter: 'drop-shadow(rgb(255, 162, 0) 0px 0px 4px)', WebkitBackgroundClip: 'text', color: 'transparent' }}>سباليس<span className="hidden sm:inline text-text-primary" style={{ WebkitTextFillColor: 'initial' }}> (szbalesz)</span></span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">Twitch</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9146FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a href="https://instagram.com/szbalesz" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.3s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#E4405F15', borderColor: '#E4405F30' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#E4405F" className="flex-shrink-0"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path></svg>
                        <div className="min-w-0 text-left">
                          <span className="font-medium text-text-primary">szbalesz</span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">Instagram</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>

                    {/* YouTube */}
                    <a href="https://youtube.com/@szbalesz" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.4s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#FF000015', borderColor: '#FF000030' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000" className="flex-shrink-0"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
                        <div className="min-w-0 text-left">
                          <span className="font-medium text-text-primary">szbalesz</span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">YouTube</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>

                    {/* Kick */}
                    <a href="https://kick.com/szbalesz" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.5s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#53fc1815', borderColor: '#53fc1830' }}>
                        <img src="/logos/kick.webp" alt="Kick" width="16" height="16" className="flex-shrink-0" style={{ objectFit: 'contain' }} />
                        <div className="min-w-0 text-left">
                          <span className="font-medium" style={{ opacity: 1, backgroundImage: 'linear-gradient(0deg, rgb(255, 200, 82) 0%, rgb(254, 239, 144) 15%, rgb(254, 213, 124) 30%, rgb(255, 255, 255) 60%)', backgroundSize: '100% 100%', backgroundRepeat: 'unset', filter: 'drop-shadow(rgb(255, 162, 0) 0px 0px 4px)', WebkitBackgroundClip: 'text', color: 'transparent' }}>SZBALESZ</span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">Kick</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#53fc18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>

                    {/* Spotify */}
                    <a href="https://open.spotify.com/user/SzBalesz" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.6s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#1DB95415', borderColor: '#1DB95430' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954" className="flex-shrink-0"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>
                        <div className="min-w-0 text-left">
                          <span className="font-medium text-text-primary">SzBalesz</span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">Spotify</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>


                    {/* GitHub */}
                    <a href="https://github.com/szbalesz" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.7s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#FFFFFF15', borderColor: '#FFFFFF30' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" className="flex-shrink-0"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                        <div className="min-w-0 text-left">
                          <span className="font-medium text-text-primary">szbalesz</span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">GitHub</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>

                    {/* TikTok */}
                    <a href="https://tiktok.com/@notszbalesz" target="_blank" rel="noopener noreferrer" className="block w-full hover:opacity-80 animate-card transition-opacity" style={{ animationDelay: '3.8s' }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" style={{ backgroundColor: '#ffffff15', borderColor: '#ffffff30' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" className="flex-shrink-0"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
                        <div className="min-w-0 text-left">
                          <span className="font-medium text-text-primary">notszbalesz</span>
                          <span className="ml-1.5 text-xs text-text-muted font-normal">TikTok</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </a>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
