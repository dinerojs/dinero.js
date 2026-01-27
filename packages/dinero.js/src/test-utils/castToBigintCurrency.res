@genType
let castToBigintCurrency = (currency: DinerojsCore.Types.currency<float>): DinerojsCore.Types.currency<bigint> => {
  {
    code: currency.code,
    base: switch Type.typeof(currency.base) {
      | #object when Array.isArray(currency.base) => 
        let baseArray = (Obj.magic(currency.base): array<float>)
        Obj.magic(Array.map(baseArray, v => BigInt.fromInt(Float.toInt(v))))
      | _ => 
        let baseValue = (Obj.magic(currency.base): float)
        BigInt.fromInt(Float.toInt(baseValue))->Obj.magic
    },
    exponent: BigInt.fromInt(Float.toInt(currency.exponent)),
  }
}