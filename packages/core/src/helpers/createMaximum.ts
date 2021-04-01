import { createFunction } from '../utils';
import { maximum, MaximumDependencies } from '../api';
import { Dinero } from '../types';

type MaximumCalculator<TAmount> = MaximumDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createMaximum<TAmount>(calculator: MaximumCalculator<TAmount>) {
  return createFunction(maximum, calculator);
}
