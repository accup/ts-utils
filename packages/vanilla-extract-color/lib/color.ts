export interface OpaqueColor {
  r: number;
  g: number;
  b: number;
}

const RE_HEX = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

export function opaqueColorFromHex(hex: string): OpaqueColor {
  const match = hex.match(RE_HEX);
  if (match == null) {
    throw new Error(`Invalid hex color representation`);
  }

  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}
