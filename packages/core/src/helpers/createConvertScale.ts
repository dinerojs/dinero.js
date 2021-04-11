import { createFunction } from '../utils';

import { convertScale, ConvertScaleDependencies } from '../api';

type ConvertScaleCalculator<TAmount> = ConvertScaleDependencies<
  TAmount
>['calculator'];

export function createConvertScale<TAmount>(
  calculator: ConvertScaleCalculator<TAmount>
) {
  return createFunction(convertScale, calculator);
}
