open Calculator
open Formatter
open DineroOptions
open DineroSnapshot

type rec dinero<'tAmount> = {
  calculator: calculator<'tAmount>,
  formatter: formatter<'tAmount>,
  create: dineroOptions<'tAmount> => dinero<'tAmount>,
  toJSON: unit => dineroSnapshot<'tAmount>,
}