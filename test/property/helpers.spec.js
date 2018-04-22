import * as Helpers from '../../src/services/helpers'
import jsc from 'jsverify'

describe('Helpers', () => {
  describe('#isEven', () => {
    test('should return true for even numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => Helpers.isEven(a * 2)))
    })
    test('should return false for odd numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => !Helpers.isEven(a * 2 - 1)))
    })
  })
  describe('#isHalf', () => {
    test('should return true for half numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => Helpers.isHalf((a * 2 - 1) / 2)))
    })
    test('should return false for non-half numbers', () => {
      jsc.assert(jsc.forall(jsc.uint8, a => !Helpers.isHalf(a * 2 / 2)))
    })
  })
})
