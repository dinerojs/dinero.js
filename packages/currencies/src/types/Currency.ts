export type Currency<TAmount> = {
  /**
   * The unique code of the currency.
   */
  readonly code: string;
  /**
   * The base, or radix of the currency.
   */
  readonly base: TAmount;
  /**
   * The exponent of the currency.
   */
  readonly exponent: TAmount;
};
