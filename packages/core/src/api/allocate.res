open Calculator
open Dinero

type allocateParams<'amount> = (dinero<'amount>, array<ScaledAmount.scaledAmount<'amount>>)

let unsafeAllocate = (calculator: calculator<'amount>) => {
  let distributeFn = Distribute.distribute(calculator)
  
  (dineroObject: dinero<'amount>, ratios: array<ScaledAmount.scaledAmount<'amount>>) => {
    let {amount, currency, scale} = dineroObject.toJSON()
    let amounts = ratios->Array.map(ratio => ratio.amount)
    let shares = distributeFn(amount, amounts)
    
    shares->Array.map(share => {
      dineroObject.create({
        amount: share,
        currency: currency,
        scale: scale,
      })
    })
  }
}

let safeAllocate = (calculator: calculator<'amount>) => {
  let allocateFn = unsafeAllocate(calculator)
  let greaterThanOrEqualFn = GreaterThanOrEqualUtil.greaterThanOrEqual(calculator)
  let greaterThanFn = GreaterThanUtil.greaterThan(calculator)
  let convertScaleFn = TransformScale.transformScale(calculator)
  let maximumFn = MaximumUtil.maximum(calculator)
  let equalFn = EqualUtil.equal(calculator)
  let zero = calculator.zero()
  let ten = Array.make(~length=10, ())->Array.reduce(zero, (acc, _) => calculator.increment(acc))
  
  (dineroObject: dinero<'amount>, ratios: array<ScaledAmount.scaledAmount<'amount>>) => {
    let hasRatios = ratios->Array.length > 0
    
    let highestRatioScale = if hasRatios {
      maximumFn(ratios->Array.map(ratio => ratio.scale->Option.getOr(zero)))
    } else {
      zero
    }
    
    let normalizedRatios = ratios->Array.map(ratio => {
      let scale = ratio.scale->Option.getOr(zero)
      let factor = if equalFn(scale, highestRatioScale) {
        zero
      } else {
        calculator.subtract(highestRatioScale, scale)
      }
      
      {
        ScaledAmount.amount: calculator.multiply(ratio.amount, calculator.power(ten, factor)),
        scale: scale,
      }
    })
    
    let hasOnlyPositiveRatios = normalizedRatios->Array.every(ratio =>
      greaterThanOrEqualFn(ratio.amount, zero)
    )
    let hasOneNonZeroRatio = normalizedRatios->Array.some(ratio =>
      greaterThanFn(ratio.amount, zero)
    )
    
    let condition = hasRatios && hasOnlyPositiveRatios && hasOneNonZeroRatio
    if !condition {
      JsError.throwWithMessage("Invalid ratios.")
    }
    
    let {scale} = dineroObject.toJSON()
    let newScale = calculator.add(scale, highestRatioScale)
    
    allocateFn(convertScaleFn(dineroObject, newScale, ()), normalizedRatios)
  }
}