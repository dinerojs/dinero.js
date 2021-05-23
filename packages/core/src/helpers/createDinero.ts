/* eslint-disable functional/no-mixed-type, functional/no-return-void, functional/no-expression-statement */
import type { Calculator, Dinero, DineroOptions } from '../types';

export type CreateDineroOptions<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly onCreate?: (options: DineroOptions<TAmount>) => void;
};

export function createDinero<TAmount>({
  calculator,
  onCreate,
}: CreateDineroOptions<TAmount>) {
  return function dinero({
    amount,
    currency,
    scale = currency.exponent,
  }: DineroOptions<TAmount>): Dinero<TAmount> {
    onCreate?.({ amount, currency, scale });

    return {
      calculator,
      create: dinero,
      toJSON() {
        return {
          amount,
          currency,
          scale,
        };
      },
    };
  };
}
