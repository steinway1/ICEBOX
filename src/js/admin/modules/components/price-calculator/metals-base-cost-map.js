const BASE_PRICE_SELECTOR = {
  gold: "input#baseGoldPrice",
  silver: "input#baseSilverPrice",
  platinum: "input#basePlatinumPrice",
};

const METAL_SPECS = {
  "10K": { metal: "gold", spotMarkup: 0.01 },
  "14K": { metal: "gold", spotMarkup: 0.01 },
  "18K": { metal: "gold", spotMarkup: 0.01 },
  S925: { metal: "silver", spotMarkup: 0.1, correction: 1 / 0.999 },
  P950: { metal: "platinum", spotMarkup: 0.1, correction: 1 / 0.999 },
};

function createMetalsBaseCostMap(workMarkupMap, purityMap) {
  return new Map(
    Object.entries(METAL_SPECS).map(([key, spec]) => {
      const cfg = {
        basePriceSelector: BASE_PRICE_SELECTOR[spec.metal],
        unitPerOunce: 31.1,
        purityFraction: purityMap[key],
        spotMarkup: spec.spotMarkup,
        workMarkup: workMarkupMap[key],
      };
      if (spec.correction) cfg.correction = spec.correction;
      return [key, cfg];
    }),
  );
}

export const METALS_BASE_COST_MAP_CHAIN = createMetalsBaseCostMap(
  {
    "10K": 5,
    "14K": 5,
    "18K": 5,
    S925: 6,
    P950: 12,
  },
  {
    "10K": 0.417,
    "14K": 0.585,
    "18K": 0.75,
    S925: 0.925,
    P950: 0.95,
  },
);

export const METALS_BASE_COST_MAP_DIAMOND = createMetalsBaseCostMap(
  {
    "10K": 10,
    "14K": 10,
    "18K": 10,
    S925: 8,
    P950: 8,
  },
  {
    "10K": 10 / 24,
    "14K": 14 / 24,
    "18K": 18 / 24,
    S925: 0.925,
    P950: 0.95,
  },
);
