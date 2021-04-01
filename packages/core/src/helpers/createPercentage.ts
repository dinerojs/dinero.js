import { createFunction } from '../utils';
import { percentage, PercentageDependencies } from '../api';
import { Dinero } from '../types';

type PercentageCalculator<TAmount> = PercentageDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createPercentage<TAmount>(
  calculator: PercentageCalculator<TAmount>
) {
  return createFunction(percentage, calculator);
}
