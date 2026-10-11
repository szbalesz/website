// Ebbe a változóba mentjük el a már felépített kapcsolatot
let discordSdkInstance: any = null;

export const openExternalLink = async (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    // Ellenőrizzük, hogy iframe-ben (Discord Activity-ben) fut-e az oldal
    if (typeof window !== 'undefined' && window.parent !== window) {
        e.preventDefault(); // Megakadályozzuk a normál böngészős megnyitást (ami hibát dobna)

        try {
            // Csak akkor építjük fel a kapcsolatot, ha még nem tettük meg korábban
            if (!discordSdkInstance) {
                const { DiscordSDK } = await import('@discord/embedded-app-sdk');

                const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
                if (!clientId) {
                    console.error("Hiányzik a NEXT_PUBLIC_DISCORD_CLIENT_ID környezeti változó!");
                    return;
                }

                discordSdkInstance = new DiscordSDK(clientId);
                await discordSdkInstance.ready(); // Kézfogás a Discorddal
            }

            // Megkérjük a Discordot, hogy nyissa meg a külső linket a MÁR MEGLÉVŐ kapcsolattal
            await discordSdkInstance.commands.openExternalLink({ url });
        } catch (err) {
            console.error("Discord SDK hiba a link megnyitásakor:", err);
        }
    }
    // Ha sima böngészőben vagyunk, a kód nem csinál semmit, és a normál <a target="_blank"> teszi a dolgát!
};