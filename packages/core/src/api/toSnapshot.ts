import type { Currency } from '@dinero.js/currencies';

import type { Dinero, DineroSnapshot } from '../types';

type TransformerOptions<TAmount> = {
  readonly value: DineroSnapshot<TAmount>;
  readonly currency: Currency<TAmount>;
};

type Transformer<TAmount, TOutput> = (
  options: TransformerOptions<TAmount>
) => TOutput;

export type ToSnapshotParams<TAmount, TOutput> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer?: Transformer<TAmount, TOutput>
];

export function toSnapshot<TAmount, TOutput>(
  ...[
    dineroObject,
    transformer = ({ value }) => value as TOutput,
  ]: ToSnapshotParams<TAmount, TOutput>
) {
  const value = dineroObject.toJSON();

  return transformer({ value, currency: value.currency });
}
