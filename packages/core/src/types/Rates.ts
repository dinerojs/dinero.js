type Rate<TAmount> = {
  rate: TAmount,
  scale?: TAmount,
}

export type Rates<TAmount> = Record<string, Rate<TAmount>>;
