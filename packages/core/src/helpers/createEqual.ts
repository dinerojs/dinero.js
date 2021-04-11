import { createFunction } from '../utils';

import { equal, EqualDependencies } from '../api';

type EqualCalculator<TAmount> = EqualDependencies<TAmount>['calculator'];

export function createEqual<TAmount>(calculator: EqualCalculator<TAmount>) {
  return createFunction(equal, calculator);
}
