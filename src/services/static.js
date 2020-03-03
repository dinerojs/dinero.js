/**
 * Static methods for Dinero.
 * @ignore
 *
 * @type {Object}
 */
export default {
  /**
   * Returns an array of Dinero objects, normalized to the same precision (the highest).
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} objects - An array of Dinero objects
   *
   * @example
   * // returns an array of Dinero objects
   * // both with a precision of 3
   * // and an amount of 1000
   * Dinero.normalizePrecision([
   *   Dinero({ amount: 100, precision: 2 }),
   *   Dinero({ amount: 1000, precision: 3 })
   * ])
   *
   * @return {Dinero[]}
   */
  normalizePrecision(objects) {
    const highestPrecision = objects.reduce((a, b) =>
      Math.max(a.getPrecision(), b.getPrecision())
    )
    return objects.map(object =>
      object.getPrecision() !== highestPrecision
        ? object.convertPrecision(highestPrecision)
        : object
    )
  },
  /**
   * Returns the smallest Dinero object from an array of Dinero objects
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} objects - An array of Dinero objects
   *
   * @example
   * // returns the smallest Dinero object with amount of 500 from an array of Dinero objects with different precisions
   * Dinero.minimum([
   *   Dinero({ amount: 500, precision: 3 }),
   *   Dinero({ amount: 100, precision: 2 })
   * ])
   * @example
   * // returns the smallest Dinero object with amount of 50 from an array of Dinero objects
   * Dinero.minimum([
   *   Dinero({ amount: 50 }),
   *   Dinero({ amount: 100 })
   * ])
   *
   * @return {Dinero[]}
   */
  minimum(objects) {
    const [firstObject, ...tailObjects] = objects
    let currentMinimum = firstObject

    tailObjects.forEach(obj => {
      currentMinimum = currentMinimum.lessThan(obj) ? currentMinimum : obj
    })

    return currentMinimum
  },
  /**
   * Returns the biggest Dinero object from an array of Dinero objects
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} objects - An array of Dinero objects
   *
   * @example
   * // returns the biggest Dinero object with amount of 20, from an array of Dinero objects with different precisions
   * Dinero.maximum([
   *   Dinero({ amount: 20, precision: 2 }),
   *   Dinero({ amount: 150, precision: 3 })
   * ])
   * @example
   * // returns the biggest Dinero object with amount of 100, from an array of Dinero objects
   * Dinero.maximum([
   *   Dinero({ amount: 100 }),
   *   Dinero({ amount: 50 })
   * ])
   *
   * @return {Dinero[]}
   */
  maximum(objects) {
    const [firstObject, ...tailObjects] = objects
    let currentMaximum = firstObject

    tailObjects.forEach(obj => {
      currentMaximum = currentMaximum.greaterThan(obj) ? currentMaximum : obj
    })

    return currentMaximum
  }
}
