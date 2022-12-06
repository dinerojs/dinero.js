import { NON_DECIMAL_CURRENCY_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero, Formatter, Transformer } from '../types';
import { absolute, computeBase, equal, isArray } from '../utils';

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

  return (units: readonly TAmount[], scale: TAmount) => {
    return units
      .map((unit, index) => {
        const isFirst = index === 0;
        const isLast = units.length - 1 === index;

        const unitAsString = formatter.toString(
          isFirst ? unit : absoluteFn(unit)
        );

        if (isLast) {
          return unitAsString.padStart(formatter.toNumber(scale), '0');
        }

        return unitAsString;
      })
      .join('.');
  };
}
