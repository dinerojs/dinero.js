import type { RoundingMode } from '@dinero.js/calculator';

export type FormatOptions<TAmount> = {
  readonly digits?: TAmount;
  readonly roundingMode?: RoundingMode<TAmount>;
};
