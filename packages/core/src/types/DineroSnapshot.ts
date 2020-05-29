import { Currency } from "@dinero.js/currencies";

type DineroSnapshot<TType> = {
  amount: TType;
  currency: Currency<TType>;
  scale: TType;
};

export default DineroSnapshot;
