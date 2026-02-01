import type { DineroCurrency } from '../../currencies';

export type TransformerOptions<TAmount, TValue> = {
  readonly value: TValue;
  readonly currency: DineroCurrency<TAmount>;
};

export type DineroTransformer<TAmount, TOutput, TValue> = (
  options: TransformerOptions<TAmount, TValue>
) => TOutput;
