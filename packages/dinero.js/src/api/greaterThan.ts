import { DineroOptions, greaterThan, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableGreaterThan<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return greaterThan(dineroFactory, calculator);
}

export default chainableGreaterThan;
