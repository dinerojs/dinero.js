import { createFunction } from '../utils';

import { hasSubUnits, HasSubUnitsDependencies } from '../api';
import { Dinero } from '../types';

type HasSubUnitsCalculator<TAmount> = HasSubUnitsDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createHasSubUnits<TAmount>(
  calculator: HasSubUnitsCalculator<TAmount>
) {
  return createFunction(hasSubUnits, calculator);
}
