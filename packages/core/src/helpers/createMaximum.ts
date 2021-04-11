import { createFunction } from '../utils';
import { maximum, MaximumDependencies } from '../api';

type MaximumCalculator<TAmount> = MaximumDependencies<TAmount>['calculator'];

export function createMaximum<TAmount>(calculator: MaximumCalculator<TAmount>) {
  return createFunction(maximum, calculator);
}
