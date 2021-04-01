import { createFunction } from '../utils';
import { convert, ConvertDependencies } from '../api';
import { Dinero } from '../types';

type ConvertCalculator<TAmount> = ConvertDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createConvert<TAmount>(calculator: ConvertCalculator<TAmount>) {
  return createFunction(convert, calculator);
}
