import { createFunction } from '../utils';

import { haveSameAmount, HaveSameAmountDependencies } from '../api';

type HaveSameAmountCalculator<TAmount> = HaveSameAmountDependencies<
  TAmount
>['calculator'];

export function createHaveSameAmount<TAmount>(
  calculator: HaveSameAmountCalculator<TAmount>
) {
  return createFunction(haveSameAmount, calculator);
}
