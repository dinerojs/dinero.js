import { createFunction } from '../utils';

import { haveSameAmount, HaveSameAmountDependencies } from '../api';
import { Dinero } from '../types';

type HaveSameAmountCalculator<TAmount> = HaveSameAmountDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createHaveSameAmount<TAmount>(
  calculator: HaveSameAmountCalculator<TAmount>
) {
  return createFunction(haveSameAmount, calculator);
}
