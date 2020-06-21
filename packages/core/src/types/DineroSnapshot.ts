import { Currency } from '@dinero.js/currencies';

type DineroSnapshot<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale: TAmount;
};

export default DineroSnapshot;
