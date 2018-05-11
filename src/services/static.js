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
    return objects.map(
      object =>
        object.getPrecision() !== highestPrecision
          ? object.convertPrecision(highestPrecision)
          : object
    )
  }
}
