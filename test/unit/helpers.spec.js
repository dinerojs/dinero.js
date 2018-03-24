import chai from 'chai'
import * as Helpers from '../../src/services/helpers'

const expect = chai.expect

describe('Helpers()', () => {
  describe('#isNumeric()', () => {
    it('should return true with an integer', () => {
      expect(Helpers.isNumeric(5)).to.be.true
    })
    it('should return true with a float', () => {
      expect(Helpers.isNumeric(5.5)).to.be.true
    })
    it('should return true with a string', () => {
      expect(Helpers.isNumeric('5')).to.be.true
    })
    it('should return false with NaN', () => {
      expect(Helpers.isNumeric(NaN)).to.be.false
    })
    it('should return false with Infinity', () => {
      expect(Helpers.isNumeric(Infinity)).to.be.false
    })
  })
})
