import { createFunction } from '../utils';
import { minimum, MinimumDependencies } from '../api';

type MinimumCalculator<TAmount> = MinimumDependencies<TAmount>['calculator'];

export function createMinimum<TAmount>(calculator: MinimumCalculator<TAmount>) {
  return createFunction(minimum, calculator);
}
