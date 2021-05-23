import type { Dinero } from './Dinero';
import type { Currency } from '@dinero.js/currencies';

export type TransformerOptions<TAmount> = {
  readonly amount: number;
  readonly currency: Currency<TAmount>;
  readonly dineroObject: Dinero<TAmount>;
};

export type Transformer<TAmount> = (
  options: TransformerOptions<TAmount>
) => string;
