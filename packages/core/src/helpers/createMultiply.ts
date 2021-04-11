import { createFunction } from '../utils';
import { multiply, MultiplyDependencies } from '../api';

type MultiplyCalculator<TAmount> = MultiplyDependencies<TAmount>['calculator'];

export function createMultiply<TAmount>(
  calculator: MultiplyCalculator<TAmount>
) {
  return createFunction(multiply, calculator);
}
