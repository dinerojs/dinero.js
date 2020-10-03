import { BaseDinero, Calculator } from '@dinero.js/core';
import {
  Dependencies,
  CalculatorDependency,
} from '@dinero.js/core/src/api/types';
import dinero from './dinero';

/**
 * Build a pure Dinero method from a core function and a calculator.
 *
 * @param fn The core function.
 * @param calculator The calculator.
 *
 * @returns A pure Dinero method.
 */
export function buildMethod<
  TAmount,
  TDinero extends BaseDinero<TAmount>,
  TCalculatorMethods extends keyof Calculator<TAmount>,
  TReturnType
>(
  fn: (
    dependencies: Dependencies<TAmount, TDinero, TCalculatorMethods>
  ) => TReturnType,
  calculator: CalculatorDependency<TAmount, TCalculatorMethods>
) {
  const dependencies = {
    factory: dinero,
    calculator,
  };

  return fn(dependencies as Dependencies<TAmount, TDinero, TCalculatorMethods>);
}
