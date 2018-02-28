import Settings from './settings'

const Dinero = options => {
  const { amount, currency } = Object.assign(
    {},
    {
      amount: 0,
      currency: 'USD'
    },
    options
  )
  return {
    /**
     * Returns the amount.
     * @return {Number}
     */
    getAmount() {
      return amount
    },
    /**
     * Returns the currency.
     * @return {String}
     */
    getCurrency() {
      return currency
    },
    /**
     * Returns a new Dinero object that represents the sum of this and an other Dinero object.
     * @param {Dinero} addend - The Dinero object to add.
     * @return {Dinero}
     *
     */
    add(addend) {
      return Dinero({
        amount: this.getAmount() + addend.getAmount(),
        currency: this.getCurrency()
      })
    },
    /**
     * Returns a new Dinero object that represents the difference of this and an other Dinero object.
     * @param  {Dinero} subtrahend - The Dinero object to subtract.
     * @return {Dinero}
     */
    subtract(subtrahend) {
      return Dinero({
        amount: this.getAmount() - subtrahend.getAmount(),
        currency: this.getCurrency()
      })
    },
    /**
     * Returns a new Dinero object that represents the multiplied value by the given factor.
     * @param  {Number} multiplier - The factor to multiply by.
     * @return {Dinero}
     */
    multiply(multiplier) {
      return Dinero({
        amount: this.getAmount() * multiplier,
        currency: this.getCurrency()
      })
    },
    /**
     * Returns a new Dinero object that represents the divided value by the given factor.
     * @param  {Number} divisor - The factor to divide by.
     * @return {Dinero}
     */
    divide(divisor) {
      return Dinero({
        amount: this.getAmount() / divisor,
        currency: this.getCurrency()
      })
    },
    /**
     * Checks whether the value represented by this object equals to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    equalsTo(comparator) {
      return this.hasSameAmount(comparator) && this.hasSameCurrency(comparator)
    },
    /**
     * Checks whether the value represented by this object is less than the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    lessThan(comparator) {
      return this.getAmount() < comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is less than or equal to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    lessThanOrEqual(comparator) {
      return this.getAmount() <= comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is greater than the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    greaterThan(comparator) {
      return this.getAmount() > comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is greater than or equal to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    greaterThanOrEqual(comparator) {
      return this.getAmount() >= comparator.getAmount()
    },
    /**
     * Checks if the value represented by this object is zero.
     * @return {Boolean}
     */
    isZero() {
      return this.getAmount() === 0
    },
    /**
     * Checks if the value represented by this object is positive.
     * @return {Boolean}
     */
    isPositive() {
      return this.getAmount() >= 0
    },
    /**
     * Checks if the value represented by this object is negative.
     * @return {Boolean}
     */
    isNegative() {
      return this.getAmount() < 0
    },
    /**
     * Checks if this has cents.
     * @return {Boolean}
     */
    hasCents() {
      return !Number.isInteger(this.toUnit())
    },
    /**
     * Checks whether the currency represented by this object equals to the other.
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    hasSameCurrency(comparator) {
      return this.getCurrency() === comparator.getCurrency()
    },
    /**
     * Checks whether the amount represented by this object equals to the other.
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    hasSameAmount(comparator) {
      return this.getAmount() === comparator.getAmount()
    },
    /**
     * Returns this object formatted as a string.
     * @todo Better formatting options
     * @return {String}
     */
    toFormat(options) {
      options = Object.assign(
        {
          locale: Dinero.defaultLocale,
          display: Dinero.defaultDisplay,
          grouping: Dinero.defaultGrouping,
          decimalPlaces: Dinero.defaultDecimalPlaces
        },
        options
      )
      return this.toUnit().toLocaleString(options.locale, {
        style: 'currency',
        currencyDisplay: options.display,
        useGrouping: options.grouping,
        minimumFractionDigits: options.decimalPlaces,
        currency: this.getCurrency()
      })
    },
    /**
     * Returns the amount represented by this object in units.
     * @return {Number}
     */
    toUnit() {
      return this.getAmount() / 100
    }
  }
}

Object.assign({}, Dinero, Settings)

export default Dinero
