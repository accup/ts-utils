import { opaqueColorFromHex, translucentColorFromHex } from "../lib/color.js";

describe("opaqueColorFromHex", () => {
  it.each([
    { hex: "#000000", expected: { r: 0, g: 0, b: 0 } },
    { hex: "#123456", expected: { r: 18, g: 52, b: 86 } },
    { hex: "#acfacf", expected: { r: 172, g: 250, b: 207 } },
    { hex: "#f7b8d9", expected: { r: 247, g: 184, b: 217 } },
  ])("with hex: $hex returns $expected", ({ hex, expected }) => {
    expect(opaqueColorFromHex(hex)).toEqual(expected);
  });

  it.each([
    { hex: "" },
    { hex: "123456" },
    { hex: "#acgacf" },
    { hex: "#1428576" },
  ])("with hex: $hex throws error", ({ hex }) => {
    expect(() => opaqueColorFromHex(hex)).toThrow();
  });
});

describe("translucentColorFromHex", () => {
  it.each([
    {
      hex: "#00000000",
      expected: { opaqueColor: { r: 0, g: 0, b: 0 }, opacity: 0.0 },
    },
    {
      hex: "#12345633",
      expected: { opaqueColor: { r: 18, g: 52, b: 86 }, opacity: 0.2 },
    },
    {
      hex: "#acfacfcc",
      expected: { opaqueColor: { r: 172, g: 250, b: 207 }, opacity: 0.8 },
    },
    {
      hex: "#f7b8d9ff",
      expected: { opaqueColor: { r: 247, g: 184, b: 217 }, opacity: 1.0 },
    },
  ])("with hex: $hex returns $expected", ({ hex, expected }) => {
    expect(translucentColorFromHex(hex)).toEqual(expected);
  });

  it.each([
    { hex: "" },
    { hex: "12345678" },
    { hex: "#acgacfac" },
    { hex: "#142857614" },
  ])("with hex: $hex throws error", ({ hex }) => {
    expect(() => translucentColorFromHex(hex)).toThrow();
  });
});
