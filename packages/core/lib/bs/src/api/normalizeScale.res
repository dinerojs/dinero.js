open Calculator
open Dinero

type normalizeScaleParams<'amount> = array<dinero<'amount>>

let normalizeScale = (calculator: calculator<'amount>) => {
  let maximumFn = MaximumUtil.maximum(calculator)
  let convertScaleFn = TransformScale.transformScale(calculator)
  let equalFn = EqualUtil.equal(calculator)
  
  (dineroObjects: array<dinero<'amount>>) => {
    let highestScale = dineroObjects->Array.reduce(calculator.zero(), (highest, current) => {
      let {scale} = current.toJSON()
      maximumFn([highest, scale])
    })
    
    dineroObjects->Array.map(d => {
      let {scale} = d.toJSON()
      
      !equalFn(scale, highestScale)
        ? convertScaleFn(d, highestScale, ())
        : d
    })
  }
}