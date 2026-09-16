# SzBalesz Personal Portfolio

Személyes profiloldal, amely egy helyen gyűjti össze a közösségi média hivatkozásokat, kiegészítve valós idejű Discord és 7TV adatokkal.

## Funkciók

- **Valós idejű Discord integráció (Lanyard API)**
  - Jelenlegi Discord státusz (Online, DND, Idle, Offline) és egyéni státusz üzenet (Custom Status).
  - Éppen hallgatott Spotify szám vagy futtatott játék megjelenítése.
  - Felhasználói nameplate videó és animált banner betöltése profilkép gyanánt.
- **7TV integráció**
  - Globális profilnév és profil jelvények (badges) automatikus lekérése.
- **UI & Megjelenés**
  - Közösségi platform linkek az adott márka eredeti arculati színeivel.
  - "Glassmorphism" stílusú, áttetsző kártya dizájn.
  - Egyszer lejátszódó, háttérbe simuló videó (`appear.mp4`).
- **Látogatószámláló**
  - Redis-alapú (Upstash) számláló a lapletöltések regisztrálására.

## Technológiai háttér

- **Keretrendszer:** Next.js (App Router, React 18)
- **Stílus:** Tailwind CSS
- **UI Komponensek:** shadcn/ui (Radix UI)
- **Adatbázis / Cache:** Upstash Redis
- **API kapcsolatok:** Lanyard (Discord WebSockets), 7TV GraphQL

## Lokális futtatás

A futtatáshoz Node.js szükséges.

```bash
npm install
npm run dev
```

Környezeti változók (.env.local):
```env
REDIS_URL="redis://<upstash-redis-url>"
NEXT_PUBLIC_DISCORD_USER_ID="<discord_user_id>"
NEXT_PUBLIC_DISCORD_BANNER_URL="https://..."
NEXT_PUBLIC_DISCORD_BADGE_URL="https://..."
```

## Deployment

A projekt Vercel-re optimalizált. A `.env.local` fájl tartalmát a Vercel környezeti változói (Environment Variables) közé kell felvenni. Ezt követően minden `main` ágra történő git push automatikusan frissíti a weboldalt.
