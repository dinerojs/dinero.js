export default {
  getMatches(format) {
    const matches = /^(?:(\$|USD)?(?:0(,))?(?:0(\.))?(0+)|(?:0(,))?(?:0(\.))?(0+)\s?(dollar)?)$/gm.exec(
      format
    )
    return matches !== null
      ? matches.slice(1).filter(match => typeof match !== 'undefined')
      : matches
  },
  isGrouping(matches) {
    return typeof matches.find(match => match === ',') !== 'undefined'
  },
  getDecimalPlaces(matches) {
    const getDecimal = match => match === '.'
    return typeof matches.find(getDecimal) !== 'undefined'
      ? matches[matches.findIndex(getDecimal) + 1].split('').length
      : 0
  },
  getDisplayMode(matches) {
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
  getStyle(matches) {
    return typeof this.getDisplayMode(matches) !== 'undefined'
      ? 'currency'
      : 'decimal'
  }
}
