import chai from 'chai'
import Assert from '../../src/assert'

const expect = chai.expect

describe('Assert', () => {
  describe('#isPercentage()', () => {
    it('should throw an error when a non-number percentage is passed', () => {
      expect(() => Assert.isPercentage('ok')).to.throw()
    })
    it('should throw an error when a percentage below 0 is passed', () => {
      expect(() => Assert.isPercentage(-1)).to.throw()
    })
    it('should throw an error when a percentage above 100 is passed', () => {
      expect(() => Assert.isPercentage(101)).to.throw()
    })
    it('should not throw when a valid percentage is passed', () => {
      expect(() => Assert.isPercentage(50)).to.not.throw()
    })
  })
})
