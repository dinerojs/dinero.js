type Currency<TAmountType> = {
  /**
   * The unique code of the currency.
   */
  readonly code: string;
  /**
   * The base, or radix of the currency.
   */
  readonly base: TAmountType;
  /**
   * The exponent of the currency.
   */
  readonly exponent: TAmountType;
};

export default Currency;
