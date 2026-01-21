open Calculator
open Dinero

type convertParams<'amount> = (dinero<'amount>, Transformer.currency<'amount>, Rates.rates<'amount>)

let convert = (calculator: calculator<'amount>) => {
  let convertScaleFn = TransformScale.transformScale(calculator)
  let _maximumFn = MaximumUtil.maximum(calculator)
  let zero = calculator.zero()
  
  (dineroObject: dinero<'amount>, newCurrency: Transformer.currency<'amount>, rates: Rates.rates<'amount>) => {
    let rate = rates->Dict.get(newCurrency.code)->Option.getOrThrow
    let {amount, scale} = dineroObject.toJSON()
    
    // Handle the rate union type properly
    let (rateAmount, rateScale) = switch rate {
    | ScaledAmount(scaledAmt) => (scaledAmt.amount, scaledAmt.scale->Option.getOr(zero))
    | DirectAmount(amt) => (amt, zero)
    }
    
    let newScale = calculator.add(scale, rateScale)
    
    convertScaleFn(
      dineroObject.create({
        amount: calculator.multiply(amount, rateAmount),
        currency: newCurrency,
        scale: newScale,
      }),
      newScale,
      ()
    )
  }
}