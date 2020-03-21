/**
 * Returns whether a value is numeric.
 * @ignore
 *
 * @param  {} value - The value to test.
 *
 * @return {Boolean}
 */
export function isNumeric(value) {
  return !isNaN(parseInt(value)) && isFinite(value)
}

/**
 * Returns whether a value is a percentage.
 * @ignore
 *
 * @param  {}  percentage - The percentage to test.
 *
 * @return {Boolean}
 */
export function isPercentage(percentage) {
  return isNumeric(percentage) && percentage <= 100 && percentage >= 0
}

/**
 * Returns whether an array of ratios is valid.
 * @ignore
 *
 * @param  {}  ratios - The ratios to test.
 *
 * @return {Boolean}
 */
export function areValidRatios(ratios) {
  return (
    ratios.length > 0 &&
    ratios.every(ratio => ratio >= 0) &&
    ratios.some(ratio => ratio > 0)
  )
}

/**
 * Returns whether a value is even.
 * @ignore
 *
 * @param  {Number} value - The value to test.
 *
 * @return {Boolean}
 */
export function isEven(value) {
  return value % 2 === 0
}

/**
 * Returns whether a value is a float.
 * @ignore
 *
 * @param  {}  value - The value to test.
 *
 * @return {Boolean}
 */
export function isFloat(value) {
  return isNumeric(value) && !Number.isInteger(value)
}

/**
 * Returns how many fraction digits a number has.
 * @ignore
 *
 * @param  {Number} [number=0] - The number to test.
 *
 * @return {Number}
 */
export function countFractionDigits(number = 0) {
  const stringRepresentation = number.toString()
  if (stringRepresentation.indexOf('e-') > 0) {
    // It's too small for a normal string representation, e.g. 1e-7 instead of 0.00000001
    return parseInt(stringRepresentation.split('e-')[1])
  } else {
    const fractionDigits = stringRepresentation.split('.')[1]
    return fractionDigits ? fractionDigits.length : 0
  }
}

/**
 * Returns whether a number is half.
 * @ignore
 *
 * @param {Number} number - The number to test.
 *
 * @return {Number}
 */
export function isHalf(number) {
  return Math.abs(number) % 1 === 0.5
}

/**
 * Fetches a JSON resource.
 * @ignore
 *
 * @param  {String} url - The resource to fetch.
 * @param  {Object} [options.headers] - The headers to pass.
 *
 * @throws {Error} If `request.status` is lesser than 200 or greater or equal to 400.
 * @throws {Error} If network fails.
 *
 * @return {JSON}
 */
export function getJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const request = Object.assign(new XMLHttpRequest(), {
      onreadystatechange() {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 400)
            resolve(JSON.parse(request.responseText))
          else reject(new Error(request.statusText))
        }
      },
      onerror() {
        reject(new Error('Network error'))
      }
    })

    request.open('GET', url, true)
    setXHRHeaders(request, options.headers)
    request.send()
  })
}

/**
 * Returns an XHR object with attached headers.
 * @ignore
 *
 * @param {XMLHttpRequest} xhr - The XHR request to set headers to.
 * @param {Object} headers - The headers to set.
 *
 * @return {XMLHttpRequest}
 */
export function setXHRHeaders(xhr, headers = {}) {
  for (const header in headers) xhr.setRequestHeader(header, headers[header])
  return xhr
}

/**
 * Returns whether a value is undefined.
 * @ignore
 *
 * @param {} value - The value to test.
 *
 * @return {Boolean}
 */
export function isUndefined(value) {
  return typeof value === 'undefined'
}

/**
 * Returns an object flattened to one level deep.
 * @ignore
 *
 * @param {Object} object - The object to flatten.
 * @param {String} separator - The separator to use between flattened nodes.
 *
 * @return {Object}
 */
export function flattenObject(object, separator = '.') {
  const finalObject = {}
  Object.entries(object).forEach(item => {
    if (typeof item[1] === 'object') {
      const flatObject = flattenObject(item[1])
      Object.entries(flatObject).forEach(node => {
        finalObject[item[0] + separator + node[0]] = node[1]
      })
    } else {
      finalObject[item[0]] = item[1]
    }
  })
  return finalObject
}

/**
 * Returns whether a value is thenable.
 * @ignore
 *
 * @param {} value - The value to test.
 *
 * @return {Boolean}
 */
export function isThenable(value) {
  return (
    Boolean(value) &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof value.then === 'function'
  )
}
