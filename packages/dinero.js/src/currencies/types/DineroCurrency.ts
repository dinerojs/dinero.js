export type DineroCurrency<TAmount, TCurrency extends string = string> = {
  /**
   * The unique code of the currency.
   */
  readonly code: TCurrency;
  /**
   * The base, or radix of the currency.
   */
  readonly base: TAmount | readonly TAmount[];
  /**
   * The exponent of the currency.
   */
  readonly exponent: TAmount;
};
