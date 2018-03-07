export default function Format(format, regex) {
  const matches = regex.exec(format)

  return {
    getMatches() {
      return matches !== null
        ? matches.slice(1).filter(match => typeof match !== 'undefined')
        : matches
    },
    getDecimalPlaces() {
      const decimalPosition = match => match === '.'
      return typeof matches.find(decimalPosition) !== 'undefined'
        ? matches[matches.findIndex(decimalPosition) + 1].split('').length
        : 0
    },
    getDisplayMode() {
      const modes = {
        USD: 'code',
        dollar: 'name',
        $: 'symbol'
      }
      return modes[
        matches.find(match => {
          return match === 'USD' || match === 'dollar' || match === '$'
        })
      ]
    },
    getStyle() {
      return typeof this.getDisplayMode(matches) !== 'undefined'
        ? 'currency'
        : 'decimal'
    },
    isGrouping() {
      return typeof matches.find(match => match === ',') !== 'undefined'
    }
  }
}
