# Optional value utility in JavaScript/TypeScript

## Installation

```
npm install @accup/satis
```

## Usage in TypeScript (or in JavaScript except types)

```ts
import { opt, opts, optEach } from "@accup/satis";

const fillOptions = opts({
  foo: opt(""),
  bar: optEach(opt<string | number>(0)),
});

fillOptions();
// => { foo: "", bar: [] }

fillOptions(undefined);
// => { foo: "", bar: [] }

fillOptions({ foo: "foo" });
// => { foo: "foo", bar: [] }

fillOptions({ bar: [undefined, undefined, "bar", undefined] });
// => { foo: "foo", bar: [0, 0, "bar", 0] }
```

## Custom Function

```ts
const fillOptions = opts({
  foo: (partial: string | undefined) => partial || null,
});

fillOptions({ foo: "foo" });
// => { foo: "foo" }

fillOptions({ foo: "" });
// => { foo: null }
```

> **Note**
> 'opts' only accepts filling functions with a parameter containing 'undefined' type for all descriptor properties.

## Partial and Filled Value Types

```ts
import { opt, opts, type PartialValue, type FilledValue } from "@accup/satis";

const fillOptions = opts({
  foo: opt(""),
  bar: opt(0),
});

type PartialOptions = PartialValue<typeof fillOptions>;
type FilledOptions = FilledValue<typeof fillOptions>;

function doSomethingWithOptions(options?: PartialOptions) {
  const opts: FilledOptions = fillOptions(options);

  // ...
}

doSomethingWithOptions();
doSomethingWithOptions(undefined);
doSomethingWithOptions({ foo: "foo" });
doSomethingWithOptions({ foo: "foo", bar: 2 });
```

## Early Type Checking (not optimized)

```ts
import { opt, opts, filling } from "@accup/satis";

interface Options {
  foo: string;
  bar: number;
}

// Same result as without wrapping the 'filling' function
const fillOptions1 = filling<Options>()(
  opts({
    foo: opt(""),
    bar: opt(0),
  })
);

// Insufficient definition causes a type error
const fillOptions2 = filling<Options>()(
  opts({
    foo: opt(""),
    bar: opt("0"),
  })
);
```
