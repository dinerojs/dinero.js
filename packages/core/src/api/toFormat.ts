import { computeBase, equal, isArray } from '../utils';

import { toUnits } from './toUnits';

import type { Calculator, Dinero, Formatter, Transformer } from '../types';

export type ToFormatParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount>
];

export function toFormat<TAmount>(calculator: Calculator<TAmount>) {
  const toUnitsFn = toUnits(calculator);
  const computeBaseFn = computeBase(calculator);
  const equalFn = equal(calculator);

  return function toFormatFn(
    ...[dineroObject, transformer]: ToFormatParams<TAmount>
  ) {
    const { currency, scale } = dineroObject.toJSON();

    const getDecimalFn = getDecimal(dineroObject.formatter);
    const base = computeBaseFn(currency.base);
    const zero = calculator.zero();
    const ten = new Array(10).fill(null).reduce(calculator.increment, zero);

    const isMultiBase = isArray(currency.base);
    const isBaseTen = equalFn(calculator.modulo(base, ten), zero);
    const isDecimal = !isMultiBase && isBaseTen;

    const units = toUnitsFn(dineroObject);
    const decimal = isDecimal ? getDecimalFn(units, scale) : undefined;

    return transformer({ units, decimal, currency, dineroObject });
  };
}

function getDecimal<TAmount>(formatter: Formatter<TAmount>) {
  return (units: readonly TAmount[], scale: TAmount) => {
    return units
      .map((unit, index) => {
        const isLast = units.length - 1 === index;
        const unitAsString = String(unit);

        if (isLast) {
          return unitAsString.padEnd(formatter.toNumber(scale), '0');
        }

        return unitAsString;
      })
      .join('.');
  };
}
