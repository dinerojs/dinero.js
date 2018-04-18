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
})
