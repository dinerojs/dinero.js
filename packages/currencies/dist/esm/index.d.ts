/**
 * United Arab Emirates dirham.
 */
export declare const AED: Currency<number>;

/**
 * Afghan afghani.
 */
export declare const AFN: Currency<number>;

/**
 * Albanian lek.
 */
export declare const ALL: Currency<number>;

/**
 * Armenian dram.
 */
export declare const AMD: Currency<number>;

/**
 * Netherlands Antillean guilder.
 */
export declare const ANG: Currency<number>;

/**
 * Angolan kwanza.
 */
export declare const AOA: Currency<number>;

/**
 * Argentine peso.
 */
export declare const ARS: Currency<number>;

/**
 * Australian dollar.
 */
export declare const AUD: Currency<number>;

/**
 * Aruban florin.
 */
export declare const AWG: Currency<number>;

/**
 * Azerbaijani manat.
 */
export declare const AZN: Currency<number>;

/**
 * Bosnia and Herzegovina convertible mark.
 */
export declare const BAM: Currency<number>;

/**
 * Barbados dollar.
 */
export declare const BBD: Currency<number>;

/**
 * Bangladeshi taka.
 */
export declare const BDT: Currency<number>;

/**
 * Bulgarian lev.
 */
export declare const BGN: Currency<number>;

/**
 * Bahraini dinar.
 */
export declare const BHD: Currency<number>;

/**
 * Burundian franc.
 */
export declare const BIF: Currency<number>;

/**
 * Bermudian dollar.
 */
export declare const BMD: Currency<number>;

/**
 * Brunei dollar.
 */
export declare const BND: Currency<number>;

/**
 * Bolivian boliviano.
 */
export declare const BOB: Currency<number>;

/**
 * Bolivian Mvdol.
 */
export declare const BOV: Currency<number>;

/**
 * Brazilian real.
 */
export declare const BRL: Currency<number>;

/**
 * Bahamian dollar.
 */
export declare const BSD: Currency<number>;

/**
 * Bhutanese ngultrum.
 */
export declare const BTN: Currency<number>;

/**
 * Botswana pula.
 */
export declare const BWP: Currency<number>;

/**
 * Belarusian ruble.
 */
export declare const BYN: Currency<number>;

/**
 * Belize dollar.
 */
export declare const BZD: Currency<number>;

/**
 * Canadian dollar.
 */
export declare const CAD: Currency<number>;

/**
 * Congolese franc.
 */
export declare const CDF: Currency<number>;

/**
 * WIR Euro.
 */
export declare const CHE: Currency<number>;

/**
 * Swiss franc.
 */
export declare const CHF: Currency<number>;

/**
 * WIR Franc.
 */
export declare const CHW: Currency<number>;

/**
 * Unidad de Fomento.
 */
export declare const CLF: Currency<number>;

/**
 * Chilean peso.
 */
export declare const CLP: Currency<number>;

/**
 * Renminbi (Chinese) yuan.
 */
export declare const CNY: Currency<number>;

/**
 * Colombian peso.
 */
export declare const COP: Currency<number>;

/**
 * Unidad de Valor Real.
 */
export declare const COU: Currency<number>;

/**
 * Costa Rican colón.
 */
export declare const CRC: Currency<number>;

/**
 * Cuban convertible peso.
 */
export declare const CUC: Currency<number>;

/**
 * Cuban peso.
 */
export declare const CUP: Currency<number>;

export declare type Currency<TAmount> = {
    /**
     * The unique code of the currency.
     */
    readonly code: string;
    /**
     * The base, or radix of the currency.
     */
    readonly base: TAmount | readonly TAmount[];
    /**
     * The exponent of the currency.
     */
    readonly exponent: TAmount;
};

/**
 * Cape Verdean escudo.
 */
export declare const CVE: Currency<number>;

/**
 * Czech koruna.
 */
export declare const CZK: Currency<number>;

/**
 * Djiboutian franc.
 */
export declare const DJF: Currency<number>;

/**
 * Danish krone.
 */
export declare const DKK: Currency<number>;

/**
 * Dominican peso.
 */
export declare const DOP: Currency<number>;

/**
 * Algerian dinar.
 */
export declare const DZD: Currency<number>;

/**
 * Egyptian pound.
 */
export declare const EGP: Currency<number>;

/**
 * Eritrean nakfa.
 */
export declare const ERN: Currency<number>;

/**
 * Ethiopian birr.
 */
export declare const ETB: Currency<number>;

/**
 * Euro.
 */
export declare const EUR: Currency<number>;

/**
 * Fiji dollar.
 */
export declare const FJD: Currency<number>;

/**
 * Falkland Islands pound.
 */
export declare const FKP: Currency<number>;

/**
 * Pound sterling.
 */
export declare const GBP: Currency<number>;

/**
 * Georgian lari.
 */
export declare const GEL: Currency<number>;

/**
 * Ghanaian cedi.
 */
export declare const GHS: Currency<number>;

/**
 * Gibraltar pound.
 */
export declare const GIP: Currency<number>;

/**
 * Gambian dalasi.
 */
export declare const GMD: Currency<number>;

/**
 * Guinean franc.
 */
export declare const GNF: Currency<number>;

/**
 * Guatemalan quetzal.
 */
export declare const GTQ: Currency<number>;

/**
 * Guyanese dollar.
 */
export declare const GYD: Currency<number>;

/**
 * Hong Kong dollar.
 */
export declare const HKD: Currency<number>;

/**
 * Honduran lempira.
 */
export declare const HNL: Currency<number>;

/**
 * Croatian kuna.
 */
export declare const HRK: Currency<number>;

/**
 * Haitian gourde.
 */
export declare const HTG: Currency<number>;

/**
 * Hungarian forint.
 */
export declare const HUF: Currency<number>;

/**
 * Indonesian rupiah.
 */
export declare const IDR: Currency<number>;

/**
 * Israeli new shekel.
 */
export declare const ILS: Currency<number>;

/**
 * Indian rupee.
 */
export declare const INR: Currency<number>;

/**
 * Iraqi dinar.
 */
export declare const IQD: Currency<number>;

/**
 * Iranian rial.
 */
export declare const IRR: Currency<number>;

/**
 * Icelandic króna.
 */
export declare const ISK: Currency<number>;

/**
 * Jamaican dollar.
 */
export declare const JMD: Currency<number>;

/**
 * Jordanian dinar.
 */
export declare const JOD: Currency<number>;

/**
 * Japanese yen.
 */
export declare const JPY: Currency<number>;

/**
 * Kenyan shilling.
 */
export declare const KES: Currency<number>;

/**
 * Kyrgyzstani som.
 */
export declare const KGS: Currency<number>;

/**
 * Cambodian riel.
 */
export declare const KHR: Currency<number>;

/**
 * Comoro franc.
 */
export declare const KMF: Currency<number>;

/**
 * North Korean won.
 */
export declare const KPW: Currency<number>;

/**
 * South Korean won.
 */
export declare const KRW: Currency<number>;

/**
 * Kuwaiti dinar.
 */
export declare const KWD: Currency<number>;

/**
 * Cayman Islands dollar.
 */
export declare const KYD: Currency<number>;

/**
 * Kazakhstani tenge.
 */
export declare const KZT: Currency<number>;

/**
 * Lao kip.
 */
export declare const LAK: Currency<number>;

/**
 * Lebanese pound.
 */
export declare const LBP: Currency<number>;

/**
 * Sri Lankan rupee.
 */
export declare const LKR: Currency<number>;

/**
 * Liberian dollar.
 */
export declare const LRD: Currency<number>;

/**
 * Lesotho loti.
 */
export declare const LSL: Currency<number>;

/**
 * Libyan dinar.
 */
export declare const LYD: Currency<number>;

/**
 * Moroccan dirham.
 */
export declare const MAD: Currency<number>;

/**
 * Moldovan leu.
 */
export declare const MDL: Currency<number>;

/**
 * Malagasy ariary.
 */
export declare const MGA: Currency<number>;

/**
 * Macedonian denar.
 */
export declare const MKD: Currency<number>;

/**
 * Myanmar kyat.
 */
export declare const MMK: Currency<number>;

/**
 * Mongolian tögrög.
 */
export declare const MNT: Currency<number>;

/**
 * Macanese pataca.
 */
export declare const MOP: Currency<number>;

/**
 * Mauritanian ouguiya.
 */
export declare const MRU: Currency<number>;

/**
 * Mauritian rupee.
 */
export declare const MUR: Currency<number>;

/**
 * Maldivian rufiyaa.
 */
export declare const MVR: Currency<number>;

/**
 * Malawian kwacha.
 */
export declare const MWK: Currency<number>;

/**
 * Mexican peso.
 */
export declare const MXN: Currency<number>;

/**
 * Mexican Unidad de Inversion.
 */
export declare const MXV: Currency<number>;

/**
 * Malaysian ringgit.
 */
export declare const MYR: Currency<number>;

/**
 * Mozambican metical.
 */
export declare const MZN: Currency<number>;

/**
 * Namibian dollar.
 */
export declare const NAD: Currency<number>;

/**
 * Nigerian naira.
 */
export declare const NGN: Currency<number>;

/**
 * Nicaraguan córdoba.
 */
export declare const NIO: Currency<number>;

/**
 * Norwegian krone.
 */
export declare const NOK: Currency<number>;

/**
 * Nepalese rupee.
 */
export declare const NPR: Currency<number>;

/**
 * New Zealand dollar.
 */
export declare const NZD: Currency<number>;

/**
 * Omani rial.
 */
export declare const OMR: Currency<number>;

/**
 * Panamanian balboa.
 */
export declare const PAB: Currency<number>;

/**
 * Peruvian sol.
 */
export declare const PEN: Currency<number>;

/**
 * Papua New Guinean kina.
 */
export declare const PGK: Currency<number>;

/**
 * Philippine peso.
 */
export declare const PHP: Currency<number>;

/**
 * Pakistani rupee.
 */
export declare const PKR: Currency<number>;

/**
 * Polish złoty.
 */
export declare const PLN: Currency<number>;

/**
 * Paraguayan guaraní.
 */
export declare const PYG: Currency<number>;

/**
 * Qatari riyal.
 */
export declare const QAR: Currency<number>;

/**
 * Romanian leu.
 */
export declare const RON: Currency<number>;

/**
 * Serbian dinar.
 */
export declare const RSD: Currency<number>;

/**
 * Russian ruble.
 */
export declare const RUB: Currency<number>;

/**
 * Rwandan franc.
 */
export declare const RWF: Currency<number>;

/**
 * Saudi riyal.
 */
export declare const SAR: Currency<number>;

/**
 * Solomon Islands dollar.
 */
export declare const SBD: Currency<number>;

/**
 * Seychelles rupee.
 */
export declare const SCR: Currency<number>;

/**
 * Sudanese pound.
 */
export declare const SDG: Currency<number>;

/**
 * Swedish krona.
 */
export declare const SEK: Currency<number>;

/**
 * Singapore dollar.
 */
export declare const SGD: Currency<number>;

/**
 * Saint Helena pound.
 */
export declare const SHP: Currency<number>;

/**
 * Sierra Leonean leone.
 */
export declare const SLL: Currency<number>;

/**
 * Somali shilling.
 */
export declare const SOS: Currency<number>;

/**
 * Surinamese dollar.
 */
export declare const SRD: Currency<number>;

/**
 * South Sudanese pound.
 */
export declare const SSP: Currency<number>;

/**
 * São Tomé and Príncipe dobra.
 */
export declare const STN: Currency<number>;

/**
 * Salvadoran colón.
 */
export declare const SVC: Currency<number>;

/**
 * Syrian pound.
 */
export declare const SYP: Currency<number>;

/**
 * Swazi lilangeni.
 */
export declare const SZL: Currency<number>;

/**
 * Thai baht.
 */
export declare const THB: Currency<number>;

/**
 * Tajikistani somoni.
 */
export declare const TJS: Currency<number>;

/**
 * Turkmenistan manat.
 */
export declare const TMT: Currency<number>;

/**
 * Tunisian dinar.
 */
export declare const TND: Currency<number>;

/**
 * Tongan paʻanga.
 */
export declare const TOP: Currency<number>;

/**
 * Turkish lira.
 */
export declare const TRY: Currency<number>;

/**
 * Trinidad and Tobago dollar.
 */
export declare const TTD: Currency<number>;

/**
 * New Taiwan dollar.
 */
export declare const TWD: Currency<number>;

/**
 * Tanzanian shilling.
 */
export declare const TZS: Currency<number>;

/**
 * Ukrainian hryvnia.
 */
export declare const UAH: Currency<number>;

/**
 * Ugandan shilling.
 */
export declare const UGX: Currency<number>;

/**
 * United States dollar.
 */
export declare const USD: Currency<number>;

/**
 * United States dollar (next day).
 */
export declare const USN: Currency<number>;

/**
 * Uruguay Peso en Unidades Indexadas.
 */
export declare const UYI: Currency<number>;

/**
 * Uruguayan peso.
 */
export declare const UYU: Currency<number>;

/**
 * Unidad previsional.
 */
export declare const UYW: Currency<number>;

/**
 * Uzbekistani soʻm.
 */
export declare const UZS: Currency<number>;

/**
 * Venezuelan bolívar.
 */
export declare const VES: Currency<number>;

/**
 * Vietnamese đồng.
 */
export declare const VND: Currency<number>;

/**
 * Vanuatu vatu.
 */
export declare const VUV: Currency<number>;

/**
 * Samoan tālā.
 */
export declare const WST: Currency<number>;

/**
 * Central African CFA franc.
 */
export declare const XAF: Currency<number>;

/**
 * East Caribbean dollar.
 */
export declare const XCD: Currency<number>;

/**
 * West African CFA franc.
 */
export declare const XOF: Currency<number>;

/**
 * CFP franc.
 */
export declare const XPF: Currency<number>;

/**
 * Yemeni rial.
 */
export declare const YER: Currency<number>;

/**
 * South African rand.
 */
export declare const ZAR: Currency<number>;

/**
 * Zambian kwacha.
 */
export declare const ZMW: Currency<number>;

/**
 * Zimbabwean dollar.
 */
export declare const ZWL: Currency<number>;

export { }
