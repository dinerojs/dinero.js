import { RoundingMode } from '../../calculator';

type FormatOptions<TAmountType> = {
  readonly digits?: TAmountType;
  readonly roundingMode?: RoundingMode<TAmountType>;
};

export default FormatOptions;
