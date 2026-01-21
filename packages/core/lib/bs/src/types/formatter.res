type formatter<'tAmount> = {
  toNumber: option<'tAmount> => float,
  toString: option<'tAmount> => string,
}