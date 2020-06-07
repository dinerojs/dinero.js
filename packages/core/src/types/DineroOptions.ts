import { Currency } from '@dinero.js/currencies';

type DineroOptions<TType> = {
  readonly amount: TType;
  readonly currency: Currency<TType>;
  readonly scale?: TType;
};

export default DineroOptions;
