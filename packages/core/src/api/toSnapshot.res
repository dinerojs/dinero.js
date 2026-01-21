open Dinero

let toSnapshot = (dineroObject: dinero<'amount>) => {
  dineroObject.toJSON()
}