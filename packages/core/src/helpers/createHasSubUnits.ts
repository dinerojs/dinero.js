import { createFunction } from '../utils';

import { hasSubUnits, HasSubUnitsDependencies } from '../api';

type HasSubUnitsCalculator<TAmount> = HasSubUnitsDependencies<
  TAmount
>['calculator'];

export function createHasSubUnits<TAmount>(
  calculator: HasSubUnitsCalculator<TAmount>
) {
  return createFunction(hasSubUnits, calculator);
}
