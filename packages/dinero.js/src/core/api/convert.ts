import type { DineroCurrency } from '../../currencies';

import { MISMATCHED_BASES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero, DineroRates } from '../types';
import { computeBase, equal, getAmountAndScale, maximum } from '../utils';

import { transformScale } from './transformScale';

export type ConvertParams<
  TAmount,
  TCurrency extends string = string,
  TNewCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  newCurrency: DineroCurrency<TAmount, TNewCurrency>,
  rates: DineroRates<TAmount>,
];

export function convert<TAmount>(calculator: DineroCalculator<TAmount>) {
  const convertScaleFn = transformScale(calculator);
  const maximumFn = maximum(calculator);
  const computeBaseFn = computeBase(calculator);
  const equalFn = equal(calculator);
  const zero = calculator.zero();

  return function convertFn<
    TCurrency extends string,
    TNewCurrency extends string,
  >(
    ...[dineroObject, newCurrency, rates]: ConvertParams<
      TAmount,
      TCurrency,
      TNewCurrency
    >
  ) {
    const rate = rates[newCurrency.code];
    const { amount, currency, scale } = dineroObject.toJSON();

    const sourceBase = computeBaseFn(currency.base);
    const targetBase = computeBaseFn(newCurrency.base);

    assert(equalFn(sourceBase, targetBase), MISMATCHED_BASES_MESSAGE);

    const { amount: rateAmount, scale: rateScale } = getAmountAndScale(
      rate,
      zero
    );

    const newScale = calculator.add(scale, rateScale);

    return convertScaleFn(
      dineroObject.create({
        amount: calculator.multiply(amount, rateAmount),
        currency: newCurrency,
        scale: newScale,
      }),
      maximumFn([newScale, newCurrency.exponent])
    );
  };
}
