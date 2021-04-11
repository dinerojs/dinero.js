import { createFunction } from '../utils';
import { isPositive, IsPositiveDependencies } from '../api';

type IsPositiveCalculator<TAmount> = IsPositiveDependencies<
  TAmount
>['calculator'];

export function createIsPositive<TAmount>(
  calculator: IsPositiveCalculator<TAmount>
) {
  return createFunction(isPositive, calculator);
}
