import * as Helpers from '../../src/services/helpers'
import jsc from 'jsverify'

describe('Helpers', () => {
  describe('#isPercentage', () => {
    test('should return true for numbers between 0 and 100', () => {
      jsc.assert(jsc.forall(jsc.nat(100), a => Helpers.isPercentage(a)))
    })
    test('should return false for numbers above 100', () => {
      jsc.assert(
        jsc.forall(jsc.uint8, a => !Helpers.isPercentage(a + (100 - a + 1)))
      )
    })
    test('should return false for numbers below 0', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => !Helpers.isPercentage(-a - 1)))
    })
  })
  describe('#isEven', () => {
    test('should return true for even numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => Helpers.isEven(a * 2)))
    })
    test('should return false for odd numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => !Helpers.isEven(a * 2 - 1)))
    })
  })
  describe('#isFloat', () => {
    test('should return true for floats', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => Helpers.isFloat(a * 2 - 1 / 2)))
    })
    test('should return false for integers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => !Helpers.isFloat((a * 2) / 2)))
    })
  })
  describe('#isHalf', () => {
    test('should return true for half numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => Helpers.isHalf((a * 2 - 1) / 2)))
    })
    test('should return false for non-half numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => !Helpers.isHalf((a * 2) / 2)))
    })
  })
})
