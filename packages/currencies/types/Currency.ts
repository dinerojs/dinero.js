type Currency<TType> = {
  /**
   * The unique code of the currency.
   */
  readonly code: string;
  /**
   * The base, or radix of the currency.
   */
  readonly base: TType;
  /**
   * The exponent of the currency.
   */
  readonly exponent: TType;
};

export default Currency;
