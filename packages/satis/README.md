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

fillOptions({ bar: [, , "bar", ,] });
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
