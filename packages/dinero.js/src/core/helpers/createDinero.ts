import type { Calculator, Dinero, DineroOptions, Formatter } from '../types';

export type CreateDineroOptions<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly formatter?: Formatter<TAmount>;
  readonly onCreate?: (options: DineroOptions<TAmount>) => void;
};

export function createDinero<TAmount>({
  calculator,
  onCreate,
  formatter = {
    toNumber: Number,
    toString: String,
  },
}: CreateDineroOptions<TAmount>) {
  return function dinero({
    amount,
    currency: { code, base, exponent },
    scale = exponent,
  }: DineroOptions<TAmount>): Dinero<TAmount> {
    const currency = { code, base, exponent };

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
