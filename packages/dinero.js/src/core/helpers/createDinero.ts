import type { DineroCurrency } from '../../currencies';

import type {
  DineroCalculator,
  Dinero,
  DineroOptions,
  DineroFormatter,
} from '../types';

export type CreateDineroOptions<TAmount> = {
  readonly calculator: DineroCalculator<TAmount>;
  readonly formatter?: DineroFormatter<TAmount>;
  readonly onCreate?: (options: DineroOptions<TAmount, string>) => void;
};

export function createDinero<TAmount>({
  calculator,
  onCreate,
  formatter = {
    toNumber: Number,
    toString: String,
  },
}: CreateDineroOptions<TAmount>) {
  return function dinero<TCurrency extends string>({
    amount,
    currency: { code, base, exponent },
    scale = exponent,
  }: DineroOptions<TAmount, TCurrency>): Dinero<TAmount, TCurrency> {
    const currency = { code, base, exponent } as DineroCurrency<
      TAmount,
      TCurrency
    >;

    onCreate?.({ amount, currency, scale });

    return {
      calculator,
      formatter,
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
