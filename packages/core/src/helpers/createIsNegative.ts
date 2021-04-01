import { createFunction } from '../utils';
import { isNegative, IsNegativeDependencies } from '../api';
import { Dinero } from '../types';

type IsNegativeCalculator<TAmount> = IsNegativeDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createIsNegative<TAmount>(
  calculator: IsNegativeCalculator<TAmount>
) {
  return createFunction(isNegative, calculator);
}
