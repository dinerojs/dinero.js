import type { Currency } from '@dinero.js/currencies';

import type { Dinero } from './Dinero';

export type TransformerOptions<TAmount> = {
  readonly amount: number;
  readonly currency: Currency<TAmount>;
  readonly dineroObject: Dinero<TAmount>;
};

export type Transformer<TAmount, TResult = string> = (
  options: TransformerOptions<TAmount>
) => TResult;
