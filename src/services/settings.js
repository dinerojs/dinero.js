/**
 * Default values for all Dinero objects.
 *
 * You can override default values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
 * Existing instances won't be affected.
 *
 * @property {Number} defaultAmount - The default amount for new Dinero objects.
 * @property {String} defaultCurrency - The default currency for new Dinero objects.
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
 * @property {String}  globalLocale - The global locale for new Dinero objects.
 * @property {String}  globalCurrencyDisplay - The global currency display mode for new Dinero objects.
 * @property {Boolean} globalUseGrouping - The global grouping option for new Dinero objects.
 * @property {Number}  globalMinimumFractionDigits - The global number of fraction digits for new Dinero objects.
 *
 * @example
 * // Will set locale to 'fr-FR' for all Dinero objects.
 * Dinero.globalLocale = 'fr-FR'
 *
 * @type {Object}
 */
export const Globals = {
  globalLocale: 'en-US',
  globalCurrencyDisplay: 'symbol',
  globalUseGrouping: false,
  globalMinimumFractionDigits: 2
}
