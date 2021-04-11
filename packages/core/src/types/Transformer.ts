import type { Currency } from '@dinero.js/currencies';

export type TransformerOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
};

export type Transformer<TAmount> = (
  options: TransformerOptions<TAmount>
) => string;
