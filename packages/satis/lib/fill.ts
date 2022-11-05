export type FillingFunction<Partial, Filled> = (partial: Partial) => Filled;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FillingFunctionLike<R = unknown> = FillingFunction<any, R>;

export type PartialValue<F extends FillingFunctionLike> = F extends (
  partial: infer Partial
) => unknown
  ? Partial
  : never;
export type FilledValue<F extends FillingFunctionLike> = F extends (
  partial: infer _
) => infer Filled
  ? Filled
  : never;

export type RecordFillingDescriptorLike = Readonly<
  Record<string, FillingFunction<undefined, unknown>>
>;
export type PartialRecord<T extends RecordFillingDescriptorLike> = {
  [K in keyof T]?: PartialValue<T[K]>;
};
export type FilledRecord<T extends RecordFillingDescriptorLike> = {
  [K in keyof T]: FilledValue<T[K]>;
};

export function makeStaticFillingFunction<T, U extends T = T>(
  alternative: T
): (partial: U | undefined) => T | U {
  return (partial: U | undefined): T | U => {
    if (partial === undefined) {
      return alternative;
    } else {
      return partial;
    }
  };
}

export function makeRecordFillingFunction<
  T extends RecordFillingDescriptorLike
>(
  descriptor: Readonly<T>
): FillingFunction<PartialRecord<T> | undefined, FilledRecord<T>> {
  return (partial: PartialRecord<T> | undefined) =>
    Object.fromEntries(
      Object.entries(descriptor).map(([key, fill]) => [
        key,
        fill(partial === undefined ? undefined : partial[key]),
      ])
    ) as FilledRecord<T>;
}

export function makeArrayFillingFunction<F extends FillingFunctionLike>(
  fill: F
): FillingFunction<Iterable<PartialValue<F>> | undefined, FilledValue<F>[]> {
  return (partials: Iterable<PartialValue<F>> | undefined) =>
    partials === undefined
      ? []
      : [...partials].map((partial) =>
          (fill as FillingFunction<PartialValue<F>, FilledValue<F>>)(partial)
        );
}

export function filling<T>(): <U extends FillingFunctionLike<T>>(fill: U) => U {
  return <U extends FillingFunctionLike<T>>(fill: U) => fill;
}

export {
  makeStaticFillingFunction as opt,
  makeRecordFillingFunction as opts,
  makeArrayFillingFunction as optEach,
};
