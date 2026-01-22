open DinerojsCore.Types

@genType
let hasSubUnits = (calculator: calculator<'a>) => {
  let equalFn = EqualUtil.equal(calculator)
  let computeBaseFn = ComputeBase.computeBase(calculator)

  (dineroObject: dinero<'a>): bool => {
    let json = dineroObject.toJSON()
    let base = computeBaseFn(json.currency.base)
    
    let remainder = calculator.modulo(json.amount, calculator.power(base, json.scale))
    !equalFn(remainder, calculator.zero())
  }
}