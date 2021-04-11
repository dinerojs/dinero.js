import type { Calculator } from '@dinero.js/calculator';

import type { Dinero, DineroOptions } from '../types';

export type CreateDineroOptions<TAmount> = {
  readonly calculator: Calculator<TAmount>;
};

export function createDinero<TAmount>({
  calculator,
}: CreateDineroOptions<TAmount>) {
  return function dinero({
    amount,
    currency,
    scale = currency.exponent,
  }: DineroOptions<TAmount>): Dinero<TAmount> {
    return {
      calculator,
      create(options) {
        return dinero(options);
      },
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
