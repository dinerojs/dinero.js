/**
 * Default values for all Dinero objects.
 *
 * You can override default values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
 * Existing instances won't be affected.
 *
 * @property {Number} defaultAmount - The default amount for new Dinero objects (see {@link module:Dinero Dinero} for format).
 * @property {String} defaultCurrency - The default currency for new Dinero objects (see {@link module:Dinero Dinero} for format).
 *
 * @example
 * // Will set currency to 'EUR' for all Dinero objects.
 * Dinero.defaultCurrency = 'EUR'
 *
 * @type {Object}
 */
export const Defaults = {
  defaultAmount: 0,
  defaultCurrency: 'USD'
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
 * @property {String}  globalForexApi.basePath - The global forex API base path for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 * @property {Object}  globalForexApi.queryString - The global forex API query parameters for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 * @property {String}  globalForexApi.ratesRoot - The global forex API rates root for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 * @property {Object}  globalForexApi.headers - The global forex API headers for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 *
 * @example
 * // Will set locale to 'fr-FR' for all Dinero objects.
 * Dinero.globalLocale = 'fr-FR'
 * @example
 * // Will set global forex API parameters for all Dinero objects.
 * Dinero.globalForexApi = {
 *  basePath: 'https://forex.api/latest',
 *  queryString: {
 *    base: '{{from}}',
 *    alphabetical: true
 *  },
 *  ratesRoot: 'rates',
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
  globalForexApi: {
    basePath: '',
    queryString: {},
    ratesRoot: '',
    headers: {}
  }
}
