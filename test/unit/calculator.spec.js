import Calculator from '../../src/services/calculator'

const calculator = Calculator()

describe('Calculator', () => {
  describe('#add()', () => {
    test('should return the sum of two numbers', () => {
      expect(calculator.add(10, 20)).toBe(30)
    })
  })
  describe('#subtract()', () => {
    test('should return the difference of two numbers', () => {
      expect(calculator.subtract(20, 10)).toBe(10)
    })
  })
  describe('#multiply()', () => {
    test('should return the product of two numbers', () => {
      expect(calculator.multiply(10, 20)).toBe(200)
    })
  })
  describe('#divide()', () => {
    test('should return the quotient of two numbers', () => {
      expect(calculator.divide(20, 2)).toBe(10)
    })
  })
})
