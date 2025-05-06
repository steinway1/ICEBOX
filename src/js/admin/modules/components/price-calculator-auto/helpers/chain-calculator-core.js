import { ChainMath } from './chain-math';
import { METALS_BASE_COST_MAP_CHAIN as METAL_MAP } from './metals-base-cost-map';

/**
 * @description Core logic for gold chain cost and retail calculations
 * No direct DOM access, relies on resolver functions
 */
export default class ChainCalculatorCore {
  /**
   * @param {Object} options
   * @param {Function} options.basePriceResolver - (selector:string) => number
   *        resolves spot price from a DOM selector or other source
   * @param {number} [options.retailStep=5] - rounding step for retail price
   */
  constructor({ basePriceResolver, retailStep = 5 }) {
    this.resolveSpot = basePriceResolver;
    this.retailStep = retailStep;
  }

  /**
   * Perform all chain calculations
   * @param {Object} params
   * @param {string} params.metal - alloy key, e.g. "14K"
   * @param {number} params.weight - chain weight in grams
   * @param {number} params.length - chain length in inches
   * @returns {{cost:number, retail:number, gpi:number}} results
   */
  calculate({ metal, weight, length }) {
    const alloyConfig = METAL_MAP.get(metal);

    if (!alloyConfig) {
      return {
        ok: false,
        error: `${metal} alloy not found. Refer: 'metals-base-cost-map.js`,
      };
    }

    const spotPrice = this.resolveSpot(alloyConfig.basePriceSelector) || 0;

    const gpi = ChainMath.gramPerInch({ weight, length });
    const cost = ChainMath.chainCost({ alloyConfig, spotPrice, weight });
    const retail = ChainMath.chainRetail({ chainCost: cost, gramsPerInch: gpi, roundStep: this.retailStep });

    if (!Number.isFinite(cost) || !Number.isFinite(retail) || !Number.isFinite(gpi)) {
      return {
        ok: false,
        error: 'Invalid calculation result',
      };
    }

    return { ok: true, cost, retail, gpi };
  }
}
