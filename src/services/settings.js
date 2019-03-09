/**
 * Default values for all Dinero objects.
 *
 * You can override default values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
 * Existing instances won't be affected.
 *
 * @property {Number} defaultAmount - The default amount for new Dinero objects (see {@link module:Dinero Dinero} for format).
 * @property {String} defaultCurrency - The default currency for new Dinero objects (see {@link module:Dinero Dinero} for format).
 * @property {Number} defaultPrecision - The default precision for new Dinero objects (see {@link module:Dinero Dinero} for format).
 *
 * @example
 * // Will set currency to 'EUR' for all Dinero objects.
 * Dinero.defaultCurrency = 'EUR'
 *
 * @type {Object}
 */
export const Defaults = {
  defaultAmount: 0,
  defaultCurrency: 'USD',
  defaultPrecision: 2
}

/**
 * Global settings for all Dinero objects.
 *
 * You can override global values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
 * Existing instances won't be affected.
 *
 * @property {String}  globalLocale - The global locale for new Dinero objects (see {@link module:Dinero~setLocale setLocale} for format).
 * @property {String}  globalFormat - The global format for new Dinero objects (see {@link module:Dinero~toFormat toFormat} for format).
 * @property {String}  globalRoundingMode - The global rounding mode for new Dinero objects (see {@link module:Dinero~multiply multiply} or {@link module:Dinero~divide divide} for format).
 * @property {String}  globalFormatRoundingMode - The global rounding mode to format new Dinero objects (see {@link module:Dinero~toFormat toFormat} or {@link module:Dinero~toRoundedUnit toRoundedUnit} for format).
 * @property {(String|Promise)}  globalExchangeRatesApi.endpoint - The global exchange rate API endpoint for new Dinero objects, or the global promise that resolves to the exchanges rates (see {@link module:Dinero~convert convert} for format).
 * @property {String}  globalExchangeRatesApi.propertyPath - The global exchange rate API property path for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 * @property {Object}  globalExchangeRatesApi.headers - The global exchange rate API headers for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 *
 * @example
 * // Will set locale to 'fr-FR' for all Dinero objects.
 * Dinero.globalLocale = 'fr-FR'
 * @example
 * // Will set global exchange rate API parameters for all Dinero objects.
 * Dinero.globalExchangeRatesApi = {
 *  endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
 *  propertyPath: 'data.rates.{{to}}',
 *  headers: {
 *    'user-key': 'xxxxxxxxx'
 *  }
 * }
 *
 * @type {Object}
 */
export const Globals = {
  globalLocale: 'en-US',
  globalFormat: '$0,0.00',
  globalRoundingMode: 'HALF_EVEN',
  globalFormatRoundingMode: 'HALF_AWAY_FROM_ZERO',
  globalExchangeRatesApi: {
    endpoint: undefined,
    headers: undefined,
    propertyPath: undefined
  }
}
