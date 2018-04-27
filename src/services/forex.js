import { getJSON, objectToParams } from './helpers'

export default function Forex(options) {
  /* istanbul ignore next */
  const mergeQueryString = (querystring = '', tags) => {
    for (const tag in tags) {
      querystring = querystring.replace(
        encodeURIComponent(`{{${tag}}}`),
        encodeURIComponent(tags[tag])
      )
    }
    return querystring
  }

  return {
    /**
     * Returns the exchange rate.
     * @param  {String} from - The base currency.
     * @param  {String} to   - The destination currency.
     * @return {Promise}
     * @ignore
     */
    getExchangeRate(from, to) {
      return getJSON(
        mergeQueryString(
          options.basePath + objectToParams(options.queryString),
          { from, to }
        ),
        {
          headers: options.headers
        }
      ).then(data => data[options.ratesRoot][to])
    }
  }
}
