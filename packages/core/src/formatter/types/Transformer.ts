import { Currency } from '@dinero.js/currencies';

type TransformerOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
};

type Transformer<TAmount> = (options: TransformerOptions<TAmount>) => string;

export default Transformer;
