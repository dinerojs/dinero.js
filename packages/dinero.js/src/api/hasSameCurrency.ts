import { haveSameCurrency } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableHasSameCurrency<TAmount>(
  dineroObject: ChainableDinero<TAmount>,
  comparator: ChainableDinero<TAmount>
) {
  return haveSameCurrency([dineroObject, comparator]);
}

export default chainableHasSameCurrency;
