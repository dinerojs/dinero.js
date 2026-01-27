@module("big.js") external makeBig: float => 'a = "default"

// Big.js method bindings
@send external plus: ('a, 'a) => 'a = "plus"
@send external cmp: ('a, 'a) => int = "cmp"
@send external minus: ('a, 'a) => 'a = "minus"
@send external div: ('a, 'a) => 'a = "div"
@send external round: ('a, int, int) => 'a = "round"
@send external mod: ('a, 'a) => 'a = "mod"
@send external times: ('a, 'a) => 'a = "times"
@send external pow: ('a, float) => 'a = "pow"

// Big.js constants
@module("big.js") @scope("default") external roundDown: int = "roundDown"

let bigCalculator: DinerojsCore.Calculator.calculator<'a> = {
  add: (a, b) => plus(a, b),
  compare: (a, b) => {
    let result = cmp(a, b)
    if result < 0 {
      DinerojsCore.Calculator.LT
    } else if result > 0 {
      DinerojsCore.Calculator.GT  
    } else {
      DinerojsCore.Calculator.EQ
    }
  },
  decrement: (v) => minus(v, makeBig(1.0)),
  increment: (v) => plus(v, makeBig(1.0)),
  integerDivide: (a, b) => round(div(a, b), 0, roundDown),
  modulo: (a, b) => mod(a, b),
  multiply: (a, b) => times(a, b),
  power: (a, b) => pow(a, Belt.Int.toFloat(Belt.Float.toInt(b))),
  subtract: (a, b) => minus(a, b),
  zero: () => makeBig(0.0),
}

@genType
let createBigjsDinero = (options: DinerojsCore.Types.dineroOptions<'a>): DinerojsCore.Types.dinero<'a> => {
  let dineroFactory = DinerojsCore.Index.createDinero({
    calculator: bigCalculator,
    onCreate: _ => ()
  })
  dineroFactory(options)
}