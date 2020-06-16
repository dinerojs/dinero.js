import { Currency } from '@dinero.js/currencies';

type DineroSnapshot<TAmountType> = {
  readonly amount: TAmountType;
  readonly currency: Currency<TAmountType>;
  readonly scale: TAmountType;
};

export default DineroSnapshot;
