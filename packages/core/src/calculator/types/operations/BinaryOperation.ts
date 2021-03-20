export type BinaryOperation<TAmount, TReturnType = TAmount> = (
  a: TAmount,
  b: TAmount
) => TReturnType;
