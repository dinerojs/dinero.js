import { Currency } from "@dinero.js/currencies";

type TransformerOptions<TType> = {
  amount: TType;
  currency: Currency<TType>;
};

type Transformer<TType> = (options: TransformerOptions<TType>) => string;

export default Transformer;
