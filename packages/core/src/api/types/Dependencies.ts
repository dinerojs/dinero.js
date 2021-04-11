import { Calculator } from '@dinero.js/calculator';

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
