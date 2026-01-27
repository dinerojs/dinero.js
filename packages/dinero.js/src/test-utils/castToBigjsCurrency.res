@module("big.js") external makeBig: float => 'a = "default"

@genType
let castToBigjsCurrency = (currency: DinerojsCore.Types.currency<float>): DinerojsCore.Types.currency<'a> => {
  {
    code: currency.code,
    base: makeBig(currency.base),
    exponent: makeBig(currency.exponent),
  }
}