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
    test('should return the product of two floats', () => {
      expect(calculator.multiply(8.52, 8.6186)).toBe(73.430472)
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
  describe('#round()', () => {
    describe('default', () => {
      test('should return normal rounding for 1.4', () => {
        expect(calculator.round(1.4)).toBe(1)
      })
      test('should return normal rounding for -1.4', () => {
        expect(calculator.round(-1.4)).toBe(-1)
      })
      test('should return nearest even integer for 1.5', () => {
        expect(calculator.round(1.5)).toBe(2)
      })
      test('should return nearest even integer for 2.5', () => {
        expect(calculator.round(2.5)).toBe(2)
      })
      test('should return nearest even integer for -2.5', () => {
        expect(calculator.round(-2.5)).toBe(-2)
      })
    })
    describe('HALF_ODD', () => {
      test('should return normal rounding for 1.4', () => {
        expect(calculator.round(1.4, 'HALF_ODD')).toBe(1)
      })
      test('should return normal rounding for -1.4', () => {
        expect(calculator.round(-1.4, 'HALF_ODD')).toBe(-1)
      })
      test('should return nearest odd integer for 1.5', () => {
        expect(calculator.round(1.5, 'HALF_ODD')).toBe(1)
      })
      test('should return nearest odd integer for 2.5', () => {
        expect(calculator.round(2.5, 'HALF_ODD')).toBe(3)
      })
      test('should return nearest odd integer for -2.5', () => {
        expect(calculator.round(-2.5, 'HALF_ODD')).toBe(-3)
      })
    })
    describe('HALF_EVEN', () => {
      test('should return normal rounding for 1.4', () => {
        expect(calculator.round(1.4, 'HALF_EVEN')).toBe(1)
      })
      test('should return normal rounding for -1.4', () => {
        expect(calculator.round(-1.4, 'HALF_EVEN')).toBe(-1)
      })
      test('should return nearest even integer for 1.5', () => {
        expect(calculator.round(1.5, 'HALF_EVEN')).toBe(2)
      })
      test('should return nearest even integer for 2.5', () => {
        expect(calculator.round(2.5, 'HALF_EVEN')).toBe(2)
      })
      test('should return nearest even integer for -2.5', () => {
        expect(calculator.round(-2.5, 'HALF_EVEN')).toBe(-2)
      })
    })
    describe('HALF_UP', () => {
      test('should return normal rounding for 1.4', () => {
        expect(calculator.round(1.4, 'HALF_UP')).toBe(1)
      })
      test('should return normal rounding for -1.4', () => {
        expect(calculator.round(-1.4, 'HALF_UP')).toBe(-1)
      })
      test('should return nearest up integer for 1.5', () => {
        expect(calculator.round(1.5, 'HALF_UP')).toBe(2)
      })
      test('should return nearest up integer for 2.5', () => {
        expect(calculator.round(2.5, 'HALF_UP')).toBe(3)
      })
      test('should return nearest up integer for -2.5', () => {
        expect(calculator.round(-2.5, 'HALF_UP')).toBe(-2)
      })
    })
    describe('HALF_DOWN', () => {
      test('should return normal rounding for 1.4', () => {
        expect(calculator.round(1.4, 'HALF_DOWN')).toBe(1)
      })
      test('should return normal rounding for -1.4', () => {
        expect(calculator.round(-1.4, 'HALF_DOWN')).toBe(-1)
      })
      test('should return nearest down integer for 1.5', () => {
        expect(calculator.round(1.5, 'HALF_DOWN')).toBe(1)
      })
      test('should return nearest down integer for 2.5', () => {
        expect(calculator.round(2.5, 'HALF_DOWN')).toBe(2)
      })
      test('should return nearest down integer for -2.5', () => {
        expect(calculator.round(-2.5, 'HALF_DOWN')).toBe(-3)
      })
    })
    describe('HALF_TOWARDS_ZERO', () => {
      test('should return normal rounding for 1.4', () => {
        expect(calculator.round(1.4, 'HALF_TOWARDS_ZERO')).toBe(1)
      })
      test('should return normal rounding for -1.4', () => {
        expect(calculator.round(-1.4, 'HALF_TOWARDS_ZERO')).toBe(-1)
      })
      test('should return nearest down integer for 1.5', () => {
        expect(calculator.round(1.5, 'HALF_TOWARDS_ZERO')).toBe(1)
      })
      test('should return nearest down integer for 2.5', () => {
        expect(calculator.round(2.5, 'HALF_TOWARDS_ZERO')).toBe(2)
      })
      test('should return nearest down integer for -2.5', () => {
        expect(calculator.round(-2.5, 'HALF_TOWARDS_ZERO')).toBe(-2)
      })
    })
    describe('HALF_AWAY_FROM_ZERO', () => {
      test('should return normal rounding for 1.4', () => {
        expect(calculator.round(1.4, 'HALF_AWAY_FROM_ZERO')).toBe(1)
      })
      test('should return normal rounding for -1.4', () => {
        expect(calculator.round(-1.4, 'HALF_AWAY_FROM_ZERO')).toBe(-1)
      })
      test('should return nearest down integer for 1.5', () => {
        expect(calculator.round(1.5, 'HALF_AWAY_FROM_ZERO')).toBe(2)
      })
      test('should return nearest down integer for 2.5', () => {
        expect(calculator.round(2.5, 'HALF_AWAY_FROM_ZERO')).toBe(3)
      })
      test('should return nearest down integer for -2.5', () => {
        expect(calculator.round(-2.5, 'HALF_AWAY_FROM_ZERO')).toBe(-3)
      })
    })
  })
})
