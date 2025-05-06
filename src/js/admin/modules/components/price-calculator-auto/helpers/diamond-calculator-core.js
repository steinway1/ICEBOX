import { DiamondMath } from './diamond-math';
import { METALS_BASE_COST_MAP_DIAMOND as METAL_MAP } from './metals-base-cost-map';

export default class DiamondCalculatorCore {
  constructor({ basePriceResolver, diamondUnitResolver, markup = 3.72, step = 25 }) {
    this.basePriceResolver = basePriceResolver; // (metalKey) -> spot $
    this.diamondUnitResolver = diamondUnitResolver; // (shape,quality) -> $/ct
    this.markup = markup;
    this.step = step;
  }

  /** main API */
  calculate({ shape, quality, metal, ctw, weight }) {
    // 1) lookup prices
    const unitPrice = this.diamondUnitResolver(shape, quality);
    if (!unitPrice) {
      return {
        ok: false,
        error: `Unit price not found in the table for ${shape} ${quality}`,
      };
    }

    const cfg = METAL_MAP.get(metal);
    if (!cfg) {
      return {
        ok: false,
        error: `${metal} metal not found. Refer: 'metals-base-cost-map.js`,
      };
    }

    const spot = this.basePriceResolver(cfg.basePriceSelector) || 0;

    // 2) maths
    const diamondCost = DiamondMath.diamondCost({ unitPrice, ctw });
    const metalCost = DiamondMath.metalCost({
      spot,
      spotMarkup: cfg.spotMarkup,
      purity: cfg.purityFraction,
      unitPerOunce: cfg.unitPerOunce,
      correction: cfg.correction,
      workMarkup: cfg.workMarkup,
      weight,
    });
    const totalCost = DiamondMath.totalCost(diamondCost, metalCost);
    const retail = DiamondMath.retailPrice(totalCost, this.markup, this.step);

    return { ok: true, diamondCost, metalCost, totalCost, retail };
  }
}
