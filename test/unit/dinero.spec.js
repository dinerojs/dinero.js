import Dinero from '../../src/dinero'

describe('Dinero', () => {
  describe('#getAmount()', () => {
    test('should return the right amount as a number', () => {
      expect(Dinero({ amount: 500 }).getAmount()).toBe(500)
    })
    test('should return the default amount as a number when no amount is specified', () => {
      expect(Dinero().getAmount()).toBe(0)
    })
  })
  describe('#getCurrency()', () => {
    test('should return the right currency as a string', () => {
      expect(Dinero({ currency: 'EUR' }).getCurrency()).toBe('EUR')
    })
    test('should return the default currency as a string when no currency is specified', () => {
      expect(Dinero().getCurrency()).toBe('USD')
    })
  })
  describe('#getLocale()', () => {
    test('should return the right locale as a string', () => {
      expect(
        Dinero()
          .setLocale('fr-FR')
          .getLocale()
      ).toBe('fr-FR')
    })
    test('should return the default locale as a string when no locale is specified', () => {
      expect(Dinero().getLocale()).toBe('en-US')
    })
    test('should return the globally set locale as a string when no locale is specified', () => {
      Dinero.globalLocale = 'en-GB'
      expect(Dinero().getLocale()).toBe('en-GB')
      Dinero.globalLocale = 'en-US'
    })
    test('should return the initial locale when global locale is redefined', () => {
      const price = Dinero()
      Dinero.globalLocale = 'fr-FR'
      expect(price.getLocale()).toBe('en-US')
      Dinero.globalLocale = 'en-US'
    })
  })
  describe('#setLocale()', () => {
    test('should return a new Dinero object with the right locale as a string', () => {
      expect(
        Dinero()
          .setLocale('de-DE')
          .getLocale()
      ).toBe('de-DE')
    })
    test('should return a new Dinero object with the right locale as a string even if a locale was set globally', () => {
      Dinero.globalLocale = 'fr-FR'
      expect(
        Dinero()
          .setLocale('ja-JP')
          .getLocale()
      ).toBe('ja-JP')
      Dinero.globalLocale = 'en-US'
    })
    test('should carry over the locale when chaining methods', () => {
      expect(
        Dinero()
          .setLocale('ja-JP')
          .multiply(4)
          .getLocale()
      ).toBe('ja-JP')
    })
  })
  describe('#add()', () => {
    test('should return a new Dinero object with same amount plus the amount of the other', () => {
      expect(
        Dinero({ amount: 400 })
          .add(Dinero({ amount: 200 }))
          .toObject()
      ).toMatchObject({ amount: 600 })
    })
  })
  describe('#subtract()', () => {
    test('should return a new Dinero object with same amount minus the amount of the other', () => {
      expect(
        Dinero({ amount: 400 })
          .subtract(Dinero({ amount: 200 }))
          .toObject()
      ).toMatchObject({ amount: 200 })
    })
  })
  describe('#multiply()', () => {
    test('should return a new Dinero object with an amount multiplied by the given factor', () => {
      expect(
        Dinero({ amount: 400 })
          .multiply(4)
          .toObject()
      ).toMatchObject({
        amount: 1600
      })
    })
  })
  describe('#divide()', () => {
    test('should return a new Dinero object with an amount divided by the given factor', () => {
      expect(
        Dinero({ amount: 400 })
          .divide(4)
          .toObject()
      ).toMatchObject({ amount: 100 })
    })
  })
  describe('#percentage()', () => {
    test('should return a new Dinero object representing a percentage of the original', () => {
      expect(
        Dinero({ amount: 10000 })
          .percentage(50)
          .toObject()
      ).toMatchObject({ amount: 5000 })
    })
  })
  describe('#allocate()', () => {
    test('should allocate the amount of the Dinero object into new ones and distribute the remainder when given percentages', () => {
      const shares = Dinero({ amount: 1003 }).allocate([50, 50])
      expect(shares[0].getAmount()).toBe(502)
      expect(shares[1].getAmount()).toBe(501)
    })
    test('should allocate the amount of the Dinero object into new ones and distribute the remainder when given ratios', () => {
      const shares = Dinero({ amount: 100 }).allocate([1, 3])
      expect(shares[0].getAmount()).toBe(25)
      expect(shares[1].getAmount()).toBe(75)
    })
    test('should throw when one of the ratios equals to zero', () => {
      expect(() => Dinero({ amount: 1003 }).allocate([60, 0, 10, 30])).toThrow()
    })
    test('should throw when one of the ratios is negative', () => {
      expect(() => Dinero({ amount: 1003 }).allocate([-50, -50])).toThrow()
    })
    test('should throw when array of ratios is empty', () => {
      expect(() => Dinero({ amount: 1003 }).allocate([])).toThrow()
    })
  })
  describe('#equalsTo()', () => {
    test('should return true when both amount and currencies are equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'EUR' }).equalsTo(
          Dinero({ amount: 500, currency: 'EUR' })
        )
      ).toBe(true)
    })
    test('should return false when both amount are not equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'EUR' }).equalsTo(
          Dinero({ amount: 800, currency: 'EUR' })
        )
      ).toBe(false)
    })
    test('should return false when both currencies are not equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'USD' }).equalsTo(
          Dinero({ amount: 500, currency: 'EUR' })
        )
      ).toBe(false)
    })
    test('should return false when both amount and currencies are not equal', () => {
      expect(
        Dinero({ amount: 500, currency: 'USD' }).equalsTo(
          Dinero({ amount: 800, currency: 'EUR' })
        )
      ).toBe(false)
    })
  })
  describe('#lessThan()', () => {
    test('should return true when amount is less than other amount', () => {
      expect(Dinero({ amount: 500 }).lessThan(Dinero({ amount: 800 }))).toBe(
        true
      )
    })
    test('should return false when amount is greater than other amount', () => {
      expect(Dinero({ amount: 800 }).lessThan(Dinero({ amount: 500 }))).toBe(
        false
      )
    })
  })
  describe('#lessThanOrEqual()', () => {
    test('should return true when amount is less than other amount', () => {
      expect(
        Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 800 }))
      ).toBe(true)
    })
    test('should return true when amount is equal to other amount', () => {
      expect(
        Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 500 }))
      ).toBe(true)
    })
    test('should return true when amount is greater than other amount', () => {
      expect(
        Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 300 }))
      ).toBe(false)
    })
  })
  describe('#greaterThan()', () => {
    test('should return false when amount is less than other amount', () => {
      expect(Dinero({ amount: 500 }).greaterThan(Dinero({ amount: 800 }))).toBe(
        false
      )
    })
    test('should return true when amount is greater than other amount', () => {
      expect(Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 500 }))).toBe(
        true
      )
    })
  })
  describe('#greaterThanOrEqual()', () => {
    test('should return true when amount is greater than other amount', () => {
      expect(
        Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 300 }))
      ).toBe(true)
    })
    test('should return true when amount is equal to other amount', () => {
      expect(
        Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 500 }))
      ).toBe(true)
    })
    test('should return true when amount is lesser than other amount', () => {
      expect(
        Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 800 }))
      ).toBe(false)
    })
  })
  describe('#isZero()', () => {
    test('should return true when amount is equal to 0', () => {
      expect(Dinero({ amount: 0 }).isZero()).toBe(true)
    })
    test('should return false when amount is not equal to 0', () => {
      expect(Dinero({ amount: 100 }).isZero()).toBe(false)
    })
  })
  describe('#isPositive()', () => {
    test('should return false when amount is less than 0', () => {
      expect(Dinero({ amount: -10 }).isPositive()).toBe(false)
    })
    test('should return true when amount is greater than 0', () => {
      expect(Dinero({ amount: 10 }).isPositive()).toBe(true)
    })
    test('should return true when amount is equal to 0', () => {
      expect(Dinero({ amount: 0 }).isPositive()).toBe(true)
    })
  })
  describe('#isNegative()', () => {
    test('should return true when amount is less than 0', () => {
      expect(Dinero({ amount: -10 }).isNegative()).toBe(true)
    })
    test('should return false when amount is greater than 0', () => {
      expect(Dinero({ amount: 10 }).isNegative()).toBe(false)
    })
    test('should return false when amount is equal to 0', () => {
      expect(Dinero({ amount: 0 }).isNegative()).toBe(false)
    })
  })
  describe('#hasCents()', () => {
    test('should return false when amount is a multiple of 100', () => {
      expect(Dinero({ amount: 1100 }).hasCents()).toBe(false)
    })
    test('should return true when amount is not a multiple of 100', () => {
      expect(Dinero({ amount: 1150 }).hasCents()).toBe(true)
    })
  })
  describe('#hasSameCurrency()', () => {
    test('should return true when both currencies are equal', () => {
      expect(
        Dinero({ amount: 2000, currency: 'EUR' }).hasSameCurrency(
          Dinero({ amount: 1000, currency: 'EUR' })
        )
      ).toBe(true)
    })
    test('should return false when both currencies are not equal', () => {
      expect(
        Dinero({ amount: 1000, currency: 'EUR' }).hasSameCurrency(
          Dinero({ amount: 1000, currency: 'USD' })
        )
      ).toBe(false)
    })
  })
  describe('#hasSameAmount()', () => {
    test('should return true when both amounts are equal', () => {
      expect(
        Dinero({ amount: 1000, currency: 'EUR' }).hasSameAmount(
          Dinero({ amount: 1000 })
        )
      ).toBe(true)
    })
    test('should return false when both amounts are not equal', () => {
      expect(
        Dinero({ amount: 2000, currency: 'EUR' }).hasSameAmount(
          Dinero({ amount: 1000, currency: 'EUR' })
        )
      ).toBe(false)
    })
  })
  describe('#toFormat()', () => {
    test('should return the properly formatted amount (default)', () => {
      expect(Dinero({ amount: 200000, currency: 'EUR' }).toFormat()).toBe(
        '€2,000.00'
      )
    })
    test('should return the properly formatted amount (one fraction digit)', () => {
      expect(Dinero({ amount: 200000, currency: 'EUR' }).toFormat('0.0')).toBe(
        '2000.0'
      )
    })
    test('should return the properly formatted amount (one fraction digit, rounded)', () => {
      expect(Dinero({ amount: 1155, currency: 'EUR' }).toFormat('0.0')).toBe(
        '11.6'
      )
    })
    test('should return the properly formatted amount (use grouping)', () => {
      expect(Dinero({ amount: 200000, currency: 'EUR' }).toFormat('0,0')).toBe(
        '2,000'
      )
    })
    test('should return the properly formatted amount (use grouping, two fraction digits)', () => {
      expect(
        Dinero({ amount: 200000, currency: 'EUR' }).toFormat('0,0.00')
      ).toBe('2,000.00')
    })
    test('should return the properly formatted amount (currency symbol)', () => {
      expect(Dinero({ amount: 200000, currency: 'EUR' }).toFormat('$0')).toBe(
        '€2000'
      )
    })
    test('should return the properly formatted amount (currency symbol, one fraction unit)', () => {
      expect(Dinero({ amount: 200000, currency: 'EUR' }).toFormat('$0.0')).toBe(
        '€2000.0'
      )
    })
    test('should return the properly formatted amount (currency symbol, use grouping)', () => {
      expect(Dinero({ amount: 200000, currency: 'EUR' }).toFormat('$0,0')).toBe(
        '€2,000'
      )
    })
    test('should return the properly formatted amount, (currency symbol, use grouping, two fraction digits)', () => {
      expect(
        Dinero({ amount: 200000, currency: 'EUR' }).toFormat('$0,0.00')
      ).toBe('€2,000.00')
    })
    test('should return the properly formatted amount, (currency code, use grouping, two fraction digits)', () => {
      expect(
        Dinero({ amount: 200000, currency: 'EUR' }).toFormat('USD0,0.00')
      ).toBe('EUR2,000.00')
    })
    test('should return the properly formatted amount, (currency name, use grouping, two fraction digits)', () => {
      expect(
        Dinero({ amount: 200000, currency: 'EUR' }).toFormat('0,0.00 dollar')
      ).toBe('2,000.00 euros')
    })
    test('should return the initial format when global format is redefined', () => {
      const price = Dinero()
      Dinero.globalFormat = '0.0'
      expect(price.toFormat()).toBe('$0.00')
      Dinero.globalFormat = '$0,0.00'
    })
  })
  describe('#toUnit()', () => {
    test('should return the amount divided by 100', () => {
      expect(Dinero({ amount: 1050 }).toUnit()).toBe(10.5)
    })
  })
  describe('#toRoundedUnit()', () => {
    test('should return the amount divided by 100, rounded to one fraction digit', () => {
      expect(Dinero({ amount: 1055 }).toRoundedUnit(1)).toBe(10.6)
    })
  })
  describe('#toObject()', () => {
    test('should return an object literal with the right data', () => {
      expect(Dinero({ amount: 500, currency: 'EUR' }).toObject()).toEqual({
        amount: 500,
        currency: 'EUR'
      })
    })
  })
})
