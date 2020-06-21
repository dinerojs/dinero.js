import { DineroOptions, convertScale, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableConvertScale<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return convertScale(dineroFactory, calculator);
}

export default chainableConvertScale;
