import Dinero from '../../src/dinero'
import { getJSON } from '../../src/services/helpers'

jest.mock('../../src/services/helpers', () =>
  Object.assign(require.requireActual('../../src/services/helpers'), {
    getJSON: jest.fn()
  })
)

describe('Dinero', () => {
  describe('instantiation', () => {
    test('should return a new Dinero object when arguments are valid', () => {
      expect(Dinero({ amount: 500 })).toBeTruthy()
      expect(Dinero({ precision: 2 })).toBeTruthy()
    })
    test('should throw when amount is a float', () => {
      expect(() => Dinero({ amount: 0.1 })).toThrow()
    })
    test('should throw when amount is a string', () => {
      expect(() => Dinero({ amount: '100' })).toThrow()
    })
    test('should throw when precision is a float', () => {
      expect(() => Dinero({ precision: 0.5 })).toThrow()
    })
    test('should throw when precision is a string', () => {
      expect(() => Dinero({ precision: '3' })).toThrow()
    })
  })
  describe('#getAmount', () => {
    test('should return the right amount as a number', () => {
      expect(Dinero({ amount: 500 }).getAmount()).toBe(500)
    })
    test('should return the default amount as a number when no amount is specified', () => {
      expect(Dinero().getAmount()).toBe(0)
    })
  })
  describe('#getCurrency', () => {
    test('should return the right currency as a string', () => {
      expect(Dinero({ currency: 'EUR' }).getCurrency()).toBe('EUR')
    })
    test('should return the default currency as a string when no currency is specified', () => {
      expect(Dinero().getCurrency()).toBe('USD')
    })
  })
  describe('#getLocale', () => {
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
  describe('#setLocale', () => {
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
  describe('#getPrecision', () => {
    test('should return the right precision as a number', () => {
      expect(Dinero({ precision: 3 }).getPrecision()).toBe(3)
    })
    test('should return the default precision as a number when no precision is specified', () => {
      expect(Dinero().getPrecision()).toBe(2)
    })
  })
  describe('#convertPrecision', () => {
    test('should return a new Dinero object with a new precision and a converted amount', () => {
      expect(
        Dinero({ amount: 500, precision: 2 })
          .convertPrecision(4)
          .toObject()
      ).toMatchObject({ amount: 50000, precision: 4 })
    })
    test('should return a new Dinero object with a new precision and a converted rounded amount', () => {
      expect(
        Dinero({ amount: 14270, precision: 2 })
          .convertPrecision(0)
          .toObject()
      ).toMatchObject({ amount: 143, precision: 0 })
    })
    test('should throw when new precision is invalid', () => {
      expect(() =>
        Dinero({ amount: 500, precision: 2 })
          .convertPrecision(2.5)
          .toObject()
      ).toThrow()
    })
    test('should convert between precisions correctly', () => {
      expect(
        Dinero({ amount: 333336, precision: 5 })
          .convertPrecision(2)
          .toObject()
      ).toMatchObject({ amount: 333, precision: 2 })
    })
    test('should convert from long initial precisions correctly', () => {
      expect(
        Dinero({ amount: 3333333336, precision: 9 })
          .convertPrecision(2)
          .toObject()
      ).toMatchObject({ amount: 333, precision: 2 })
    })
  })
  describe('#add', () => {
    test('should return a new Dinero object with same amount plus the amount of the other', () => {
      expect(
        Dinero({ amount: 400 })
          .add(Dinero({ amount: 200 }))
          .toObject()
      ).toMatchObject({ amount: 600 })
    })
    test('should throw when currencies are different', () => {
      expect(() =>
        Dinero({ amount: 200, currency: 'EUR' }).add(
          Dinero({ amount: 600, currency: 'USD' })
        )
      ).toThrow()
    })
    test('should convert before adding when precisions are different', () => {
      expect(
        Dinero({ amount: 400 })
          .add(Dinero({ amount: 104545, precision: 4 }))
          .toObject()
      ).toMatchObject({ amount: 144545, precision: 4 })
    })
  })
  describe('#subtract', () => {
    test('should return a new Dinero object with same amount minus the amount of the other', () => {
      expect(
        Dinero({ amount: 400 })
          .subtract(Dinero({ amount: 200 }))
          .toObject()
      ).toMatchObject({ amount: 200 })
    })
    test('should throw when currencies are different', () => {
      expect(() =>
        Dinero({ amount: 400, currency: 'EUR' }).subtract(
          Dinero({ amount: 200, currency: 'USD' })
        )
      ).toThrow()
    })
    test('should convert before subtracting when precisions are different', () => {
      expect(
        Dinero({ amount: 104545, precision: 4 })
          .subtract(Dinero({ amount: 400 }))
          .toObject()
      ).toMatchObject({ amount: 64545, precision: 4 })
    })
  })
  describe('#multiply', () => {
    test('should return a new Dinero object with an amount multiplied by the given factor', () => {
      expect(
        Dinero({ amount: 400 })
          .multiply(4)
          .toObject()
      ).toMatchObject({ amount: 1600 })
    })
    test('should return a new Dinero object with an amount multiplied and rounded down', () => {
      expect(
        Dinero({ amount: 400 })
          .multiply(2.001)
          .toObject()
      ).toMatchObject({ amount: 800 })
    })
    test('should return a new Dinero object with an amount multiplied and rounded up', () => {
      expect(
        Dinero({ amount: 400 })
          .multiply(2.002)
          .toObject()
      ).toMatchObject({ amount: 801 })
    })
  })
  describe('#divide', () => {
    test('should return a new Dinero object with an amount divided by the given factor', () => {
      expect(
        Dinero({ amount: 400 })
          .divide(4)
          .toObject()
      ).toMatchObject({ amount: 100 })
    })
    test('should return a new Dinero object with an amount divided and rounded down', () => {
      expect(
        Dinero({ amount: 400 })
          .divide(3)
          .toObject()
      ).toMatchObject({ amount: 133 })
    })
    test('should return a new Dinero object with an amount divided and rounded up', () => {
      expect(
        Dinero({ amount: 400 })
          .divide(6)
          .toObject()
      ).toMatchObject({ amount: 67 })
    })
    test('should return a new Dinero object with an amount divided and rounded to nearest even number', () => {
      expect(
        Dinero({ amount: 105 })
          .divide(2)
          .toObject()
      ).toMatchObject({ amount: 52 })
    })
  })
  describe('#percentage', () => {
    test('should return a new Dinero object representing a percentage of the original', () => {
      expect(
        Dinero({ amount: 10000 })
          .percentage(50)
          .toObject()
      ).toMatchObject({ amount: 5000 })
    })
    test('should throw when percentage is negative', () => {
      expect(() => Dinero({ amount: 500 }).percentage(-1)).toThrow()
    })
    test('should throw when percentage is out of range', () => {
      expect(() => Dinero({ amount: 500 }).percentage(101)).toThrow()
    })
  })
  describe('#allocate', () => {
    test('should allocate the amount of the Dinero object into new ones and distribute the remainder when given percentages', () => {
      const shares = Dinero({ amount: 1003 }).allocate([50, 50])
      expect(shares.map(share => share.getAmount())).toEqual([502, 501])
    })
    test('should allocate the amount of the Dinero object into new ones and distribute the remainder when given ratios', () => {
      const shares = Dinero({ amount: 100 }).allocate([1, 3])
      expect(shares.map(share => share.getAmount())).toEqual([25, 75])
    })
    test('should not distribute the remainder to zero ratios', () => {
      const shares = Dinero({ amount: 1003 }).allocate([0, 50, 50])
      expect(shares.map(share => share.getAmount())).toEqual([0, 502, 501])
    })
    test('should throw when all ratios are equal to zero', () => {
      expect(() => Dinero({ amount: 1003 }).allocate([0, 0])).toThrow()
    })
    test('should throw when one of the ratios is negative', () => {
      expect(() => Dinero({ amount: 1003 }).allocate([-50, -50])).toThrow()
    })
    test('should throw when array of ratios is empty', () => {
      expect(() => Dinero({ amount: 1003 }).allocate([])).toThrow()
    })
  })
  describe('#convert', () => {
    beforeEach(() => {
      getJSON.mockResolvedValue({
        base: 'USD',
        date: '2018-03-31',
        rates: {
          EUR: 0.81162
        }
      })
    })
    test('should return a new converted Dinero object when base and destination currencies are valid', async () => {
      const res = await Dinero({ amount: 500 }).convert('EUR', {
        endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
        propertyPath: 'rates.{{to}}',
        headers: {
          'user-key': 'xxxxxxxxx'
        },
        roundingMode: 'HALF_UP'
      })
      expect(res.toObject()).toMatchObject({
        amount: 406,
        currency: 'EUR'
      })
    })
    test('should return a new converted Dinero object when passed a promise instead of an API endpoint', async () => {
      const res = await Dinero({ amount: 500 }).convert('EUR', {
        endpoint: new Promise(resolve =>
          resolve({
            rates: {
              EUR: 0.81162
            }
          })
        )
      })
      expect(res.toObject()).toMatchObject({
        amount: 406,
        currency: 'EUR'
      })
    })
    test('should return a new converted Dinero object with the globally set property path', async () => {
      Dinero.globalExchangeRatesApi.propertyPath = 'data.rates.{{to}}'
      const res = await Dinero({ amount: 500 }).convert('EUR', {
        endpoint: new Promise(resolve =>
          resolve({
            data: {
              rates: {
                EUR: 0.81162
              }
            }
          })
        )
      })
      expect(res.toObject()).toMatchObject({
        amount: 406,
        currency: 'EUR'
      })
    })
    test('should return a new converted Dinero object with the locally set property path event if a property path was set globally', async () => {
      Dinero.globalExchangeRatesApi.propertyPath = 'data.rates.{{to}}'
      const res = await Dinero({ amount: 500 }).convert('EUR', {
        endpoint: new Promise(resolve =>
          resolve({
            EUR: 0.81162
          })
        ),
        propertyPath: '{{to}}'
      })
      expect(res.toObject()).toMatchObject({
        amount: 406,
        currency: 'EUR'
      })
    })
    test('should throw when destination currency is not valid', async () => {
      await expect(Dinero({ amount: 500 }).convert('EURO')).rejects.toThrow()
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
    test('should return true when both amounts are equal once converted', () => {
      expect(
        Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).equalsTo(
          Dinero({ amount: 10000, currency: 'EUR', precision: 3 })
        )
      ).toBe(true)
    })
    test('should return false when both amounts are not equal once converted', () => {
      expect(
        Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).equalsTo(
          Dinero({ amount: 10000, currency: 'EUR', precision: 3 })
        )
      ).toBe(false)
    })
  })
  describe('#lessThan', () => {
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
    test('should throw when currencies are different', () => {
      expect(() =>
        Dinero({ amount: 500, currency: 'EUR' }).lessThan(
          Dinero({ amount: 800, currency: 'USD' })
        )
      ).toThrow()
    })
    test('should return true when amount is less than other amount once normalized', () => {
      expect(
        Dinero({ amount: 5000, precision: 3 }).lessThan(Dinero({ amount: 800 }))
      ).toBe(true)
    })
    test('should return false when amount is greater than other amount once normalized', () => {
      expect(
        Dinero({ amount: 800 }).lessThan(Dinero({ amount: 5000, precision: 3 }))
      ).toBe(false)
    })
  })
  describe('#lessThanOrEqual', () => {
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
    test('should return false when amount is greater than other amount', () => {
      expect(
        Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 300 }))
      ).toBe(false)
    })
    test('should throw when currencies are different', () => {
      expect(() =>
        Dinero({ amount: 500, currency: 'EUR' }).lessThanOrEqual(
          Dinero({ amount: 800, currency: 'USD' })
        )
      ).toThrow()
    })
    test('should return true when amount is less than other amount once normalized', () => {
      expect(
        Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(
          Dinero({ amount: 800 })
        )
      ).toBe(true)
    })
    test('should return true when amount is equal to other amount once normalized', () => {
      expect(
        Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(
          Dinero({ amount: 500 })
        )
      ).toBe(true)
    })
    test('should return false when amount is greater than other amount once normalized', () => {
      expect(
        Dinero({ amount: 800 }).lessThanOrEqual(
          Dinero({ amount: 5000, precision: 3 })
        )
      ).toBe(false)
    })
  })
  describe('#greaterThan', () => {
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
    test('should throw when currencies are different', () => {
      expect(() =>
        Dinero({ amount: 500, currency: 'EUR' }).greaterThan(
          Dinero({ amount: 800, currency: 'USD' })
        )
      ).toThrow()
    })
    test('should return true when amount is greater than other amount once normalized', () => {
      expect(
        Dinero({ amount: 800 }).greaterThan(
          Dinero({ amount: 5000, precision: 3 })
        )
      ).toBe(true)
    })
    test('should return false when amount is less than other amount once normalized', () => {
      expect(
        Dinero({ amount: 5000, precision: 3 }).greaterThan(
          Dinero({ amount: 800 })
        )
      ).toBe(false)
    })
  })
  describe('#greaterThanOrEqual', () => {
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
    test('should throw when currencies are different', () => {
      expect(() =>
        Dinero({ amount: 500, currency: 'EUR' }).greaterThanOrEqual(
          Dinero({ amount: 800, currency: 'USD' })
        )
      ).toThrow()
    })
    test('should return true when amount is greater than other amount once normalized', () => {
      expect(
        Dinero({ amount: 800 }).greaterThanOrEqual(
          Dinero({ amount: 5000, precision: 3 })
        )
      ).toBe(true)
    })
    test('should return true when amount is equal to other amount once normalized', () => {
      expect(
        Dinero({ amount: 500 }).greaterThanOrEqual(
          Dinero({ amount: 5000, precision: 3 })
        )
      ).toBe(true)
    })
    test('should return false when amount is less than other amount once normalized', () => {
      expect(
        Dinero({ amount: 5000, precision: 3 }).greaterThanOrEqual(
          Dinero({ amount: 800 })
        )
      ).toBe(false)
    })
  })
  describe('#isZero', () => {
    test('should return true when amount is equal to 0', () => {
      expect(Dinero({ amount: 0 }).isZero()).toBe(true)
    })
    test('should return false when amount is not equal to 0', () => {
      expect(Dinero({ amount: 100 }).isZero()).toBe(false)
    })
  })
  describe('#isPositive', () => {
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
  describe('#isNegative', () => {
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
  describe('#hasCents', () => {
    test('should return false when amount is a multiple of 100', () => {
      expect(Dinero({ amount: 1100 }).hasCents()).toBe(false)
    })
    test('should return true when amount is not a multiple of 100', () => {
      expect(Dinero({ amount: 1150 }).hasCents()).toBe(true)
    })
  })
  describe('#hasSubUnits', () => {
    test('should return false when amount is a multiple of 100', () => {
      expect(Dinero({ amount: 1100 }).hasSubUnits()).toBe(false)
    })
    test('should return false when amount is a multiple of 10 to the power of precision', () => {
      expect(Dinero({ amount: 110000, precision: 4 }).hasSubUnits()).toBe(false)
    })
    test('should return true when amount is not a multiple of 100', () => {
      expect(Dinero({ amount: 1150 }).hasSubUnits()).toBe(true)
    })
    test('should return true when amount is not a multiple of 10 to the power of precision', () => {
      expect(Dinero({ amount: 115050, precision: 4 }).hasSubUnits()).toBe(true)
    })
  })
  describe('#hasSameCurrency', () => {
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
  describe('#hasSameAmount', () => {
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
    test('should return true when both amounts are equal once converted', () => {
      expect(
        Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).hasSameAmount(
          Dinero({ amount: 10000, precision: 3 })
        )
      ).toBe(true)
    })
    test('should return false when both amounts are not equal once converted', () => {
      expect(
        Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).hasSameAmount(
          Dinero({ amount: 10000, precision: 3 })
        )
      ).toBe(false)
    })
  })
  describe('#toUnit', () => {
    test('should return the amount divided by 100', () => {
      expect(Dinero({ amount: 1050 }).toUnit()).toBe(10.5)
    })
    test('should return the amount divided by 10 to the power of precision', () => {
      expect(Dinero({ amount: 10545, precision: 3 }).toUnit()).toBe(10.545)
    })
  })
  describe('#toRoundedUnit', () => {
    test('should return the amount divided by 100, rounded to one fraction digit', () => {
      expect(Dinero({ amount: 1055 }).toRoundedUnit(1)).toBe(10.6)
    })
    test('should return the negative amount divided by 100, rounded to one fraction digit', () => {
      expect(Dinero({ amount: -1055 }).toRoundedUnit(1)).toBe(-10.6)
    })
    test('should return the amount divided by 100, rounded to two fraction digits', () => {
      expect(Dinero({ amount: 1055 }).toRoundedUnit(2)).toBe(10.55)
    })
    test('should return the amount divided by 100, rounded to no fraction digits', () => {
      expect(Dinero({ amount: 1055 }).toRoundedUnit(0)).toBe(11)
    })
  })
  describe('#toObject', () => {
    test('should return an object literal with the right data', () => {
      expect(
        Dinero({ amount: 500, currency: 'EUR', precision: 2 }).toObject()
      ).toEqual({
        amount: 500,
        currency: 'EUR',
        precision: 2
      })
    })
  })
  describe('#toJSON', () => {
    test('should return the same object as #toObject', () => {
      const price = Dinero({ amount: 500, currency: 'EUR', precision: 2 })
      expect(price.toJSON()).toEqual(price.toObject())
    })
    test('should make Dinero objects stable when using JSON.parse after JSON.stringify', () => {
      const price = Dinero({ amount: 500, currency: 'EUR', precision: 2 })
      expect(Dinero(JSON.parse(JSON.stringify(price))).equalsTo(price)).toBe(
        true
      )
    })
  })
  describe('#normalizePrecision', () => {
    test('should return an array of Dinero objects with normalized precision and converted amount', () => {
      const normalized = Dinero.normalizePrecision([
        Dinero({ amount: 100, precision: 2 }),
        Dinero({ amount: 1000, precision: 3 })
      ])
      expect(normalized[0].getAmount() && normalized[1].getAmount()).toBe(1000)
      expect(normalized[0].getPrecision() && normalized[1].getPrecision()).toBe(
        3
      )
    })
  })
  describe('#minimum', () => {
    test('should return the smallest Dinero from an array of Dinero objects', () => {
      const minimumDineroExpected = Dinero({ amount: 50, precision: 2 })
      const actualMinimum = Dinero.minimum([
        minimumDineroExpected,
        Dinero({ amount: 100, precision: 2 }),
        Dinero({ amount: 150, precision: 2 })
      ])
      expect(actualMinimum.toJSON()).toEqual(minimumDineroExpected.toJSON())
    })
    test('should return the smallest Dinero from an array of Dinero objects with different precisions', () => {
      const minimumDineroExpected = Dinero({ amount: 500, precision: 3 })
      const actualMinimum = Dinero.minimum([
        Dinero({ amount: 150, precision: 2 }),
        minimumDineroExpected,
        Dinero({ amount: 100, precision: 2 })
      ])
      expect(actualMinimum.toJSON()).toEqual(minimumDineroExpected.toJSON())
    })
  })
  describe('#maximum', () => {
    test('should return the biggest Dinero from an array of Dinero objects', () => {
      const maximumDineroExpected = Dinero({ amount: 200, precision: 2 })
      const actualMaximum = Dinero.maximum([
        maximumDineroExpected,
        Dinero({ amount: 50, precision: 2 }),
        Dinero({ amount: 150, precision: 2 })
      ])
      expect(actualMaximum.toJSON()).toEqual(maximumDineroExpected.toJSON())
    })
    test('should return the biggest Dinero from an array of Dinero objects, with different precisions', () => {
      const maximumDineroExpected = Dinero({ amount: 20, precision: 2 })
      const actualMaximum = Dinero.maximum([
        Dinero({ amount: 150, precision: 3 }),
        maximumDineroExpected,
        Dinero({ amount: 100, precision: 3 })
      ])
      expect(actualMaximum.toJSON()).toEqual(maximumDineroExpected.toJSON())
    })
  })
})
