export async function get7TvConnections() {
  const seventvId = process.env.NEXT_PUBLIC_SEVENTV_USER_ID;
  if (!seventvId) return { seventvDisplayName: null, discordId: null, discordName: null, twitchName: null, twitchDisplayName: null, kickName: null, kickDisplayName: null, badge: null };
  
  const query = `
    query {
      user(id: "${seventvId}") {
        display_name
        username
        style {
          color
          paint {
            id
            color
            stops {
              at
              color
            }
            angle
            shape
            repeat
            image_url
            shadows {
              x_offset
              y_offset
              radius
              color
            }
          }
          badge {
            id
            name
            tooltip
            host {
              url
            }
          }
        }
        connections {
          id
          platform
          username
          display_name
        }
      }
    }
  `;

  try {
    const res = await fetch('https://7tv.io/v3/gql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 } // Frissüljön 60 másodpercenként
    });
    const json = await res.json();
    const data = json?.data?.user;
    if (!data) throw new Error("Failed to fetch 7tv user");

    const connections = data.connections || [];
    
    const discordConn = connections.find((c: any) => c.platform === "DISCORD");
    const twitchConn = connections.find((c: any) => c.platform === "TWITCH");
    const kickConn = connections.find((c: any) => c.platform === "KICK");
    
    return {
      seventvDisplayName: data.display_name || data.username || null,
      discordId: discordConn?.id || null,
      discordName: discordConn?.display_name || discordConn?.username || null,
      twitchName: twitchConn?.username || null,
      twitchDisplayName: twitchConn?.display_name || twitchConn?.username || null,
      kickName: kickConn?.username || null,
      kickDisplayName: kickConn?.display_name || kickConn?.username || null,
      badge: data.style?.badge || null,
      style: data.style || null
    };
  } catch (error) {
    console.error("7TV fetch error:", error);
    return { seventvDisplayName: null, discordId: null, discordName: null, twitchName: null, twitchDisplayName: null, kickName: null, kickDisplayName: null, badge: null, style: null };
  }
}
