import type { Currency } from '@dinero.js/currencies';

import { NON_DECIMAL_CURRENCY_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero, Formatter } from '../types';
import { computeBase, equal, isArray } from '../utils';

import { toUnits } from './toUnits';

type TransformerOptions<TAmount> = {
  readonly value: string;
  readonly currency: Currency<TAmount>;
};

type Transformer<TAmount, TOutput> = (
  options: TransformerOptions<TAmount>
) => TOutput;

export type ToDecimalParams<TAmount, TOutput> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer?: Transformer<TAmount, TOutput>
];

export function toDecimal<TAmount, TOutput>(calculator: Calculator<TAmount>) {
  const toUnitsFn = toUnits<TAmount, readonly TAmount[]>(calculator);
  const computeBaseFn = computeBase(calculator);
  const equalFn = equal(calculator);

  return function toDecimalFn(
    ...[
      dineroObject,
      transformer = ({ value }) => value as TOutput,
    ]: ToDecimalParams<TAmount, TOutput>
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

    const getDecimalFn = getDecimal(dineroObject.formatter);
    const value = getDecimalFn(units, scale);

    return transformer({ value, currency });
  };
}

function getDecimal<TAmount>(formatter: Formatter<TAmount>) {
  return (units: readonly TAmount[], scale: TAmount) => {
    return units
      .map((unit, index) => {
        const isLast = units.length - 1 === index;
        const unitAsString = formatter.toString(unit);

        if (isLast) {
          return unitAsString.padStart(formatter.toNumber(scale), '0');
        }

        return unitAsString;
      })
      .join('.');
  };
}
