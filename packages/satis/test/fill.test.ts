import {
  makeStaticFillingFunction,
  makeRecordFillingFunction,
  makeArrayFillingFunction,
  opt,
  opts,
  optEach,
  filling,
} from "../lib/fill.js";

describe("'makeStaticFillingFunction'", () => {
  it("is same as 'opt' function", () => {
    expect(makeStaticFillingFunction).toBe(opt);
  });
});

describe("'makeRecordFillingFunction'", () => {
  it("is same as 'opts' function", () => {
    expect(makeRecordFillingFunction).toBe(opts);
  });
});

describe("'makeArrayFillingFunction'", () => {
  it("is same as 'optEach' function", () => {
    expect(makeArrayFillingFunction).toBe(optEach);
  });
});

describe("Filling function returned from 'opt'", () => {
  describe.each([{ alternative: undefined as unknown }])(
    "when given alternative: $alternative",
    ({ alternative }) => {
      it.each([
        { partial: undefined, expected: undefined },
        { partial: null, expected: null },
        { partial: 2, expected: 2 },
        { partial: 3.45, expected: 3.45 },
        { partial: 6n, expected: 6n },
        { partial: "foo", expected: "foo" },
        {
          partial: { bar: "baz" } as object,
          expected: { bar: "baz" } as object,
        },
        { partial: ["qux"], expected: ["qux"] },
      ])(
        "and when given partial: $partial returns $expected",
        ({ partial, expected }) => {
          expect(opt(alternative)(partial)).toEqual(expected);
        }
      );
    }
  );

  describe.each([
    { alternative: null },
    { alternative: 2 },
    { alternative: 3.45 },
    { alternative: 6n },
    { alternative: "foo" },
    { alternative: { bar: "baz" } as object },
    { alternative: ["qux"] },
  ])("with alternative: $alternative", ({ alternative }) => {
    it.each([
      { partial: undefined, expected: alternative },
      { partial: null, expected: null },
      { partial: 7, expected: 7 },
      { partial: 8.9, expected: 8.9 },
      { partial: 11n, expected: 11n },
      { partial: "quux", expected: "quux" },
      { partial: { corge: "grault" }, expected: { corge: "grault" } },
      { partial: ["garply"], expected: ["garply"] },
    ])(
      "and with partial: $partial returns $expected",
      ({ partial, expected }) => {
        expect(opt(alternative)(partial)).toEqual(expected);
      }
    );
  });
});

describe("Filling function returned from 'opts'", () => {
  describe.each([
    {
      descriptor: {
        foo: (partial: unknown) => partial ?? "bar",
      },
    },
  ])("with descriptor: $descriptor", ({ descriptor }) => {
    it.each([
      {
        partial: undefined,
        expected: { foo: "bar" },
      },
      {
        partial: {},
        expected: { foo: "bar" },
      },
      {
        partial: { foo: null },
        expected: { foo: "bar" },
      },
      {
        partial: { foo: undefined },
        expected: { foo: "bar" },
      },
      {
        partial: { foo: "baz" },
        expected: { foo: "baz" },
      },
      {
        partial: { qux: "quux" },
        expected: { foo: "bar" },
      },
    ])(
      "and with partial: $partial returns $expected",
      ({ partial, expected }) => {
        expect(opts(descriptor)(partial)).toEqual(expected);
      }
    );
  });
});

describe("Filling function returned from 'optEach'", () => {
  describe.each([
    {
      fill: (partial: unknown) => partial ?? "foo",
    },
  ])("with fill: $fill", ({ fill }) => {
    it.each([
      {
        partial: undefined,
        expected: [],
      },
      {
        partial: [],
        expected: [],
      },
      {
        partial: [null],
        expected: ["foo"],
      },
      {
        partial: [undefined],
        expected: ["foo"],
      },
      {
        partial: ["bar"],
        expected: ["bar"],
      },
      {
        partial: [0, 1n, undefined, "baz"],
        expected: [0, 1n, "foo", "baz"],
      },
    ])(
      "and with partial: $partial returns $expected",
      ({ partial, expected }) => {
        expect(optEach(fill)(partial)).toEqual(expected);
      }
    );
  });
});

describe("'filling'", () => {
  test("returns given filling function", () => {
    const f = opt("0");
    expect(filling<string>()(f)).toBe(f);
  });
});
