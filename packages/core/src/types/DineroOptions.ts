import { Currency } from '@dinero.js/currencies';

type DineroOptions<TAmountType> = {
  readonly amount: TAmountType;
  readonly currency: Currency<TAmountType>;
  readonly scale?: TAmountType;
};

export default DineroOptions;
