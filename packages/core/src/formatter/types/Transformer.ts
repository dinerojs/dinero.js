import { Currency } from '@dinero.js/currencies';

type TransformerOptions<TType> = {
  readonly amount: TType;
  readonly currency: Currency<TType>;
};

type Transformer<TType> = (options: TransformerOptions<TType>) => string;

export default Transformer;
