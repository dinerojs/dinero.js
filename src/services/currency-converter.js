import { getJSON, flattenObject } from './helpers'

export default function CurrencyConverter(options) {
  /* istanbul ignore next */
  const mergeTags = (string = '', tags) => {
    for (const tag in tags) {
      string = string.replace(`{{${tag}}}`, tags[tag])
    }
    return string
  }

  return {
    /**
     * Returns the exchange rate.
     * @ignore
     *
     * @param  {String} from - The base currency.
     * @param  {String} to   - The destination currency.
     *
     * @return {Promise}
     */
    getExchangeRate(from, to) {
      return getJSON(mergeTags(options.endpoint, { from, to }), {
        headers: options.headers
      }).then(
        data =>
          flattenObject(data)[mergeTags(options.propertyPath, { from, to })]
      )
    }
  }
}
