/**
 * Assert a condition.
 * 
 * @param condition - The condition to verify.
 * @param message - The error message to throw.
 * 
 * @throws If the condition isn't met.
 */
let \"assert" = (condition: bool, message: string) => {
  if !condition {
    JsError.throwWithMessage("[Dinero.js] " ++ message)
  }
}