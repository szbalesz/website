# SzBalesz Personal Portfolio

Személyes profiloldal, amely egy helyen gyűjti össze a közösségi média hivatkozásokat, kiegészítve valós idejű Discord és 7TV adatokkal, interaktív elemekkel és prémium dizájnnal.

## Funkciók

- **7TV Integráció (GraphQL API)**
  - A rendszer egyetlen kérésből lekéri a 7TV profil összes adatát (Kijelző név, egyedi animált név stílusok/grádiensek, profil jelvények).
  - **Dinamikus Social gombok:** A Twitch, Kick és Discord gombok automatikusan a 7TV-hez csatolt fiókok alapján jelennek meg, mindig a legfrissebb felhasználónevekkel.
  - Interaktív, hulló 7TV emote-ok a háttérben, amelyekre rá lehet kattintani (Emote Collector).
- **Valós idejű Discord integráció (Lanyard API)**
  - Jelenlegi Discord státusz (Online, DND, Idle, Offline) és egyéni státusz üzenet (Custom Status).
  - Éppen hallgatott Spotify szám, futtatott játék vagy szerkesztőprogram (Rich Presence) megjelenítése progress bar-ral és borítóképpel.
  - Discord Nameplate (kártya videó háttér) betöltése a Discord gombhoz.
- **UI & Megjelenés**
  - "Glassmorphism" stílusú, áttetsző 3D kártya dizájn dinamikus animációkkal.
  - Háttérvideó (`appear.mp4`), interaktív csillagmező (Starfield) és Party Mode overlay funkciók (felhasználó által kapcsolható).
  - Közösségi platform linkek az adott márka eredeti arculati színeivel.
- **Látogatószámláló és Statisztikák**
  - Redis-alapú (Upstash) számláló a lapletöltések (View Counter) és az összegyűjtött/kattintott emote-ok regisztrálására.

## Technológiai háttér

- **Keretrendszer:** Next.js (App Router, React 18)
- **Stílus:** Tailwind CSS
- **UI Komponensek:** shadcn/ui (Radix UI)
- **Adatbázis / Cache:** Upstash Redis
- **API kapcsolatok:** Lanyard (Discord REST & WebSockets), 7TV GraphQL & REST API

## Lokális futtatás

A futtatáshoz Node.js szükséges.

```bash
npm install
npm run dev
```

Környezeti változók (`.env.local`):
```env
# Upstash Redis adatbázis elérése a statisztikákhoz
REDIS_URL="redis://<upstash-redis-url>"

# 7TV Felhasználói ID (Ebből szedi ki a rendszer a Discord, Twitch, Kick kapcsolatokat is!)
NEXT_PUBLIC_SEVENTV_USER_ID="<7tv_user_id>"

# Opcionális: Discord animált banner fallback (ha van, de a 7TV ID alapján próbálja ezt is automatikusan kikeresni)
NEXT_PUBLIC_DISCORD_BANNER_URL="https://cdn.discordapp.com/banners/..."
```
*(Megjegyzés: A Discord User ID konfigurálása már nem szükséges, mivel a rendszer ezt is a 7TV összekapcsolt fiókjai alapján nyeri ki automatikusan!)*

## Deployment

A projekt Vercel-re optimalizált. A `.env.local` fájl tartalmát a Vercel környezeti változói (Environment Variables) közé kell felvenni. Ezt követően minden `main` ágra történő git push automatikusan frissíti a weboldalt.
