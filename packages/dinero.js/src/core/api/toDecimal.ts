import { NON_DECIMAL_CURRENCY_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type {
  DineroCalculator,
  Dinero,
  DineroFormatter,
  DineroTransformer,
} from '../types';
import { absolute, computeBase, equal, isArray, lessThan } from '../utils';

import { toUnits } from './toUnits';

export type ToDecimalParams<
  TAmount,
  TOutput,
  TCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  transformer?: DineroTransformer<TAmount, TOutput, string, TCurrency>,
];

export function toDecimal<TAmount, TOutput>(
  calculator: DineroCalculator<TAmount>
) {
  const toUnitsFn = toUnits<TAmount, readonly TAmount[]>(calculator);
  const computeBaseFn = computeBase(calculator);
  const equalFn = equal(calculator);

  return function toDecimalFn<TCurrency extends string>(
    ...[dineroObject, transformer]: ToDecimalParams<TAmount, TOutput, TCurrency>
  ) {
    const { currency, scale } = dineroObject.toJSON();

    const base = computeBaseFn(currency.base);
    const zero = calculator.zero();
    const ten = new Array(10).fill(null).reduce(calculator.increment, zero);

    const isMultiBase = isArray(currency.base);
    const isBaseTen = equalFn(calculator.modulo(base, ten), zero);
    const isDecimal = !isMultiBase && isBaseTen;

    assert(isDecimal, NON_DECIMAL_CURRENCY_MESSAGE);

    const units = toUnitsFn(dineroObject);

    const getDecimalFn = getDecimal(calculator, dineroObject.formatter);
    const value = getDecimalFn(units, scale);

    if (!transformer) {
      return value;
    }

    return transformer({ value, currency });
  };
}

function getDecimal<TAmount>(
  calculator: DineroCalculator<TAmount>,
  formatter: DineroFormatter<TAmount>
) {
  const absoluteFn = absolute(calculator);
  const equalFn = equal(calculator);
  const lessThanFn = lessThan(calculator);
  const zero = calculator.zero();

  return (units: readonly TAmount[], scale: TAmount) => {
    const whole = formatter.toString(units[0]);
    const fractional = formatter.toString(absoluteFn(units[1]));

    const scaleNumber = formatter.toNumber(scale);
    const fractionalString =
      scaleNumber > 0 ? `.${fractional.padStart(scaleNumber, '0')}` : '';
    const decimal = `${whole}${fractionalString}`;

    const leadsWithZero = equalFn(units[0], zero);
    const isNegative = lessThanFn(units[1], zero);

    // A leading negative zero is a special case because the `toString`
    // formatter won't preserve its negative sign (since 0 === -0).
    return leadsWithZero && isNegative ? `-${decimal}` : decimal;
  };
}
