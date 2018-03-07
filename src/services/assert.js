export default {
  /**
   * Asserts if value is a valid percentage.
   * @param  {}  value - The value to assert.
   * @throws Will throw if value is not a valid percentage.
   * @ignore
   */
  isPercentage(value) {
    if (
      !(
        !isNaN(parseInt(value)) &&
        isFinite(value) &&
        value <= 100 &&
        value >= 0
      )
    ) {
      throw new Error('Please provide a numeric percentage between 0 and 100.')
    }
  }
}
