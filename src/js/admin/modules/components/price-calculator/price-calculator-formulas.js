export const FORMULAS = {
  chainCost: {
    heading: 'Chain Re-Cost',
    formula: 'Metal Purity + Base Price ⇒ Chain Re-Cost',
  },
  chainRetail: {
    heading: 'Chain Retail Price',
    formula: 'Chain Weight Density + Re-Cost ⇒ Retail Price',
  },
  chainGramPerInch: {
    heading: 'Grams per Inch',
    formula: "Total Weight <span class='symbol'>÷</span> Length ⇒ Grams per Inch",
  },
  diaDiamondCost: {
    heading: 'Diamond Cost',
    formula:
      "Diamond Cost <span class='symbol'>=</span> Carat Total Weight <span class='symbol'>×</span> Unit Price (looked up by Shape & Quality)",
  },
  diaMetalCost: {
    heading: 'Metal Cost',
    formula:
      "Metal Cost <span class='symbol'>=</span> Gram Weight <span class='symbol'>×</span> (Base Price per Ounce ÷ 31.1 <span class='symbol'>×</span> Purity Fraction + Work Markup)",
  },
  diaCost: {
    heading: 'Total Cost',
    formula: "Total Cost <span class='symbol'>=</span> Diamond Cost <span class='symbol'>+</span> Metal Cost",
  },
  diaRetail: {
    heading: 'Diamond Retail Price',
    formula:
      "Retail Price <span class='symbol'>=</span> Total Cost <span class='symbol'>×</span> 3.72 → rounded to nearest 25",
  },
};
