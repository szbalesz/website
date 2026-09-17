import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const interFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const designerFont = localFont({
  src: "../../public/fonts/Designer.otf",
  variable: "--font-designer",
  display: "swap",
});

import { get7TvConnections } from "@/lib/7tv";

export async function generateMetadata(): Promise<Metadata> {
  let titleText = "SZBALESZ | SOCIALS";
  try {
    const { seventvDisplayName } = await get7TvConnections();
    if (seventvDisplayName) {
      titleText = `${seventvDisplayName.toUpperCase()} | SOCIALS`;
    }
  } catch (e) {
    console.error("Failed to fetch 7TV username for title", e);
  }

  return {
    title: titleText,
    description: `${titleText} – közösségi média és elérhetőségek.`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${designerFont.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-black text-white"
        suppressHydrationWarning
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
