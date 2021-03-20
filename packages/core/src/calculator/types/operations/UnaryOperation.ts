export type UnaryOperation<TAmount, TReturnType = TAmount> = (
  value: TAmount
) => TReturnType;
