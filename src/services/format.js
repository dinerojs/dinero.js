import Calculator from './calculator'
import { isUndefined } from './helpers'

const calculator = Calculator()

export default function Format(format) {
  const matches = /^(?:(\$|USD)?0(?:(,)0)?(\.)?(0+)?|0(?:(,)0)?(\.)?(0+)?\s?(dollar)?)$/gm.exec(
    format
  )

  return {
    /**
     * Returns the matches.
     * @ignore
     *
     * @return {Array}
     */
    getMatches() {
      return matches !== null
        ? matches.slice(1).filter(match => !isUndefined(match))
        : []
    },
    /**
     * Returns the amount of fraction digits to display.
     * @ignore
     *
     * @return {Number}
     */
    getMinimumFractionDigits() {
      const decimalPosition = match => match === '.'
      return !isUndefined(this.getMatches().find(decimalPosition))
        ? this.getMatches()[
            calculator.add(this.getMatches().findIndex(decimalPosition), 1)
          ].split('').length
        : 0
    },
    /**
     * Returns the currency display mode.
     * @ignore
     *
     * @return {String}
     */
    getCurrencyDisplay() {
      const modes = {
        USD: 'code',
        dollar: 'name',
        $: 'symbol'
      }
      return modes[
        this.getMatches().find(match => {
          return match === 'USD' || match === 'dollar' || match === '$'
        })
      ]
    },
    /**
     * Returns the formatting style.
     * @ignore
     *
     * @return {String}
     */
    getStyle() {
      return !isUndefined(this.getCurrencyDisplay(this.getMatches()))
        ? 'currency'
        : 'decimal'
    },
    /**
     * Returns whether grouping should be used or not.
     * @ignore
     *
     * @return {Boolean}
     */
    getUseGrouping() {
      return !isUndefined(this.getMatches().find(match => match === ','))
    }
  }
}
