import type { Currency } from '@dinero.js/currencies';

import type { Dinero } from './Dinero';

export type TransformerOptions<TAmount> = {
  readonly units: readonly TAmount[];
  readonly decimal?: string;
  readonly currency: Currency<TAmount>;
  readonly dineroObject: Dinero<TAmount>;
};

export type Transformer<TAmount> = (
  options: TransformerOptions<TAmount>
) => string;
