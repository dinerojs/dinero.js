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
    test('should return the product of an integer and a float', () => {
      expect(calculator.multiply(209050, 8.61)).toBe(1799920.5)
    })
  })
  describe('#divide()', () => {
    test('should return the quotient of two numbers', () => {
      expect(calculator.divide(20, 2)).toBe(10)
    })
  })
  describe('#modulo()', () => {
    test('should return the remainder of two numbers', () => {
      expect(calculator.modulo(5, 2)).toBe(1)
    })
  })
  describe('#bankersRound()', () => {
    test('should return normal rounding for 1.4', () => {
      expect(calculator.bankersRound(1.4)).toBe(1)
    })
    test('should return normal rounding for -1.4', () => {
      expect(calculator.bankersRound(-1.4)).toBe(-1)
    })
    test('should return nearest even number for 1.5', () => {
      expect(calculator.bankersRound(1.5)).toBe(2)
    })
    test('should return nearest even number for 2.5', () => {
      expect(calculator.bankersRound(2.5)).toBe(2)
    })
    test('should return nearest even number for -2.5', () => {
      expect(calculator.bankersRound(-2.5)).toBe(-2)
    })
  })
})
