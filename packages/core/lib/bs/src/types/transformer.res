// Currency type with proper record structure
type currency<'tAmount> = {
  code: string,
  base: 'tAmount, 
  exponent: 'tAmount,
}

type transformerOptions<'tAmount, 'tValue> = {
  value: 'tValue,
  currency: currency<'tAmount>,
}

type transformer<'tAmount, 'tOutput, 'tValue> = transformerOptions<'tAmount, 'tValue> => 'tOutput