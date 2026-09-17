"use client";

import { useEffect, useState, useRef } from "react";
import { useControls } from "@/components/ControlsProvider";

interface AnimatedBannerProps {
  bannerUrl: string;
}

export function AnimatedBanner({ bannerUrl }: AnimatedBannerProps) {
  const { cardVisible, isVideoFinished } = useControls();
  const [blob, setBlob] = useState<Blob | null>(null);
  
  // Kezdetben a statikus, nem mozgó változatot töltsük be, vagy üreset, amíg a kártya rejtve van.
  // Mivel a discord banner alapból egy sima gif, használhatjuk az eredeti URL-t fallbacknek.
  const [currentUrl, setCurrentUrl] = useState<string>(bannerUrl);
  const firstRenderRef = useRef(true);

  // 1. Töltsük le a GIF-et Blobként, hogy gyorsítótárazzuk és ne kelljen újra letölteni.
  useEffect(() => {
    fetch(bannerUrl)
      .then((res) => res.blob())
      .then((b) => setBlob(b))
      .catch((e) => console.error("Failed to load banner blob", e));
  }, [bannerUrl]);

  // 2. Amikor a kártya megjelenik, generáljunk egy új object URL-t a Blobból,
  // ami arra kényszeríti a böngészőt, hogy a legelső frame-ről indítsa el a GIF-et!
  useEffect(() => {
    const playGif = () => {
      if (blob) {
        // Új URL készítése a memóriából = a GIF újraindul azonnal.
        setCurrentUrl(URL.createObjectURL(blob));
      } else {
        // Cache buster fallback, ha még nem töltött le a blob
        setCurrentUrl(`${bannerUrl}${bannerUrl.includes('?') ? '&' : '?'}t=${Date.now()}`);
      }
    };

    if (firstRenderRef.current) {
      if (isVideoFinished) {
        firstRenderRef.current = false;
        playGif();
      }
    } else {
      // Amikor a gombbal hozzuk elő, az azonnal indul, késleltetés nélkül!
      if (cardVisible) {
        playGif();
      }
    }
  }, [cardVisible, blob, bannerUrl, isVideoFinished]);

  return (
    <div
      className="relative h-25 overflow-hidden rounded-t-xl md:h-40"
      style={{
        backgroundImage: `url('${currentUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/60" />
    </div>
  );
}
