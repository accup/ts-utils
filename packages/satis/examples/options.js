import { opt, opts, optEach } from "../";

/**
 * @typedef {{
 *  foo: string;
 *  bar: number;
 *  baz: {
 *   qux: string | null;
 *   quux: number | bigint;
 *  };
 *  corge: {
 *   grault: string;
 *   garply: {
 *     waldo: number;
 *     fred: number;
 *     plugh: string | undefined;
 *   };
 *  }[];
 *  xyzzy?: {
 *   thud: string;
 *  };
 * }} Options
 */

const fillOptions = opts({
  foo: opt(""),
  bar: opt(0),
  baz: opts({
    qux: opt(null),
    quux: opt(0n),
  }),
  corge: optEach(
    opts({
      grault: opt(""),
      garply: opts({
        waldo: opt(0),
        fred: opt(0),
        plugh: opt(""),
      }),
    })
  ),
  xyzzy: opt(
    /** @type {{ thud: string } | undefined} */
    (undefined)
  ),
});

/**
 * @type {Options}
 */
const options = fillOptions({
  foo: "foo",
  corge: [{}],
  xyzzy: {
    thud: "thud",
  },
});

options.foo;
options.bar;
options.baz.qux;
options.baz.quux;
options.corge[0].garply.waldo;
options.xyzzy?.thud;
