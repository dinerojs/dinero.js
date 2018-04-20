import { isEven, isFloat, countFractionDigits } from './helpers'

export default function Calculator() {
  const floatMultiply = (a, b) => {
    const getFactor = number => Math.pow(10, countFractionDigits(number))
    const factor = Math.max(getFactor(a), getFactor(b))
    return a * factor * (b * factor) / (factor * factor)
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
     * Returns a rounded number where if the input number is equidistant from the
     * two nearest integers it is rounded to the nearest even integer.
     * @ignore
     *
     * @param  {Number} value - The number to round.
     *
     * @return {Number}
     */
    bankersRound(value) {
      const rounded = Math.round(value)
      return Math.abs(value) % 1 === 0.5
        ? isEven(rounded) ? rounded : rounded - 1
        : rounded
    }
  }
}
