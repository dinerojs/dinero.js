import { createFunction } from '../utils';
import { convert, ConvertDependencies } from '../api';

type ConvertCalculator<TAmount> = ConvertDependencies<TAmount>['calculator'];

export function createConvert<TAmount>(calculator: ConvertCalculator<TAmount>) {
  return createFunction(convert, calculator);
}
