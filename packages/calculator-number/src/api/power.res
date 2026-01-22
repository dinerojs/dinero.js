type numberInput = [#Int(int) | #Float(float)]

/**
 * Helper function to create polymorphic variant from a value that could be int or float
 */
let fromValue = (value: 'a): numberInput => {
  if Type.typeof(value) === #bigint {
    JsError.throwWithMessage("BigInt values not supported in calculator-number. Use calculator-bigint package instead.")
  } else if Type.typeof(value) === #number {
    let num = (Obj.magic(value): float)
    if num == Math.floor(num) {
      #Int((Obj.magic(value): int))
    } else {
      #Float(num)
    }
  } else {
    #Float((Obj.magic(value): float))
  }
}

/**
 * Returns a number to the power of an exponent using integers.
 *
 * @param base - The base number as int.
 * @param exponent - The exponent to raise the base to as int.
 *
 * @returns The base to the power of the exponent as float.
 */
let powerInt = (base: int, exponent: int): int => {
  Math.Int.pow(base, ~exp=exponent)
}

/**
 * Returns a number to the power of an exponent using floats.
 *
 * @param base - The base number as float.
 * @param exponent - The exponent to raise the base to as float.
 *
 * @returns The base to the power of the exponent as float.
 */
let powerFloat = (base: float, exponent: float): float => {
  Math.pow(base, ~exp=exponent)
}

/**
 * General power function that accepts floats.
 *
 * @param base - The base number as float.
 * @param exponent - The exponent to raise the base to as float.
 *
 * @returns The base to the power of the exponent as float (for JavaScript parity).
 */
let power = (base: float, exponent: float): float => {
  powerFloat(base, exponent)
}