import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#f59e0b",
};

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
    metadataBase: new URL('https://szbalesz.com'),
    title: titleText,
    description: `${titleText} – közösségi média és elérhetőségek.`,
    icons: {
      icon: '/icon.jpg',
    },
    openGraph: {
      title: titleText,
      description: `${titleText} – közösségi média és elérhetőségek.`,
      url: 'https://szbalesz.com',
      siteName: titleText,
      images: [
        {
          url: '/icon.jpg', 
          width: 800,
          height: 800,
          alt: `${titleText} Icon`,
        },
      ],
      locale: 'hu_HU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: `${titleText} – közösségi média és elérhetőségek.`,
      images: ['/icon.jpg'],
    },
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
