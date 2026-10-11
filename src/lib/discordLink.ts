export const openExternalLink = async (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    // Ellenőrizzük, hogy iframe-ben (Discord Activity-ben) fut-e az oldal
    if (typeof window !== 'undefined' && window.parent !== window) {
        e.preventDefault(); // Megakadályozzuk a normál böngészős megnyitást (ami hibát dobna)
        try {
            // Csak akkor töltjük be a Discord SDK-t, ha tényleg szükség van rá
            const { DiscordSDK } = await import('@discord/embedded-app-sdk');

            const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
            if (!clientId) {
                console.error("Hiányzik a NEXT_PUBLIC_DISCORD_CLIENT_ID környezeti változó!");
                return;
            }

            const discordSdk = new DiscordSDK(clientId);
            await discordSdk.ready(); // Megvárjuk, amíg felépül a kapcsolat a Discorddal

            // Megkérjük a Discordot, hogy nyissa meg a külső linket
            await discordSdk.commands.openExternalLink({ url });
        } catch (err) {
            console.error("Discord SDK hiba a link megnyitásakor:", err);
        }
    }
    // Ha sima böngészőben vagyunk, a kód nem csinál semmit, és a normál <a target="_blank"> teszi a dolgát!
};