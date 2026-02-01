export type DineroScaledAmount<TAmount> = {
  readonly amount: TAmount;
  readonly scale?: TAmount;
};
