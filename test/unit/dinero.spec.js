import chai from 'chai'
import Dinero from '../../src/dinero'

const expect = chai.expect

describe('Dinero', () => {
  describe('#getAmount()', () => {
    it('should return the right amount as a number', () => {
      expect(Dinero({ amount: 500 }).getAmount()).to.equal(500)
    })
    it('should return the default amount as a number when no amount is specified', () => {
      expect(Dinero().getAmount()).to.equal(0)
    })
  })
  describe('#getCurrency()', () => {
    it('should return the right currency as a string', () => {
      expect(Dinero({ currency: 'EUR' }).getCurrency()).to.equal('EUR')
    })
    it('should return the default currency as a string when no currency is specified', () => {
      expect(Dinero().getCurrency()).to.equal('USD')
    })
  })
  describe('#getLocale()', () => {
    it('should return the right locale as a string', () => {
      expect(
        Dinero()
          .setLocale('fr-FR')
          .getLocale()
      ).to.equal('fr-FR')
    })
    it('should return the default locale as a string when no locale is specified', () => {
      expect(Dinero().getLocale()).to.equal('en-US')
    })
    it('should return the globally set locale as a string when no locale is specified', () => {
      Dinero.globalLocale = 'en-GB'
      expect(Dinero().getLocale()).to.equal('en-GB')
      Dinero.globalLocale = 'en-US'
    })
  })
  describe('#setLocale()', () => {
    it('should return a new Dinero object with the right locale as a string', () => {
      expect(
        Dinero()
          .setLocale('de-DE')
          .getLocale()
      ).to.equal('de-DE')
    })
    it('should return a new Dinero object with the right locale as a string even if a locale was set globally', () => {
      Dinero.globalLocale = 'fr-FR'
      expect(
        Dinero()
          .setLocale('ja-JP')
          .getLocale()
      ).to.equal('ja-JP')
      Dinero.globalLocale = 'en-US'
    })
    it('should carry over the locale when chaining methods', () => {
      expect(
        Dinero()
          .setLocale('ja-JP')
          .multiply(4)
          .getLocale()
      ).to.equal('ja-JP')
    })
  })
  describe('#add()', () => {
    it('should return a new Dinero object with same amount plus the amount of the other', () => {
      expect(
        Dinero({ amount: 400 })
          .add(Dinero({ amount: 200 }))
          .toObject()
      ).to.deep.include({ amount: 600 })
    })
  })
  describe('#subtract()', () => {
    it('should return a new Dinero object with same amount minus the amount of the other', () => {
      expect(
        Dinero({ amount: 400 })
          .subtract(Dinero({ amount: 200 }))
          .toObject()
      ).to.deep.include({ amount: 200 })
    })
  })
  describe('#multiply()', () => {
    it('should return a new Dinero object with an amount multiplied by the given factor', () => {
      expect(
        Dinero({ amount: 400 })
          .multiply(4)
          .toObject()
      ).to.deep.include({
        amount: 1600
      })
    })
  })
  describe('#divide()', () => {
    it('should return a new Dinero object with an amount divided by the given factor', () => {
      expect(
        Dinero({ amount: 400 })
          .divide(4)
          .toObject()
      ).to.deep.include({ amount: 100 })
    })
  })
  describe('#percentage()', () => {
    it('should return a new Dinero object representing a percentage of the original', () => {
      expect(
        Dinero({ amount: 10000 })
          .percentage(50)
          .toObject()
      ).to.deep.include({ amount: 5000 })
    })
  })
  describe('#equalsTo()', () => {
    it('should return true when both amount and currencies are equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'EUR' }).equalsTo(
          Dinero({ amount: 500, currency: 'EUR' })
        )
      ).to.be.true
    })
    it('should return false when both amount are not equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'EUR' }).equalsTo(
          Dinero({ amount: 800, currency: 'EUR' })
        )
      ).to.be.false
    })
    it('should return false when both currencies are not equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'USD' }).equalsTo(
          Dinero({ amount: 500, currency: 'EUR' })
        )
      ).to.be.false
    })
    it('should return false when both amount and currencies are not equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'USD' }).equalsTo(
          Dinero({ amount: 800, currency: 'EUR' })
        )
      ).to.be.false
    })
  })
  describe('#lessThan()', () => {
    it('should return true when amount is less than other amount', () => {
      expect(Dinero({ amount: 500 }).lessThan(Dinero({ amount: 800 }))).to.be
        .true
    })
    it('should return false when amount is greater than other amount', () => {
      expect(Dinero({ amount: 800 }).lessThan(Dinero({ amount: 500 }))).to.be
        .false
    })
  })
  describe('#lessThanOrEqual()', () => {
    it('should return true when amount is less than other amount', () => {
      expect(Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 800 })))
        .to.be.true
    })
    it('should return true when amount is equal to other amount', () => {
      expect(Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 500 })))
        .to.be.true
    })
    it('should return true when amount is greater than other amount', () => {
      expect(Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 300 })))
        .to.be.false
    })
  })
  describe('#greaterThan()', () => {
    it('should return false when amount is less than other amount', () => {
      expect(Dinero({ amount: 500 }).greaterThan(Dinero({ amount: 800 }))).to.be
        .false
    })
    it('should return true when amount is greater than other amount', () => {
      expect(Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 500 }))).to.be
        .true
    })
  })
  describe('#greaterThanOrEqual()', () => {
    it('should return true when amount is greater than other amount', () => {
      expect(
        Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 300 }))
      ).to.be.true
    })
    it('should return true when amount is equal to other amount', () => {
      expect(
        Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 500 }))
      ).to.be.true
    })
    it('should return true when amount is lesser than other amount', () => {
      expect(
        Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 800 }))
      ).to.be.false
    })
  })
  describe('#isZero()', () => {
    it('should return true when amount is equal to 0', () => {
      expect(Dinero({ amount: 0 }).isZero()).to.be.true
    })
    it('should return false when amount is not equal to 0', () => {
      expect(Dinero({ amount: 100 }).isZero()).to.be.false
    })
  })
  describe('#isPositive()', () => {
    it('should return false when amount is less than 0', () => {
      expect(Dinero({ amount: -10 }).isPositive()).to.be.false
    })
    it('should return true when amount is greater than 0', () => {
      expect(Dinero({ amount: 10 }).isPositive()).to.be.true
    })
    it('should return true when amount is equal to 0', () => {
      expect(Dinero({ amount: 0 }).isPositive()).to.be.true
    })
  })
  describe('#isNegative()', () => {
    it('should return true when amount is less than 0', () => {
      expect(Dinero({ amount: -10 }).isNegative()).to.be.true
    })
    it('should return false when amount is greater than 0', () => {
      expect(Dinero({ amount: 10 }).isNegative()).to.be.false
    })
    it('should return false when amount is equal to 0', () => {
      expect(Dinero({ amount: 0 }).isNegative()).to.be.false
    })
  })
  describe('#hasCents()', () => {
    it('should return false when amount is a multiple of 100', () => {
      expect(Dinero({ amount: 1100 }).hasCents()).to.be.false
    })
    it('should return true when amount is not a multiple of 100', () => {
      expect(Dinero({ amount: 1150 }).hasCents()).to.be.true
    })
  })
  describe('#hasSameCurrency()', () => {
    it('should return true when both currencies are equal', () => {
      expect(
        Dinero({ amount: 2000, currency: 'EUR' }).hasSameCurrency(
          Dinero({ amount: 1000, currency: 'EUR' })
        )
      ).to.be.true
    })
    it('should return false when both currencies are not equal', () => {
      expect(
        Dinero({ amount: 1000, currency: 'EUR' }).hasSameCurrency(
          Dinero({ amount: 1000, currency: 'USD' })
        )
      ).to.be.false
    })
  })
  describe('#hasSameAmount()', () => {
    it('should return true when both amounts are equal', () => {
      expect(
        Dinero({ amount: 1000, currency: 'EUR' }).hasSameAmount(
          Dinero({ amount: 1000 })
        )
      ).to.be.true
    })
    it('should return false when both amounts are not equal', () => {
      expect(
        Dinero({ amount: 2000, currency: 'EUR' }).hasSameAmount(
          Dinero({ amount: 1000, currency: 'EUR' })
        )
      ).to.be.false
    })
  })
  describe('#toFormat()', () => {})
  describe('#toUnit()', () => {
    it('should return the amount divided by 100', () => {
      expect(Dinero({ amount: 1050 }).toUnit()).to.equal(10.5)
    })
  })
  describe('#toObject()', () => {
    it('should return an object literal with the right data', () => {
      expect(Dinero({ amount: 500, currency: 'EUR' }).toObject()).to.deep.equal(
        { amount: 500, currency: 'EUR' }
      )
    })
  })
})
