import * as Helpers from '../../src/services/helpers'

describe('Helpers()', () => {
  describe('#isNumeric()', () => {
    test('should return true with an integer', () => {
      expect(Helpers.isNumeric(5)).toBe(true)
    })
    test('should return true with a float', () => {
      expect(Helpers.isNumeric(5.5)).toBe(true)
    })
    test('should return true with a string', () => {
      expect(Helpers.isNumeric('5')).toBe(true)
    })
    test('should return false with NaN', () => {
      expect(Helpers.isNumeric(NaN)).toBe(false)
    })
    test('should return false with Infinity', () => {
      expect(Helpers.isNumeric(Infinity)).toBe(false)
    })
  })
  describe('#isPercentage()', () => {
    test('should return false with a negative number', () => {
      expect(Helpers.isPercentage(-5)).toBe(false)
    })
    test('should return false with a number above 100', () => {
      expect(Helpers.isPercentage(101)).toBe(false)
    })
    test('should return true with a number between 0 and 100 (included)', () => {
      expect(Helpers.isPercentage(50)).toBe(true)
    })
  })
  describe('#areValidRatios()', () => {
    test('should return true with percentage style', () => {
      expect(Helpers.areValidRatios([50, 50])).toBe(true)
    })
    test('should return true with ratio style', () => {
      expect(Helpers.areValidRatios([1, 3])).toBe(true)
    })
    test('should return false with one ratio to 0', () => {
      expect(Helpers.areValidRatios([1, 0])).toBe(false)
    })
    test('should return false with an empty array', () => {
      expect(Helpers.areValidRatios([])).toBe(false)
    })
  })
  describe('#isEven()', () => {
    test('should return true for a positive even integer', () => {
      expect(Helpers.isEven(202)).toBe(true)
    })
    test('should return true for a negative even integer', () => {
      expect(Helpers.isEven(-202)).toBe(true)
    })
    test('should return false for a positive odd integer', () => {
      expect(Helpers.isEven(101)).toBe(false)
    })
    test('should return false for a negative odd integer', () => {
      expect(Helpers.isEven(-101)).toBe(false)
    })
  })
  describe('#isFloat', () => {
    test('should return false with an integer', () => {
      expect(Helpers.isFloat(5)).toBe(false)
    })
    test('should return true with a float', () => {
      expect(Helpers.isFloat(5.5)).toBe(true)
    })
    test('should return true with a string', () => {
      expect(Helpers.isFloat('5.5')).toBe(true)
    })
    test('should return false with NaN', () => {
      expect(Helpers.isFloat(NaN)).toBe(false)
    })
    test('should return false with Infinity', () => {
      expect(Helpers.isFloat(Infinity)).toBe(false)
    })
  })
  describe('#countFractionDigits', () => {
    test('should return the right amount as a number when a float is passed', () => {
      expect(Helpers.countFractionDigits(8.61)).toBe(2)
    })
    test('should return 0 when an integer is passed', () => {
      expect(Helpers.countFractionDigits(8)).toBe(0)
    })
    test('should return 0 when no argument is passed', () => {
      expect(Helpers.countFractionDigits()).toBe(0)
    })
  })
  describe('#isHalf()', () => {
    test('should return true with a half number', () => {
      expect(Helpers.isHalf(2.5)).toBe(true)
    })
    test('should return true with a negative half number', () => {
      expect(Helpers.isHalf(-2.5)).toBe(true)
    })
    test('should return false with a non-half number', () => {
      expect(Helpers.isHalf(2)).toBe(false)
    })
  })
})
