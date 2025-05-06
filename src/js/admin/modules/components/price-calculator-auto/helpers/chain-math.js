/**
 * @description Math functions for gold chain calculator
 * Purely mathematical functions, no dependencies on DOM
 */
export const ChainMath = {
  /**
   * Calculate grams per inch for a chain.
   * @param {Object} params
   * @param {number} params.weight - chain weight in grams
   * @param {number} params.length - chain length in inches
   * @returns {number} grams per inch
   */
  gramPerInch({ weight, length }) {
    return length > 0 ? +(weight / length).toFixed(4) : 0;
  },

  /**
   * Calculate the Re-Cost (base cost) of a gold chain.
   * ReCost = ((spotPrice * (1 + spotMarkup) * purityFraction / unitPerOunce) + workMarkup) * weight * 1.10
   * @param {Object} params
   * @param {Object} params.alloyConfig - config for alloy from METALS_BASE_COST_MAP_CHAIN
   * @param {number} params.spotPrice - spot price of metal in $/oz
   * @param {number} params.weight - chain weight in grams
   * @returns {number} Re-Cost of the chain
   */
  chainCost({ alloyConfig, spotPrice, weight }) {
    const adjustedSpot = spotPrice * (1 + (alloyConfig.spotMarkup || 0));
    const costPerGram = (adjustedSpot * alloyConfig.purityFraction) / alloyConfig.unitPerOunce + alloyConfig.workMarkup;
    return +(costPerGram * weight * 1.1).toFixed(2);
  },

  /**
   * Calculate the retail price of a gold chain.
   * Retail = round((chainCost / divisor), roundStep)
   * where divisor depends on density = gramsPerInch * 20.
   * @param {Object} params
   * @param {number} params.chainCost - base cost of chain
   * @param {number} params.gramsPerInch - density (g/in)
   * @param {number} [params.roundStep=5] - rounding step in dollars
   * @returns {number} retail price
   */
  chainRetail({ chainCost, gramsPerInch, roundStep = 5 }) {
    const density = gramsPerInch * 20;
    let divisor;
    if (density >= 0.01 && density <= 10) divisor = 0.3;
    else if (density > 10 && density <= 25) divisor = 0.35;
    else if (density > 25 && density <= 50) divisor = 0.4;
    else if (density > 50) divisor = 0.45;
    else return 0;
    const preRounded = chainCost / divisor;
    return Math.round(preRounded / roundStep) * roundStep;
  },
};
