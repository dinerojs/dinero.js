import CurrencyConverter from '../../src/services/currency-converter'
import { getJSON } from '../../src/services/helpers'

jest.mock('../../src/services/helpers', () =>
  Object.assign(require.requireActual('../../src/services/helpers'), {
    getJSON: jest.fn()
  })
)

const options = {
  endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
  propertyPath: 'rates.{{to}}',
  headers: {
    'user-key': 'xxxxxxxxx'
  },
  roundingMode: 'HALF_UP'
}

describe('CurrencyConverter', () => {
  describe('#getExchangeRate()', () => {
    test('should return a rate as a number when input and output currencies are valid', async () => {
      getJSON.mockResolvedValue({
        base: 'USD',
        date: '2018-03-31',
        rates: {
          EUR: 0.81162
        }
      })
      await expect(
        CurrencyConverter(options).getExchangeRate('USD', 'EUR')
      ).resolves.toEqual(0.81162)
    })
    test('should return a rate as a number when options.endpoint is defined with a custom Promise', async () => {
      await expect(
        CurrencyConverter(
          Object.assign({}, options, {
            endpoint: new Promise(resolve =>
              resolve({
                rates: {
                  EUR: 0.81162
                }
              })
            )
          })
        ).getExchangeRate('USD', 'EUR')
      ).resolves.toEqual(0.81162)
    })
    test('should return a rate as a number when options.endpoint is defined with a custom function', async () => {
      await expect(
        CurrencyConverter(
          Object.assign({}, options, {
            endpoint: async ({ from: to }) => {
              return Promise.resolve({ rates: { EUR: 0.81162 } })
            }
          })
        ).getExchangeRate('USD', 'EUR')
      ).resolves.toEqual(0.81162)
    })
    test('should throw when custon function rejects', async () => {
      await expect(
        CurrencyConverter(
          Object.assign({}, options, {
            endpoint: async ({ from: to }) => {
              return Promise.reject(new Error())
            }
          })
        ).getExchangeRate('USD', 'EUR')
      ).rejects.toThrow()
    })
    test('should throw when API returns an error', async () => {
      getJSON.mockRejectedValue(new Error())
      await expect(
        CurrencyConverter(options).getExchangeRate('USD', 'EUR')
      ).rejects.toThrow()
    })
  })
})
