import type { RoundingMode } from '@dinero.js/calculator';

export type RoundingOptions<TAmount> = {
  readonly digits?: TAmount;
  readonly roundingMode?: RoundingMode<TAmount>;
};
