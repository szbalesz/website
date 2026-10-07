export const EMOTE_SETS = {
  halloween: "01M3Z3XYF66CVX02JR558W4QJC",
  christmas: "01M3Z40957PMTQQ4HGQH7VJ537",
  default:   "01M3Z4M6QMRCMWBPWSCMJG4XVV",
} as const;

export function getSeasonalEmoteSetId(): string {
  const month = new Date().getMonth() + 1; // 1-12
  if (month === 10 || month === 11) return EMOTE_SETS.halloween;
  if (month === 12) return EMOTE_SETS.christmas;
  return EMOTE_SETS.default;
}

export function getSeasonalEmoteSetUrl(): string {
  return `https://7tv.app/emote-sets/${getSeasonalEmoteSetId()}`;
}
