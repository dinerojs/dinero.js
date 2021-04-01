import { createFunction } from '../utils';

import { convertScale, ConvertScaleDependencies } from '../api';
import { Dinero } from '../types';

type ConvertScaleCalculator<TAmount> = ConvertScaleDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createConvertScale<TAmount>(
  calculator: ConvertScaleCalculator<TAmount>
) {
  return createFunction(convertScale, calculator);
}
