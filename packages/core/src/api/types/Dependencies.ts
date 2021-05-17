import type { Calculator } from '../../types';

export type CalculatorDependency<
  TAmount,
  TCalculatorMethods extends keyof Calculator<TAmount>
> = Pick<Calculator<TAmount>, TCalculatorMethods>;

export type Dependencies<
  TAmount,
  TCalculatorMethods extends keyof Calculator<TAmount>
> = {
  readonly calculator: CalculatorDependency<TAmount, TCalculatorMethods>;
};
