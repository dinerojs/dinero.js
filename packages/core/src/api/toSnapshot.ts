import type { Dinero, DineroSnapshot, Transformer } from '../types';

export function toSnapshot<TAmount>(
  dineroObject: Dinero<TAmount>
): DineroSnapshot<TAmount>;

export function toSnapshot<TAmount, TOutput>(
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount, TOutput, DineroSnapshot<TAmount>>
): TOutput;

export function toSnapshot<TAmount>(
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<
    TAmount,
    DineroSnapshot<TAmount>,
    DineroSnapshot<TAmount>
  > = ({ value }) => value
) {
  const value = dineroObject.toJSON();

  return transformer({ value, currency: value.currency });
}
