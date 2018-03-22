import chai from 'chai'
import Calculator from '../../src/services/calculator'

const expect = chai.expect
const calculator = Calculator()

describe('Calculator', () => {
  describe('#add()', () => {
    it('should return the sum of two numbers', () => {
      expect(calculator.add(10, 20)).to.equal(30)
    })
  })
  describe('#subtract()', () => {
    it('should return the difference of two numbers', () => {
      expect(calculator.subtract(20, 10)).to.equal(10)
    })
  })
  describe('#multiply()', () => {
    it('should return the product of two numbers', () => {
      expect(calculator.multiply(10, 20)).to.equal(200)
    })
  })
  describe('#divide()', () => {
    it('should return the quotient of two numbers', () => {
      expect(calculator.divide(20, 2)).to.equal(10)
    })
  })
})
