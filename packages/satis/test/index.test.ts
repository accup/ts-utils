import {
  makeStaticFillingFunction,
  makeRecordFillingFunction,
  makeArrayFillingFunction,
  opt,
  opts,
  optEach,
  filling,
  type PartialValue,
  type FilledValue,
} from "../lib/index.js";

it.each([
  { variable: makeStaticFillingFunction },
  { variable: makeRecordFillingFunction },
  { variable: makeArrayFillingFunction },
  { variable: opt },
  { variable: opts },
  { variable: optEach },
  { variable: filling },
])("$variable is defined", ({ variable }) => {
  expect(variable).toBeDefined();
});

it("types are valid", () => {
  const fillOptions = opts({
    foo: opt(""),
    bar: opt(0),
    baz: opts({
      qux: opt(null),
    }),
    quux: optEach(opt(0n)),
  });
  const partial: PartialValue<typeof fillOptions> = {
    foo: "foo",
    quux: [undefined, 2n],
  };
  const filled: FilledValue<typeof fillOptions> = fillOptions(partial);

  expect(filled).toEqual({
    foo: "foo",
    bar: 0,
    baz: {
      qux: null,
    },
    quux: [0n, 2n],
  });
});
