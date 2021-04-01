import { createFunction } from '../utils';

import { equal, EqualDependencies } from '../api';
import { Dinero } from '../types';

type EqualCalculator<TAmount> = EqualDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createEqual<TAmount>(calculator: EqualCalculator<TAmount>) {
  return createFunction(equal, calculator);
}
