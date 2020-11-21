export interface TwitchAPIBadgeVersion {
  image_url_1x: string;
}

export interface TwitchAPIBadgeSet {
  versions: Record<string, TwitchAPIBadgeVersion>;
}

export interface TwitchAPIBadgeResponse {
  badge_sets: Record<string, TwitchAPIBadgeSet>;
}
