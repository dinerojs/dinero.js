import type { RoundingMode } from './RoundingMode';

export type RoundingOptions<TAmount> = {
  readonly digits?: TAmount;
  readonly round?: RoundingMode;
};
