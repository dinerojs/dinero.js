import type { DineroCurrency } from '../../currencies';

export type TransformerOptions<
  TAmount,
  TValue,
  TCurrency extends string = string,
> = {
  readonly value: TValue;
  readonly currency: DineroCurrency<TAmount, TCurrency>;
};

export type DineroTransformer<
  TAmount,
  TOutput,
  TValue,
  TCurrency extends string = string,
> = (options: TransformerOptions<TAmount, TValue, TCurrency>) => TOutput;
