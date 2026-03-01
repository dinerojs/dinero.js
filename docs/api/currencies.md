---
title: Currencies
description: ISO 4217 currency objects available in dinero.js/currencies.
---

# Currencies

Dinero.js ships with all [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currencies out of the box.

```js
import { dinero } from 'dinero.js';
import { USD, EUR, JPY } from 'dinero.js/currencies';

const d = dinero({ amount: 1000, currency: USD });
```

If you're using the [bigint variant](/guides/precision-and-large-numbers#using-dinero-with-bigint), import from `dinero.js/bigint/currencies` instead.

::: info
Need a currency that isn't listed here? You can [create custom currency objects](/core-concepts/currency#creating-custom-currencies). For cryptocurrencies, see the [cryptocurrency guide](/guides/cryptocurrencies).
:::

::: warning
Currency data tracks the ISO 4217 standard and **may change between Dinero.js versions.** If you need stability, pin your package version or define your own currency objects.
:::

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `code` | `string` | The ISO 4217 currency code. |
| `base` | `number` | The number base (radix). Most currencies use `10`; non-decimal currencies like `MGA` and `MRU` use `5`. |
| `exponent` | `number` | The number of decimal places. Determines how the [amount](/core-concepts/amount) maps to major and minor units. |

## Available currencies

| Code | Currency | Base | Exponent |
|------|----------|------|----------|
| `AED` | United Arab Emirates dirham | 10 | 2 |
| `AFN` | Afghan afghani | 10 | 2 |
| `ALL` | Albanian lek | 10 | 2 |
| `AMD` | Armenian dram | 10 | 2 |
| `AOA` | Angolan kwanza | 10 | 2 |
| `ARS` | Argentine peso | 10 | 2 |
| `AUD` | Australian dollar | 10 | 2 |
| `AWG` | Aruban florin | 10 | 2 |
| `AZN` | Azerbaijani manat | 10 | 2 |
| `BAM` | Bosnia and Herzegovina convertible mark | 10 | 2 |
| `BBD` | Barbados dollar | 10 | 2 |
| `BDT` | Bangladeshi taka | 10 | 2 |
| `BGN` | Bulgarian lev | 10 | 2 |
| `BHD` | Bahraini dinar | 10 | 3 |
| `BIF` | Burundian franc | 10 | 0 |
| `BMD` | Bermudian dollar | 10 | 2 |
| `BND` | Brunei dollar | 10 | 2 |
| `BOB` | Bolivian boliviano | 10 | 2 |
| `BOV` | Bolivian Mvdol | 10 | 2 |
| `BRL` | Brazilian real | 10 | 2 |
| `BSD` | Bahamian dollar | 10 | 2 |
| `BTN` | Bhutanese ngultrum | 10 | 2 |
| `BWP` | Botswana pula | 10 | 2 |
| `BYN` | Belarusian ruble | 10 | 2 |
| `BZD` | Belize dollar | 10 | 2 |
| `CAD` | Canadian dollar | 10 | 2 |
| `CDF` | Congolese franc | 10 | 2 |
| `CHE` | WIR Euro | 10 | 2 |
| `CHF` | Swiss franc | 10 | 2 |
| `CHW` | WIR Franc | 10 | 2 |
| `CLF` | Unidad de Fomento | 10 | 4 |
| `CLP` | Chilean peso | 10 | 0 |
| `CNY` | Renminbi (Chinese) yuan | 10 | 2 |
| `COP` | Colombian peso | 10 | 2 |
| `COU` | Unidad de Valor Real | 10 | 2 |
| `CRC` | Costa Rican colón | 10 | 2 |
| `CUP` | Cuban peso | 10 | 2 |
| `CVE` | Cape Verdean escudo | 10 | 2 |
| `CZK` | Czech koruna | 10 | 2 |
| `DJF` | Djiboutian franc | 10 | 0 |
| `DKK` | Danish krone | 10 | 2 |
| `DOP` | Dominican peso | 10 | 2 |
| `DZD` | Algerian dinar | 10 | 2 |
| `EGP` | Egyptian pound | 10 | 2 |
| `ERN` | Eritrean nakfa | 10 | 2 |
| `ETB` | Ethiopian birr | 10 | 2 |
| `EUR` | Euro | 10 | 2 |
| `FJD` | Fiji dollar | 10 | 2 |
| `FKP` | Falkland Islands pound | 10 | 2 |
| `GBP` | Pound sterling | 10 | 2 |
| `GEL` | Georgian lari | 10 | 2 |
| `GHS` | Ghanaian cedi | 10 | 2 |
| `GIP` | Gibraltar pound | 10 | 2 |
| `GMD` | Gambian dalasi | 10 | 2 |
| `GNF` | Guinean franc | 10 | 0 |
| `GTQ` | Guatemalan quetzal | 10 | 2 |
| `GYD` | Guyanese dollar | 10 | 2 |
| `HKD` | Hong Kong dollar | 10 | 2 |
| `HNL` | Honduran lempira | 10 | 2 |
| `HTG` | Haitian gourde | 10 | 2 |
| `HUF` | Hungarian forint | 10 | 2 |
| `IDR` | Indonesian rupiah | 10 | 2 |
| `ILS` | Israeli new shekel | 10 | 2 |
| `INR` | Indian rupee | 10 | 2 |
| `IQD` | Iraqi dinar | 10 | 3 |
| `IRR` | Iranian rial | 10 | 2 |
| `ISK` | Icelandic króna | 10 | 0 |
| `JMD` | Jamaican dollar | 10 | 2 |
| `JOD` | Jordanian dinar | 10 | 3 |
| `JPY` | Japanese yen | 10 | 0 |
| `KES` | Kenyan shilling | 10 | 2 |
| `KGS` | Kyrgyzstani som | 10 | 2 |
| `KHR` | Cambodian riel | 10 | 2 |
| `KMF` | Comoro franc | 10 | 0 |
| `KPW` | North Korean won | 10 | 2 |
| `KRW` | South Korean won | 10 | 0 |
| `KWD` | Kuwaiti dinar | 10 | 3 |
| `KYD` | Cayman Islands dollar | 10 | 2 |
| `KZT` | Kazakhstani tenge | 10 | 2 |
| `LAK` | Lao kip | 10 | 2 |
| `LBP` | Lebanese pound | 10 | 2 |
| `LKR` | Sri Lankan rupee | 10 | 2 |
| `LRD` | Liberian dollar | 10 | 2 |
| `LSL` | Lesotho loti | 10 | 2 |
| `LYD` | Libyan dinar | 10 | 3 |
| `MAD` | Moroccan dirham | 10 | 2 |
| `MDL` | Moldovan leu | 10 | 2 |
| `MGA` | Malagasy ariary | 5 | 1 |
| `MKD` | Macedonian denar | 10 | 2 |
| `MMK` | Myanmar kyat | 10 | 2 |
| `MNT` | Mongolian tögrög | 10 | 2 |
| `MOP` | Macanese pataca | 10 | 2 |
| `MRU` | Mauritanian ouguiya | 5 | 1 |
| `MUR` | Mauritian rupee | 10 | 2 |
| `MVR` | Maldivian rufiyaa | 10 | 2 |
| `MWK` | Malawian kwacha | 10 | 2 |
| `MXN` | Mexican peso | 10 | 2 |
| `MXV` | Mexican Unidad de Inversion | 10 | 2 |
| `MYR` | Malaysian ringgit | 10 | 2 |
| `MZN` | Mozambican metical | 10 | 2 |
| `NAD` | Namibian dollar | 10 | 2 |
| `NGN` | Nigerian naira | 10 | 2 |
| `NIO` | Nicaraguan córdoba | 10 | 2 |
| `NOK` | Norwegian krone | 10 | 2 |
| `NPR` | Nepalese rupee | 10 | 2 |
| `NZD` | New Zealand dollar | 10 | 2 |
| `OMR` | Omani rial | 10 | 3 |
| `PAB` | Panamanian balboa | 10 | 2 |
| `PEN` | Peruvian sol | 10 | 2 |
| `PGK` | Papua New Guinean kina | 10 | 2 |
| `PHP` | Philippine peso | 10 | 2 |
| `PKR` | Pakistani rupee | 10 | 2 |
| `PLN` | Polish złoty | 10 | 2 |
| `PYG` | Paraguayan guaraní | 10 | 0 |
| `QAR` | Qatari riyal | 10 | 2 |
| `RON` | Romanian leu | 10 | 2 |
| `RSD` | Serbian dinar | 10 | 2 |
| `RUB` | Russian ruble | 10 | 2 |
| `RWF` | Rwandan franc | 10 | 0 |
| `SAR` | Saudi riyal | 10 | 2 |
| `SBD` | Solomon Islands dollar | 10 | 2 |
| `SCR` | Seychelles rupee | 10 | 2 |
| `SDG` | Sudanese pound | 10 | 2 |
| `SEK` | Swedish krona | 10 | 2 |
| `SGD` | Singapore dollar | 10 | 2 |
| `SHP` | Saint Helena pound | 10 | 2 |
| `SLE` | Sierra Leonean leone | 10 | 2 |
| `SOS` | Somali shilling | 10 | 2 |
| `SRD` | Surinamese dollar | 10 | 2 |
| `SSP` | South Sudanese pound | 10 | 2 |
| `STN` | São Tomé and Príncipe dobra | 10 | 2 |
| `SVC` | Salvadoran colón | 10 | 2 |
| `SYP` | Syrian pound | 10 | 2 |
| `SZL` | Swazi lilangeni | 10 | 2 |
| `THB` | Thai baht | 10 | 2 |
| `TJS` | Tajikistani somoni | 10 | 2 |
| `TMT` | Turkmenistan manat | 10 | 2 |
| `TND` | Tunisian dinar | 10 | 3 |
| `TOP` | Tongan paʻanga | 10 | 2 |
| `TRY` | Turkish lira | 10 | 2 |
| `TTD` | Trinidad and Tobago dollar | 10 | 2 |
| `TWD` | New Taiwan dollar | 10 | 2 |
| `TZS` | Tanzanian shilling | 10 | 2 |
| `UAH` | Ukrainian hryvnia | 10 | 2 |
| `UGX` | Ugandan shilling | 10 | 0 |
| `USD` | United States dollar | 10 | 2 |
| `USN` | United States dollar (next day) | 10 | 2 |
| `UYI` | Uruguay Peso en Unidades Indexadas | 10 | 0 |
| `UYU` | Uruguayan peso | 10 | 2 |
| `UYW` | Unidad previsional | 10 | 4 |
| `UZS` | Uzbekistani soʻm | 10 | 2 |
| `VED` | Venezuelan digital bolívar | 10 | 2 |
| `VES` | Venezuelan bolívar | 10 | 2 |
| `VND` | Vietnamese đồng | 10 | 0 |
| `VUV` | Vanuatu vatu | 10 | 0 |
| `WST` | Samoan tālā | 10 | 2 |
| `XAD` | Arab Accounting Dinar | 10 | 2 |
| `XAF` | Central African CFA franc | 10 | 0 |
| `XCD` | East Caribbean dollar | 10 | 2 |
| `XCG` | Caribbean guilder | 10 | 2 |
| `XOF` | West African CFA franc | 10 | 0 |
| `XPF` | CFP franc | 10 | 0 |
| `YER` | Yemeni rial | 10 | 2 |
| `ZAR` | South African rand | 10 | 2 |
| `ZMW` | Zambian kwacha | 10 | 2 |
| `ZWG` | Zimbabwe Gold | 10 | 2 |
