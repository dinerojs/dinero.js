import { createFunction } from '../utils';
import { isPositive, IsPositiveDependencies } from '../api';
import { Dinero } from '../types';

type IsPositiveCalculator<TAmount> = IsPositiveDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createIsPositive<TAmount>(
  calculator: IsPositiveCalculator<TAmount>
) {
  return createFunction(isPositive, calculator);
}
