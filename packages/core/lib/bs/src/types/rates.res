open ScaledAmount

type rate<'tAmount> = 
  | ScaledAmount(scaledAmount<'tAmount>)
  | DirectAmount('tAmount)

type rates<'tAmount> = dict<rate<'tAmount>>