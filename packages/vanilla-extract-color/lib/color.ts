export interface OpaqueColor {
  r: number;
  g: number;
  b: number;
}

export type Opacity = number;

export interface TranslucentColor {
  opaqueColor: OpaqueColor;
  opacity: Opacity;
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

const RE_HEX_WITH_OPACITY =
  /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
export function translucentColorFromHex(hex: string): TranslucentColor {
  const match = hex.match(RE_HEX_WITH_OPACITY);
  if (match == null) {
    throw new Error(`Invalid hex color representation`);
  }

  return {
    opaqueColor: {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
    },
    opacity: parseInt(match[4], 16) / 255.0,
  };
}
