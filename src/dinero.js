import { Defaults, Globals } from './settings'

/**
 * The Dinero module
 * @module Dinero
 * @param  {Number} options.amount - The amount in cents.
 * @param  {String} options.currency - An ISO 4217 currency code.
 * @return {Object}
 */
const Dinero = options => {
  const { amount, currency } = Object.assign(
    {},
    {
      amount: Defaults.defaultAmount,
      currency: Defaults.defaultCurrency
    },
    options
  )

  /**
   * Uses ES5 function notation so `this` can be passed through call, apply and bind
   * @ignore
   */
  const create = function(options) {
    const obj = Object.assign(
      {},
      Object.assign({}, { amount, currency }, options),
      Object.assign({}, { locale: this.locale }, options)
    )
    return Object.assign(
      Dinero({ amount: obj.amount, currency: obj.currency }),
      {
        locale: obj.locale
      }
    )
  }

  return {
    /**
     * Returns the amount.
     * @example
     * // returns 500
     * Dinero({ amount: 500 }).getAmount()
     * @return {Number}
     */
    getAmount() {
      return amount
    },
    /**
     * Returns the currency.
     * @example
     * // returns 'EUR'
     * Dinero({ currency: 'EUR' }).getCurrency()
     * @return {String}
     */
    getCurrency() {
      return currency
    },
    /**
     * Returns the locale.
     * @example
     * // returns 'fr-FR'
     * Dinero().setLocale('fr-FR').getLocale()
     * @return {String}
     */
    getLocale() {
      return this.locale || Dinero.globalLocale
    },
    /**
     * Returns a new Dinero object with an embedded locale.
     * @param {String} newLocale - The new locale as a BCP 47 language tag
     * @example
     * // Returns a Dinero object with locale: 'ja-JP'
     * Dinero().setLocale('ja-JP')
     * @return {Dinero}
     */
    setLocale(newLocale) {
      return create.call(this, { locale: newLocale })
    },
    /**
     * Returns a new Dinero object that represents the sum of this and an other Dinero object.
     * @param {Dinero} addend - The Dinero object to add.
     * @example
     * // returns a Dinero object with amount: 600
     * Dinero({ amount: 400 }).add(Dinero({ amount: 200 }))
     * @return {Dinero}
     *
     */
    add(addend) {
      return create.call(this, {
        amount: this.getAmount() + addend.getAmount()
      })
    },
    /**
     * Returns a new Dinero object that represents the difference of this and an other Dinero object.
     * @param  {Dinero} subtrahend - The Dinero object to subtract.
     * @example
     * // returns a Dinero object with amount: 200
     * Dinero({ amount: 400 }).subtract(Dinero({ amount: 200 }))
     * @return {Dinero}
     */
    subtract(subtrahend) {
      return create.call(this, {
        amount: this.getAmount() - subtrahend.getAmount()
      })
    },
    /**
     * Returns a new Dinero object that represents the multiplied value by the given factor.
     * @param  {Number} multiplier - The factor to multiply by.
     * @example
     * // returns a Dinero object with amount: 1600
     * Dinero({ amount: 400 }).multiply(4)
     * @return {Dinero}
     */
    multiply(multiplier) {
      return create.call(this, { amount: this.getAmount() * multiplier })
    },
    /**
     * Returns a new Dinero object that represents the divided value by the given factor.
     * @param  {Number} divisor - The factor to divide by.
     * @example
     * // returns a Dinero object with amount: 100
     * Dinero({ amount: 400 }).divide(4)
     * @return {Dinero}
     */
    divide(divisor) {
      return create.call(this, { amount: this.getAmount() / divisor })
    },
    /**
     * Returns a new Dinero object that represents a percentage of this.
     * @param  {Number} percentage - The percentage to extract.
     * @example
     * // returns a Dinero object with amount: 5000
     * Dinero({ amount: 10000 }).percentage(50)
     * @return {Dinero}
     */
    percentage(percentage) {
      return this.multiply(percentage / 100)
    },
    /**
     * Checks whether the value represented by this object equals to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @example
     * // returns true
     * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
     * // returns false
     * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
     * // returns false
     * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
     * // returns false
     * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
     * @return {Boolean}
     */
    equalsTo(comparator) {
      return this.hasSameAmount(comparator) && this.hasSameCurrency(comparator)
    },
    /**
     * Checks whether the value represented by this object is less than the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @example
     * // returns true
     * Dinero({ amount: 500 }).lessThan(Dinero({ amount: 800 }))
     * // returns false
     * Dinero({ amount: 800 }).lessThan(Dinero({ amount: 500 }))
     * @return {Boolean}
     */
    lessThan(comparator) {
      return this.getAmount() < comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is less than or equal to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @example
     * // returns true
     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 800 }))
     * // returns true
     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 500 }))
     * // returns false
     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 300 }))
     * @return {Boolean}
     */
    lessThanOrEqual(comparator) {
      return this.getAmount() <= comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is greater than the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @example
     * // returns false
     * Dinero({ amount: 500 }).greaterThan(Dinero({ amount: 800 }))
     * // returns true
     * Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 500 }))
     * @return {Boolean}
     */
    greaterThan(comparator) {
      return this.getAmount() > comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is greater than or equal to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @example
     * // returns true
     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 300 }))
     * // returns true
     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 500 }))
     * // returns false
     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 800 }))
     * @return {Boolean}
     */
    greaterThanOrEqual(comparator) {
      return this.getAmount() >= comparator.getAmount()
    },
    /**
     * Checks if the value represented by this object is zero.
     * @example
     * // returns true
     * Dinero({ amount: 0 }).isZero()
     * // returns false
     * Dinero({ amount: 100 }).isZero()
     * @return {Boolean}
     */
    isZero() {
      return this.getAmount() === 0
    },
    /**
     * Checks if the value represented by this object is positive.
     * @example
     * // returns false
     * Dinero({ amount: -10 }).isPositive()
     * // returns true
     * Dinero({ amount: 10 }).isPositive()
     * // returns true
     * Dinero({ amount: 0 }).isPositive()
     * @return {Boolean}
     */
    isPositive() {
      return this.getAmount() >= 0
    },
    /**
     * Checks if the value represented by this object is negative.
     * @example
     * // returns true
     * Dinero({ amount: -10 }).isNegative()
     * // returns false
     * Dinero({ amount: 10 }).isNegative()
     * // returns false
     * Dinero({ amount: 0 }).isNegative()
     * @return {Boolean}
     */
    isNegative() {
      return this.getAmount() < 0
    },
    /**
     * Checks if this has cents.
     * @example
     * // returns false
     * Dinero({ amount: 1100 }).hasCents()
     * // returns true
     * Dinero({ amount: 1150 }).hasCents()
     * @return {Boolean}
     */
    hasCents() {
      return !Number.isInteger(this.toUnit())
    },
    /**
     * Checks whether the currency represented by this object equals to the other.
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     * @example
     * // returns true
     * Dinero({ amount: 2000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'EUR' }))
     * // returns false
     * Dinero({ amount: 1000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'USD' }))
     * @return {Boolean}
     */
    hasSameCurrency(comparator) {
      return this.getCurrency() === comparator.getCurrency()
    },
    /**
     * Checks whether the amount represented by this object equals to the other.
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     * @example
     * // returns true
     * Dinero({ amount: 1000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000 }))
     * // returns false
     * Dinero({ amount: 2000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000, currency: 'EUR' }))
     * @return {Boolean}
     */
    hasSameAmount(comparator) {
      return this.getAmount() === comparator.getAmount()
    },
    /**
     * Returns this object formatted as a string.
     * @todo Better formatting options
     * @todo Write the docs
     * @todo Write unit tests
     * @return {String}
     */
    toFormat(options) {
      options = Object.assign(
        {
          locale: Dinero.globalLocale,
          display: Dinero.globalDisplay,
          grouping: Dinero.globalGrouping,
          decimalPlaces: Dinero.globalDecimalPlaces
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
     * @example
     * // returns 10.5
     * Dinero({ amount: 1050 }).toUnit()
     * @return {Number}
     */
    toUnit() {
      return this.getAmount() / 100
    },
    /**
     * Return the object's data as an object literal
     * @example
     * // returns { amount: 500, currency: 'EUR' }
     * Dinero({ amount: 500, currency: 'EUR' }).toObject()
     * @return {Object}
     */
    toObject() {
      return {
        amount,
        currency
      }
    }
  }
}

export default Object.assign(Dinero, Globals)
