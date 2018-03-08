export default function Format(format) {
  const matches = /^(?:(\$|USD)?0(?:(,)0)?(\.)?(0+)?|0(?:(,)0)?(\.)?(0+)?\s?(dollar)?)$/gm.exec(
    format
  )

  return {
    /**
     * Returns the matches.
     * @return {Array}
     * @ignore
     */
    getMatches() {
      return matches !== null
        ? matches.slice(1).filter(match => typeof match !== 'undefined')
        : []
    },
    /**
     * Returns the amount of fraction digits to display.
     * @return {Number}
     * @ignore
     */
    getMinimumFractionDigits() {
      const decimalPosition = match => match === '.'
      return typeof this.getMatches().find(decimalPosition) !== 'undefined'
        ? this.getMatches()[
            this.getMatches().findIndex(decimalPosition) + 1
          ].split('').length
        : 0
    },
    /**
     * Returns the currency display mode.
     * @return {String}
     * @ignore
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
     * @return {String}
     * @ignore
     */
    getStyle() {
      return typeof this.getCurrencyDisplay(this.getMatches()) !== 'undefined'
        ? 'currency'
        : 'decimal'
    },
    /**
     * Returns whether grouping should be used or not.
     * @return {Boolean}
     * @ignore
     */
    getUseGrouping() {
      return (
        typeof this.getMatches().find(match => match === ',') !== 'undefined'
      )
    }
  }
}
