@module("big.js") external makeBig: float => 'a = "default"

// Big.js method bindings
@send external plus: ('a, 'a) => 'a = "plus"
@send external cmp: ('a, 'a) => int = "cmp"
@send external minus: ('a, 'a) => 'a = "minus"
@send external div: ('a, 'a) => 'a = "div"
@send external round: ('a, int, int) => 'a = "round"
@send external mod: ('a, 'a) => 'a = "mod"
@send external times: ('a, 'a) => 'a = "times"
@send external toNumber: 'a => float = "toNumber"
@send external pow: ('a, int) => 'a = "pow"

// Big.js constants
@module("big.js") @scope("default") external roundDown: int = "roundDown"

@send external bigToString: 'a => string = "toString"

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
  power: (a, b) => pow(a, b->Float.toInt),
  subtract: (a, b) => minus(a, b),
  zero: () => makeBig(0.0),
}

let bigFormatter: DinerojsCore.Formatter.formatter<'a> = {
  toNumber: (value) => {
    switch value {
    | Some(v) => toNumber(v)
    | None => 0.0
    }
  },
  toString: (value) => {
    switch value {
    | Some(v) => bigToString(v)
    | None => ""
    }
  }
}

@genType
let createBigjsDinero = (options: DinerojsCore.Types.dineroOptions<'a>): DinerojsCore.Types.dinero<'a> => {
  let dineroFactory = DinerojsCore.Api.createDinero({
    calculator: bigCalculator,
    formatter: bigFormatter,
    onCreate: _ => ()
  })
  dineroFactory(options)
}