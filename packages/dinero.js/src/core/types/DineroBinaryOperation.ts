export type DineroBinaryOperation<TInput, TOutput = TInput> = (
  a: TInput,
  b: TInput
) => TOutput;
