import { RoundingMode } from '../../calculator';

export type FormatOptions<TAmount> = {
  readonly digits?: TAmount;
  readonly roundingMode?: RoundingMode<TAmount>;
};
