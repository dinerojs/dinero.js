import { Currency } from "../types";

/**
 * Tunisian dinar
 */
const TND: Currency<number> = {
  name: "dinar",
  sign: {
    default: "د.ت",
    alternatives: ["DT"],
  },
  code: {
    alpha: "TND",
    num: "788",
  },
  exponent: 3,
};

export default TND;
