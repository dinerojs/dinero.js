import { createFunction } from '../utils';
import { isNegative, IsNegativeDependencies } from '../api';

type IsNegativeCalculator<TAmount> = IsNegativeDependencies<
  TAmount
>['calculator'];

export function createIsNegative<TAmount>(
  calculator: IsNegativeCalculator<TAmount>
) {
  return createFunction(isNegative, calculator);
}
