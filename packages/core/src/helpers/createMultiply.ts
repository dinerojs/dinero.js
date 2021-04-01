import { createFunction } from '../utils';
import { multiply, MultiplyDependencies } from '../api';
import { Dinero } from '../types';

type MultiplyCalculator<TAmount> = MultiplyDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createMultiply<TAmount>(
  calculator: MultiplyCalculator<TAmount>
) {
  return createFunction(multiply, calculator);
}
