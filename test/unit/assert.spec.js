import * as Assert from '../../src/services/assert'

describe('Assert()', () => {
  describe('#assert()', () => {
    test('should throw with a condition evaluating to false', () => {
      expect(() => Assert.assert(false, new Error())).toThrow()
    })
    test('should throw a generic error when no err argument is supplied', () => {
      expect(() => Assert.assert(false)).toThrowError(Error)
    })
  })
  describe('#assertPercentage()', () => {
    test('should throw with a negative number', () => {
      expect(() => Assert.assertPercentage(-5)).toThrow()
    })
    test('should throw with a number above 100', () => {
      expect(() => Assert.assertPercentage(101)).toThrow()
    })
  })
  describe('#assertValidRatios()', () => {
    test('should throw with one ratio to 0', () => {
      expect(() => Assert.assertValidRatios([1, 0])).toThrow()
    })
    test('should throw with an empty array', () => {
      expect(() => Assert.assertValidRatios([])).toThrow()
    })
  })
  describe('#assertInteger()', () => {
    test('should throw with a float', () => {
      expect(() => Assert.assertInteger(5.5)).toThrow()
    })
    test('should throw with a string', () => {
      expect(() => Assert.assertInteger('5')).toThrow()
    })
  })
})
