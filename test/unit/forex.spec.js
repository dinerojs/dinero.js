import Forex from '../../src/services/forex'
import { getJSON } from '../../src/services/helpers'

jest.mock('../../src/services/helpers')

const options = {
  basePath: 'https://forex.api/latest',
  queryString: {
    base: '{{from}}',
    alphabetical: true
  },
  ratesRoot: 'rates',
  headers: {
    'user-key': 'xxxxxxxxx'
  },
  roundingMode: 'HALF_UP'
}

describe('Forex', () => {
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
        Forex(options).getExchangeRate('USD', 'EUR')
      ).resolves.toEqual(0.81162)
    })
    test('should throw when API returns an error', async () => {
      getJSON.mockRejectedValue(new Error())
      await expect(
        Forex(options).getExchangeRate('USD', 'EUR')
      ).rejects.toThrow()
    })
  })
})
