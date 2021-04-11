import { createFunction } from '../utils';
import { toFormat, ToFormatDependencies } from '../api';

type ToFormatCalculator<TAmount> = ToFormatDependencies<TAmount>['calculator'];

export function createToFormat<TAmount>(
  calculator: ToFormatCalculator<TAmount>
) {
  return createFunction(toFormat, calculator);
}
