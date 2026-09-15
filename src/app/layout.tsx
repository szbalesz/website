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

export const metadata: Metadata = {
  title: "SZBALESZ",
  description: "SZBALESZ – közösségi média és elérhetőségek.",
};

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
