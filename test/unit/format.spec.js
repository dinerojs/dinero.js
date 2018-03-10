import chai from 'chai'
import Format from '../../src/services/format'

const expect = chai.expect

describe('Format', () => {
  describe('#getMatches()', () => {
    it('should return all matches as an array when there is a match', () => {
      expect(Format('0,0').getMatches()).to.deep.equal([','])
    })
    it('should return an empty array when there is no match', () => {
      expect(Format('abc').getMatches()).to.be.an('array').that.is.empty
    })
  })
  describe('#getMinimumFractionDigits()', () => {
    it('should return the number of decimal places when format contains any', () => {
      expect(Format('0.00').getMinimumFractionDigits()).to.equal(2)
    })
    it('should return 0 when there is no specified amount of decimal places required', () => {
      expect(Format('0,0').getMinimumFractionDigits()).to.equal(0)
    })
  })
  describe('#getCurrencyDisplay()', () => {
    it('should return "code" when mask is valid and contains "USD"', () => {
      expect(Format('USD0,0').getCurrencyDisplay()).to.equal('code')
    })
    it('should return "name" when mask is valid and contains "dollar"', () => {
      expect(Format('0,0 dollar').getCurrencyDisplay()).to.equal('name')
    })
    it('should return "symbol" when mask is valid and contains "$"', () => {
      expect(Format('$0,0').getCurrencyDisplay()).to.equal('symbol')
    })
    it('should return "undefined" when mask is valid but contains no currency indicator', () => {
      expect(Format('0,0').getCurrencyDisplay()).to.be.undefined
    })
    it('should return "undefined" when mask is invalid', () => {
      expect(Format('abc').getCurrencyDisplay()).to.be.undefined
    })
  })
  describe('#getStyle()', () => {
    it('should return "currency" when display mode is not undefined', () => {
      expect(Format('$0,0').getStyle()).to.equal('currency')
    })
    it('should return "decimal" when display mode is undefined', () => {
      expect(Format('0,0').getStyle()).to.equal('decimal')
    })
  })
  describe('#getUseGrouping', () => {
    it('should return true when mask is valid and contains ","', () => {
      expect(Format('0,0').getUseGrouping()).to.be.true
    })
    it('should return false when mask is valid but contains no ","', () => {
      expect(Format('0.0').getUseGrouping()).to.be.false
    })
    it('should return false when mask is invalid', () => {
      expect(Format('abc').getUseGrouping()).to.be.false
    })
  })
})
