import { createFunction } from '../utils';
import { toFormat, ToFormatDependencies } from '../api';
import { Dinero } from '../types';

type ToFormatCalculator<TAmount> = ToFormatDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createToFormat<TAmount>(
  calculator: ToFormatCalculator<TAmount>
) {
  return createFunction(toFormat, calculator);
}
