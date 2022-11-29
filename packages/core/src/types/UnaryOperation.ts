export type UnaryOperation<TInput, TParams = readonly [], TOutput = TInput> = (
  operand: TInput,
  ...rest: TParams extends readonly [...infer TRest] ? TRest : never
) => TOutput;
