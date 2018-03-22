export default function Calculator() {
  const add = (a, b) => a + b

  const subtract = (a, b) => a - b

  const multiply = (a, b) => a * b

  const divide = (a, b) => a / b

  return {
    add(a, b) {
      return add(a, b)
    },
    subtract(a, b) {
      return subtract(a, b)
    },
    multiply(a, b) {
      return multiply(a, b)
    },
    divide(a, b) {
      return divide(a, b)
    }
  }
}
