open Transformer

type dineroSnapshot<'tAmount> = {
  amount: 'tAmount,
  currency: currency<'tAmount>,
  scale: 'tAmount,
}