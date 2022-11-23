import type { Dinero, DineroSnapshot, Transformer } from '../types';

export type ToSnapshotParams<TAmount, TOutput> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer?: Transformer<TAmount, TOutput, DineroSnapshot<TAmount>>
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
