import { DineroOptions, multiply, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableMultiply<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return multiply(dineroFactory, calculator);
}

export default chainableMultiply;
