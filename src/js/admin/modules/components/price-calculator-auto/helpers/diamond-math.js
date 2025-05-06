/**
 * @description Math functions for diamond calculator
 * Purely mathematical functions, no dependencies on DOM
 */
export const DiamondMath = {
  /**
   * @param {number} unitPrice - $/carat
   * @param {number} ctw - total weight of diamond in carats
   * @returns {number} $ - cost of diamond
   */
  diamondCost({ unitPrice, ctw }) {
    return +(unitPrice * ctw).toFixed(2);
  },

  /**
   * @param {number} spot - spot price of metal
   * @param {number} spotMarkup - markup on spot price
   * @param {number} purity - purity of metal
   * @param {number} unitPerOunce - number of grams in an ounce
   * @param {number} correction - correction factor for metalBaseCostTable
   * @param {number} workMarkup - markup for work
   * @param {number} weight - weight of metal in grams
   * @returns {number} $ - cost of metal
   */
  metalCost({ spot, spotMarkup = 0, purity, unitPerOunce = 31.1, correction = 1, workMarkup = 0, weight }) {
    const spotAdj = spot * (1 + spotMarkup);
    const priceGram = (spotAdj * purity) / unitPerOunce / correction + workMarkup;
    return +(priceGram * weight).toFixed(2);
  },

  /**
   * @param {number} diamondCost - cost of diamond
   * @param {number} metalCost - cost of metal
   * @returns {number} $ - total cost of diamond and metal
   */
  totalCost(diamondCost, metalCost) {
    return +(diamondCost + metalCost).toFixed(2);
  },

  /**
   * @param {number} totalCost - total cost of diamond and metal
   * @param {number} markup - markup for retail price
   * @param {number} step - step for retail price
   * @returns {number} $ - retail price
   */
  retailPrice(totalCost, markup, step = 25) {
    return Math.round((totalCost * markup) / step) * step;
  },
};
