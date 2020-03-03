import { isEven, isFloat, countFractionDigits, isHalf } from './helpers'

export default function Calculator() {
  const floatMultiply = (a, b) => {
    const getFactor = number => Math.pow(10, countFractionDigits(number))
    const factor = Math.max(getFactor(a), getFactor(b))
    return (Math.round(a * factor) * Math.round(b * factor)) / (factor * factor)
  }

  const roundingModes = {
    HALF_ODD(number) {
      const rounded = Math.round(number)
      return isHalf(number)
        ? isEven(rounded)
          ? rounded - 1
          : rounded
        : rounded
    },
    HALF_EVEN(number) {
      const rounded = Math.round(number)
      return isHalf(number)
        ? isEven(rounded)
          ? rounded
          : rounded - 1
        : rounded
    },
    HALF_UP(number) {
      return Math.round(number)
    },
    HALF_DOWN(number) {
      return isHalf(number) ? Math.floor(number) : Math.round(number)
    },
    HALF_TOWARDS_ZERO(number) {
      return isHalf(number)
        ? Math.sign(number) * Math.floor(Math.abs(number))
        : Math.round(number)
    },
    HALF_AWAY_FROM_ZERO(number) {
      return isHalf(number)
        ? Math.sign(number) * Math.ceil(Math.abs(number))
        : Math.round(number)
    },
    DOWN(number) {
      return Math.floor(number)
    }
  }

  return {
    /**
     * Returns the sum of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to add.
     * @param {Number} b - The second number to add.
     *
     * @return {Number}
     */
    add(a, b) {
      return a + b
    },
    /**
     * Returns the difference of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to subtract.
     * @param {Number} b - The second number to subtract.
     *
     * @return {Number}
     */
    subtract(a, b) {
      return a - b
    },
    /**
     * Returns the product of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to multiply.
     * @param {Number} b - The second number to multiply.
     *
     * @return {Number}
     */
    multiply(a, b) {
      return isFloat(a) || isFloat(b) ? floatMultiply(a, b) : a * b
    },
    /**
     * Returns the quotient of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to divide.
     * @param {Number} b - The second number to divide.
     *
     * @return {Number}
     */
    divide(a, b) {
      return a / b
    },
    /**
     * Returns the remainder of two numbers.
     * @ignore
     *
     * @param  {Number} a - The first number to divide.
     * @param  {Number} b - The second number to divide.
     *
     * @return {Number}
     */
    modulo(a, b) {
      return a % b
    },
    /**
     * Returns a rounded number based off a specific rounding mode.
     * @ignore
     *
     * @param {Number} number - The number to round.
     * @param {String} [roundingMode='HALF_EVEN'] - The rounding mode to use.
     *
     * @returns {Number}
     */
    round(number, roundingMode = 'HALF_EVEN') {
      return roundingModes[roundingMode](number)
    }
  }
}
