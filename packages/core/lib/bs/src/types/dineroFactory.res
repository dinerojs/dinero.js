open DineroOptions
open Dinero

type dineroFactory<'tAmount> = dineroOptions<'tAmount> => dinero<'tAmount>