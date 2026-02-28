import type { DineroCalculator, Dinero, DineroTransformer } from '../types';
import { isArray, getDivisors } from '../utils';

export type ToUnitsParams<
  TAmount,
  TOutput,
  TCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  transformer?: DineroTransformer<
    TAmount,
    TOutput,
    readonly TAmount[],
    TCurrency
  >,
];

export function toUnits<TAmount, TOutput>(
  calculator: DineroCalculator<TAmount>
) {
  const getDivisorsFn = getDivisors(calculator);

  return function toUnitsFn<TCurrency extends string>(
    ...[dineroObject, transformer]: ToUnitsParams<TAmount, TOutput, TCurrency>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const { power, integerDivide, modulo } = calculator;

    const bases = isArray(currency.base) ? currency.base : [currency.base];
    const divisors = getDivisorsFn(bases.map((base) => power(base, scale)));
    const value = divisors.reduce<readonly TAmount[]>(
      (amounts, divisor, index) => {
        const amountLeft = amounts[index];

        const quotient = integerDivide(amountLeft, divisor);
        const remainder = modulo(amountLeft, divisor);

        return [...amounts.filter((_, i) => i !== index), quotient, remainder];
      },
      [amount]
    );

    if (!transformer) {
      return value;
    }

    return transformer({ value, currency });
  };
}
