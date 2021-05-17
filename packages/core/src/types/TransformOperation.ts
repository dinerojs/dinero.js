export type TransformOperation<TInput, TOutput = TInput> = (
  input: TInput
) => TOutput;
