import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const interFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const designerFont = localFont({
  src: "../../public/fonts/Designer.otf",
  variable: "--font-designer",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let titleText = "SZBALESZ";
  try {
    if (process.env.NEXT_PUBLIC_DISCORD_USER_ID) {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${process.env.NEXT_PUBLIC_DISCORD_USER_ID}`, {
        next: { revalidate: 3600 }
      });
      const data = await res.json();
      const discordUser = data?.data?.discord_user;
      if (discordUser) {
        titleText = (discordUser.global_name || discordUser.username).toUpperCase();
      }
    }
  } catch (e) {
    console.error("Failed to fetch Discord username for title", e);
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
      </body>
    </html>
  );
}
