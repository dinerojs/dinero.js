import { convert as coreConvert } from '@dinero.js/core';

import type { ConvertOptions, ConvertParams } from '@dinero.js/core';

type CreateConverterParams<TAmount> = readonly [
  options: ConvertOptions<TAmount>
];

/**
 * Create a Dinero object converter.
 *
 * @param options.rates - The rates to convert with.
 *
 * @returns A converter function.
 */
export function createConverter<TAmount>(
  ...[options]: CreateConverterParams<TAmount>
) {
  return function convert(
    ...[dineroObject, newCurrency]: readonly [
      dineroObject: ConvertParams<TAmount>[0],
      newCurrency: ConvertParams<TAmount>[1]
    ]
  ) {
    const converter = coreConvert({ calculator: dineroObject.calculator });

    return converter(dineroObject, newCurrency, options);
  };
}
