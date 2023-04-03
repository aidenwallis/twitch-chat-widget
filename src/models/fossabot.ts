export interface CachedBadges {
  data: BadgeSet[];
}

export interface BadgeSet {
  id: string;
  versions: BadgeVersion[];
}

export interface BadgeVersion {
  id: string;
  title: TextNode[];
  description: TextNode[];
  asset_1x: ImageNode;
}

export interface ImageNode {
  alt?: string;
  url?: string;
}

export interface TextNode {
  text: string;
}

export type BadgeMaps = Record<string, Record<string, BadgeVersion>>;

export function constructMapping(data: CachedBadges) {
  return (data?.data || []).reduce((acc, cur) => {
    acc[cur.id] = (cur.versions || []).reduce((acc, cur) => {
      acc[cur.id] = cur;
      return acc;
    }, {} as Record<string, BadgeVersion>);
    return acc;
  }, {} as Record<string, Record<string, BadgeVersion>>);
}
