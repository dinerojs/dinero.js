open Calculator
open Dinero

type toDecimalParams<'amount, 'output> = (dinero<'amount>, option<Transformer.transformer<'amount, 'output, string>>)

let getDecimal = (calculator: calculator<'amount>, formatter: Formatter.formatter<'amount>) => {
  let absoluteFn = Absolute.absolute(calculator)
  let equalFn = EqualUtil.equal(calculator)
  let lessThanFn = LessThanUtil.lessThan(calculator)
  let zero = calculator.zero()
  
  (units: array<'amount>, scale: 'amount) => {
    let whole = formatter.toString(Some(units[0]->Option.getOrThrow))
    let fractional = formatter.toString(Some(absoluteFn(units[1]->Option.getOrThrow)))
    
    let scaleNumber = formatter.toNumber(Some(scale))->Float.toInt
    let paddedFractional = fractional->String.padStart(scaleNumber, "0")
    let decimal = `${whole}.${paddedFractional}`
    
    let leadsWithZero = equalFn(units[0]->Option.getOrThrow, zero)
    let isNegative = lessThanFn(units[1]->Option.getOrThrow, zero)
    
    // A leading negative zero is a special case because the `toString`
    // formatter won't preserve its negative sign (since 0 === -0).
    if leadsWithZero && isNegative {
      `-${decimal}`
    } else {
      decimal
    }
  }
}

let toDecimal = (calculator: calculator<'amount>) => {
  let toUnitsFn = ToUnits.toUnits(calculator)
  let computeBaseFn = ComputeBase.computeBase(calculator)
  let equalFn = EqualUtil.equal(calculator)
  
  (dineroObject: dinero<'amount>, transformer: option<Transformer.transformer<'amount, 'output, string>>) => {
    let {currency, scale} = dineroObject.toJSON()
    
    let base = computeBaseFn(ComputeBase.fromValue(currency.base))
    let zero = calculator.zero()
    let ten = Array.make(~length=10, ())->Array.reduce(zero, (acc, _) => calculator.increment(acc))
    
    let isMultiBase = IsArray.isArray(currency.base)
    let isBaseTen = equalFn(calculator.modulo(base, ten), zero)
    let isDecimal = !isMultiBase && isBaseTen
    
    if !isDecimal {
      JsError.throwWithMessage("Cannot format a non-decimal currency to decimal.")
    }
    
    let units = toUnitsFn(dineroObject, None)
    
    let getDecimalFn = getDecimal(calculator, dineroObject.formatter)
    let value = getDecimalFn(units, scale)
    
    switch transformer {
    | None => value
    | Some(t) => t({value: value, currency: currency})
    }
  }
}