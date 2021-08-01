import type { Dinero } from './Dinero';
import type { Currency } from '@dinero.js/currencies';

export type TransformerOptions<TAmount> = {
  readonly units: readonly TAmount[];
  readonly decimal?: string;
  readonly currency: Currency<TAmount>;
  readonly dineroObject: Dinero<TAmount>;
};

export type Transformer<TAmount> = (
  options: TransformerOptions<TAmount>
) => string;
