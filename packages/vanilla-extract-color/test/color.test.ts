import { opaqueColorFromHex } from "../lib/color.js";

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
