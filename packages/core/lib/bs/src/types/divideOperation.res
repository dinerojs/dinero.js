open Calculator

type divideOperation<'tAmount> = (
  'tAmount,
  'tAmount,
  calculator<'tAmount>
) => 'tAmount