import type {
  DineroCalculator,
  Dinero,
  DineroOptions,
  DineroFormatter,
} from '../types';

export type CreateDineroOptions<TAmount> = {
  readonly calculator: DineroCalculator<TAmount>;
  readonly formatter?: DineroFormatter<TAmount>;
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
