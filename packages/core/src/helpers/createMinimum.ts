import { createFunction } from '../utils';
import { minimum, MinimumDependencies } from '../api';
import { Dinero } from '../types';

type MinimumCalculator<TAmount> = MinimumDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createMinimum<TAmount>(calculator: MinimumCalculator<TAmount>) {
  return createFunction(minimum, calculator);
}
