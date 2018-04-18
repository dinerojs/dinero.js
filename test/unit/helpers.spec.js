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
})
