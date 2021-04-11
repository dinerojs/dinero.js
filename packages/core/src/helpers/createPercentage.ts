import { createFunction } from '../utils';
import { percentage, PercentageDependencies } from '../api';

type PercentageCalculator<TAmount> = PercentageDependencies<
  TAmount
>['calculator'];

export function createPercentage<TAmount>(
  calculator: PercentageCalculator<TAmount>
) {
  return createFunction(percentage, calculator);
}
