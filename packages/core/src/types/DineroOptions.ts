import { Currency } from '@dinero.js/currencies';

type DineroOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale?: TAmount;
};

export default DineroOptions;
