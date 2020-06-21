import { DineroOptions, Calculator, convert } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableConvert<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return convert(dineroFactory, calculator);
}

export default chainableConvert;
