type comparisonOperator = 
  | @as(-1) LT
  | @as(0) EQ  
  | @as(1) GT

type calculator<'tInput> = {
  add: ('tInput, 'tInput) => 'tInput,
  compare: ('tInput, 'tInput) => comparisonOperator,
  decrement: 'tInput => 'tInput,
  integerDivide: ('tInput, 'tInput) => 'tInput,
  increment: 'tInput => 'tInput,
  modulo: ('tInput, 'tInput) => 'tInput,
  multiply: ('tInput, 'tInput) => 'tInput,
  power: ('tInput, 'tInput) => 'tInput,
  subtract: ('tInput, 'tInput) => 'tInput,
  zero: unit => 'tInput,
}