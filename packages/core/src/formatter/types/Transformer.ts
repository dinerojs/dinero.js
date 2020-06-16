import { Currency } from '@dinero.js/currencies';

type TransformerOptions<TAmountType> = {
  readonly amount: TAmountType;
  readonly currency: Currency<TAmountType>;
};

type Transformer<TAmountType> = (options: TransformerOptions<TAmountType>) => string;

export default Transformer;
