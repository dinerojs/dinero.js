type Rate<TAmount> = {
  readonly rate: TAmount;
  readonly scale?: TAmount;
};

export type Rates<TAmount> = Record<string, Rate<TAmount>>;
