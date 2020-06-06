import { Currency } from '@dinero.js/currencies';

type DineroSnapshot<TType> = {
  readonly amount: TType;
  readonly currency: Currency<TType>;
  readonly scale: TType;
};

export default DineroSnapshot;
