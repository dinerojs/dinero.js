type numberInput = [#Int(int) | #Float(float) | #BigInt(BigInt.t)]

/**
 * Helper function to create polymorphic variant from a value that could be int or float
 */
let fromValue = (value: 'a): numberInput => {
  if Type.typeof(value) === #number {
    let num = (Obj.magic(value): float)
    // Check if this is a large number in BigInt notation that should be BigInt
    if num >= 1e15 || num <= -1e15 {
      switch BigInt.fromFloat(num) {
      | Some(bigintVal) => #BigInt(bigintVal)
      | None => #Float(num) // Fallback to float if BigInt conversion fails
      }
    } else if num == Math.floor(num) {
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
 * BigInt power function using exponentiation by squaring for integer exponents
 */
let rec powerBigInt = (base: BigInt.t, exponent: int): BigInt.t => {
  if exponent == 0 {
    BigInt.fromInt(1)
  } else if exponent == 1 {
    base
  } else if exponent < 0 {
    // For negative exponents, we'd need fractional results, so this should error
    JsError.throwWithMessage("Negative exponents not supported for BigInt")
  } else if exponent % 2 == 0 {
    // Even exponent: base^(2n) = (base^2)^n
    let squared = BigInt.mul(base, base)
    powerBigInt(squared, exponent / 2)
  } else {
    // Odd exponent: base^(2n+1) = base * (base^2)^n
    let squared = BigInt.mul(base, base)
    BigInt.mul(base, powerBigInt(squared, exponent / 2))
  }
}

/**
 * General power function that accepts polymorphic variants.
 *
 * @param base - The base number as polymorphic variant.
 * @param exponent - The exponent to raise the base to as polymorphic variant.
 *
 * @returns The base to the power of the exponent.
 */
let power = (base: numberInput, exponent: numberInput): numberInput => {
  switch (base, exponent) {
  | (#Int(b), #Int(e)) => #Int(powerInt(b, e))
  | (#Float(b), #Float(e)) => #Float(powerFloat(b, e))
  | (#Float(b), #Int(e)) => #Float(powerFloat(b, Float.fromInt(e)))
  | (#Int(b), #Float(e)) => #Float(powerFloat(Float.fromInt(b), e))
  | (#BigInt(b), #Int(e)) => #BigInt(powerBigInt(b, e))
  | (#BigInt(b), #Float(e)) => #Float(Math.pow(BigInt.toFloat(b), ~exp=e))
  | _ => JsError.throwWithMessage("Invalid base/exponent combination")
  }
}