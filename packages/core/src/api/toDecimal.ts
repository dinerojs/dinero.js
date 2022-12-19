import { NON_DECIMAL_CURRENCY_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero, Formatter, Transformer } from '../types';
import { absolute, computeBase, equal, isArray, lessThan } from '../utils';

import { toUnits } from './toUnits';

export type ToDecimalParams<TAmount, TOutput> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer?: Transformer<TAmount, TOutput, string>
];

export function toDecimal<TAmount, TOutput>(calculator: Calculator<TAmount>) {
  const toUnitsFn = toUnits<TAmount, readonly TAmount[]>(calculator);
  const computeBaseFn = computeBase(calculator);
  const equalFn = equal(calculator);

  return function toDecimalFn(
    ...[dineroObject, transformer]: ToDecimalParams<TAmount, TOutput>
  ) {
    const { currency, scale } = dineroObject.toJSON();

    const base = computeBaseFn(currency.base);
    const zero = calculator.zero();
    const ten = new Array(10).fill(null).reduce(calculator.increment, zero);

    const isMultiBase = isArray(currency.base);
    const isBaseTen = equalFn(calculator.modulo(base, ten), zero);
    const isDecimal = !isMultiBase && isBaseTen;

    // eslint-disable-next-line functional/no-expression-statement
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
  calculator: Calculator<TAmount>,
  formatter: Formatter<TAmount>
) {
  const absoluteFn = absolute(calculator);
  const equalFn = equal(calculator);
  const lessThanFn = lessThan(calculator);
  const zero = calculator.zero();

  return (units: readonly TAmount[], scale: TAmount) => {
    const whole = formatter.toString(units[0]);
    const fractional = formatter.toString(absoluteFn(units[1]));

    const scaleNumber = formatter.toNumber(scale);
    const decimal = `${whole}.${fractional.padStart(scaleNumber, '0')}`;

    const leadsWithZero = equalFn(units[0], zero);
    const isNegative = lessThanFn(units[1], zero);

    // A leading negative zero is a special case because the `toString`
    // formatter won't preserve its negative sign (since 0 === -0).
    return leadsWithZero && isNegative ? `-${decimal}` : decimal;
  };
}
