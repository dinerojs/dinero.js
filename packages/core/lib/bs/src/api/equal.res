open Calculator
open Dinero

type equalParams<'amount> = (dinero<'amount>, dinero<'amount>)

let equal = (calculator: calculator<'amount>) => {
  (dineroObject: dinero<'amount>, comparator: dinero<'amount>) => {
    HaveSameAmount.haveSameAmount(calculator)([dineroObject, comparator]) &&
    HaveSameCurrency.haveSameCurrency([dineroObject, comparator])
  }
}