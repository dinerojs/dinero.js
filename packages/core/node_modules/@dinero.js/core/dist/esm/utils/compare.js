/**
 * Returns a compare function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The compare function.
 */
export function compare(calculator) {
  return function (subject, comparator) {
    return calculator.compare(subject, comparator);
  };
}