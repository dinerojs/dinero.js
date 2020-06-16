import { RoundingMode } from '../../calculator';

type FormatOptions<TType> = {
  readonly digits?: TType;
  readonly roundingMode?: RoundingMode<TType>;
};

export default FormatOptions;
