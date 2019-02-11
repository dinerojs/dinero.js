import { getJSON, flattenObject, isThenable } from './helpers'

export default function CurrencyConverter(options) {
  /* istanbul ignore next */
  const mergeTags = (string = '', tags) => {
    for (const tag in tags) {
      string = string.replace(`{{${tag}}}`, tags[tag])
    }
    return string
  }

  /* istanbul ignore next */
  const getRatesFromRestApi = (from, to) =>
    getJSON(mergeTags(options.endpoint, { from, to }), {
      headers: options.headers
    })

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
      return (isThenable(options.endpoint)
        ? options.endpoint
        : getRatesFromRestApi(from, to)
      ).then(
        data =>
          flattenObject(data)[mergeTags(options.propertyPath, { from, to })]
      )
    }
  }
}
