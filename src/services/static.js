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
   * Returns the minimum dinero object from an array of dinero objects
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} dineroObjs - An array of Dinero objects
   *
   * @example
   * // returns the minimum dinero object from an array of Dinero objects
   * Dinero.minimum([
   *   Dinero({ amount: 50 }),
   *   Dinero({ amount: 100 })
   * ])
   *
   * @return {Dinero[]}
   */
  minimum(dineroObjs) {
    const [firstDinero, ...tailDineros] = dineroObjs
    let minimumDinero = firstDinero
    tailDineros.forEach(dineroObj => {
      minimumDinero = minimumDinero.lessThan(dineroObj)
        ? minimumDinero
        : dineroObj
    })
    return minimumDinero
  },
  /**
   * Returns the Maximum dinero object from an array of dinero objects
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} objects - An array of Dinero objects
   *
   * @example
   * // returns the maximum dinero from an array of Dinero objects
   * Dinero.maximum([
   *   Dinero({ amount: 100 }),
   *   Dinero({ amount: 50 })
   * ])
   *
   * @return {Dinero[]}
   */
  maximum(dineroObjs) {
    const [firstDinero, ...tailDineros] = dineroObjs
    let maximumDinero = firstDinero
    tailDineros.forEach(dineroObj => {
      maximumDinero = maximumDinero.greaterThan(dineroObj)
        ? maximumDinero
        : dineroObj
    })
    return maximumDinero
  }
}
