import { Currency } from "../types";

/**
 * Swazi lilangeni
 */
const SZL: Currency<number> = {
  name: "lilangeni",
  sign: {
    default: "L",
    alternatives: ["E"],
  },
  code: {
    alpha: "SZL",
    num: "748",
  },
  exponent: 2,
};

export default SZL;
