import * as Helpers from '../../src/services/helpers'

let mockXHR = null
let request = null

describe('Helpers', () => {
  describe('#isNumeric', () => {
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
  describe('#isPercentage', () => {
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
  describe('#areValidRatios', () => {
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
  describe('#isEven', () => {
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
  describe('#isHalf', () => {
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
  describe('#getJSON', () => {
    beforeEach(() => {
      mockXHR = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        readyState: 4,
        responseText: '',
        status: 200,
        statusText: ''
      }
      window.XMLHttpRequest = jest.fn(() => mockXHR)
      request = Helpers.getJSON('http://my.api')
    })
    test('should return a resolved promise with a response text', async () => {
      mockXHR.responseText = JSON.stringify({ a: 1, b: 2 })
      mockXHR.onreadystatechange()
      expect(await request).toMatchObject({ a: 1, b: 2 })
    })
    test('should return a rejected promise with a status text', () => {
      mockXHR.status = 404
      mockXHR.statusText = 'Failure'
      mockXHR.onreadystatechange()
      expect(request).rejects.toEqual(new Error('Failure'))
    })
    test('should return a rejected promise with an error', () => {
      mockXHR.onerror()
      expect(request).rejects.toEqual(new Error('Network error'))
    })
  })
  describe('#isUndefined', () => {
    test('should return true when the value is undefined', () => {
      expect(Helpers.isUndefined(undefined)).toBe(true)
    })
    test('should return false when the value is defined', () => {
      expect(Helpers.isUndefined('abc')).toBe(false)
    })
  })
  describe('#flattenObject', () => {
    test('should flatten the object with dots as separators', () => {
      expect(Helpers.flattenObject({ a: 1, b: { c: 2, d: 3 } })).toMatchObject({
        a: 1,
        'b.c': 2,
        'b.d': 3
      })
    })
    test('should flatten the object with dashes as separators', () => {
      expect(
        Helpers.flattenObject({ a: 1, b: { c: 2, d: 3 } }, '-')
      ).toMatchObject({
        a: 1,
        'b-c': 2,
        'b-d': 3
      })
    })
  })
  describe('#isThenable', () => {
    test('should return false when the value is null', () => {
      expect(Helpers.isThenable(null)).toBe(false)
    })
    test('should return false when the value is undefined', () => {
      expect(Helpers.isThenable(undefined)).toBe(false)
    })
    test('should return false when the value is an empty array', () => {
      expect(Helpers.isThenable([])).toBe(false)
    })
    test('should return true when the value is the result of a resolved promise', () => {
      expect(Helpers.isThenable(Promise.resolve())).toBe(true)
    })
    test('should return true when the value is the result of a rejected promise', () => {
      expect(Helpers.isThenable(Promise.reject(new Error()))).toBe(true)
    })
    test('should return true when the value is an object that implements a `then` method', () => {
      expect(Helpers.isThenable({ then: () => 1 })).toBe(true)
    })
  })
})
