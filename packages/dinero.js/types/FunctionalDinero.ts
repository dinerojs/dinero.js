import { Currency } from '@dinero.js/currencies';

type FunctionalDinero<TType> = {
  readonly getAmount: () => TType;
  readonly getCurrency: () => Currency<TType>;
  readonly getScale: () => TType;
};

export default FunctionalDinero;
