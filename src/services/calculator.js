export default function Calculator() {
  const add = (a, b) => a + b

  const subtract = (a, b) => a - b

  const multiply = (a, b) => a * b

  const divide = (a, b) => a / b

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
      return add(a, b)
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
      return subtract(a, b)
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
      return multiply(a, b)
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
      return divide(a, b)
    }
  }
}
