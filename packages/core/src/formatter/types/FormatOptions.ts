import { RoundingMode } from '../../calculator';

type FormatOptions<TAmount> = {
  readonly digits?: TAmount;
  readonly roundingMode?: RoundingMode<TAmount>;
};

export default FormatOptions;
