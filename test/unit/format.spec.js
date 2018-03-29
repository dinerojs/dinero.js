import Format from '../../src/services/format'

describe('Format', () => {
  describe('#getMatches()', () => {
    test('should return all matches as an array when there is a match', () => {
      expect(Format('0,0').getMatches()).toEqual([','])
    })
    test('should return an empty array when there is no match', () => {
      expect(Format('abc').getMatches()).toHaveLength(0)
    })
  })
  describe('#getMinimumFractionDigits()', () => {
    test('should return the number of decimal places when format contains any', () => {
      expect(Format('0.00').getMinimumFractionDigits()).toBe(2)
    })
    test('should return 0 when there is no specified amount of decimal places required', () => {
      expect(Format('0,0').getMinimumFractionDigits()).toBe(0)
    })
  })
  describe('#getCurrencyDisplay()', () => {
    test('should return "code" when mask is valid and contains "USD"', () => {
      expect(Format('USD0,0').getCurrencyDisplay()).toBe('code')
    })
    test('should return "name" when mask is valid and contains "dollar"', () => {
      expect(Format('0,0 dollar').getCurrencyDisplay()).toBe('name')
    })
    test('should return "symbol" when mask is valid and contains "$"', () => {
      expect(Format('$0,0').getCurrencyDisplay()).toBe('symbol')
    })
    test('should return "undefined" when mask is valid but contains no currency indicator', () => {
      expect(Format('0,0').getCurrencyDisplay()).toBeUndefined()
    })
    test('should return "undefined" when mask is invalid', () => {
      expect(Format('abc').getCurrencyDisplay()).toBeUndefined()
    })
  })
  describe('#getStyle()', () => {
    test('should return "currency" when display mode is not undefined', () => {
      expect(Format('$0,0').getStyle()).toBe('currency')
    })
    test('should return "decimal" when display mode is undefined', () => {
      expect(Format('0,0').getStyle()).toBe('decimal')
    })
  })
  describe('#getUseGrouping', () => {
    test('should return true when mask is valid and contains ","', () => {
      expect(Format('0,0').getUseGrouping()).toBe(true)
    })
    test('should return false when mask is valid but contains no ","', () => {
      expect(Format('0.0').getUseGrouping()).toBe(false)
    })
    test('should return false when mask is invalid', () => {
      expect(Format('abc').getUseGrouping()).toBe(false)
    })
  })
})
