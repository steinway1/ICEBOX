import { Item } from "../types/items";

export const items: Item[] = [
  {
    id: 100,
    img_src:
      "https://cdn.prod.website-files.com/67f32f50f2c378bfbd2ec87a/67f35b8077f725cc40149622_vacheron-1.webp",
    brand: "Rolex",
    model: "Submariner Date",
    meta: "Oystersteel, Black, 126610LN-0001",
    price: "18,250",
    url: "https://www.google.com",
  },
  {
    id: 101,
    papers: false,
    box: true,
    material: "Stainless Steel",
    condition: "Excellent",
    img_src:
      "https://cdn.prod.website-files.com/67f32f50f2c378bfbd2ec87a/67f3ce808a6854c313dbf0c4_patek-3.avif",
    brand: "Franck Muller",
    name: "Franck Muller Vanguard Racing",
    model: "Vanguard Racing",
    meta: "V45 Sc Dt Rcg Ac Nr - Stainless Steel",
    price: "7,350",
    url: "https://www.google.com",
    description:
      "The Vanguard Racing is a chronograph watch with a stainless steel case and a black dial. It is a limited edition of 1000 pieces and is water resistant to 100 meters. <br> <br> The Vanguard Racing is a chronograph watch with a stainless steel case and a black dial. It is a limited edition of 1000 pieces and is water resistant to 100 meters. <br> <br> The Vanguard Racing is a chronograph watch with a stainless steel case and a black dial. It is a limited edition of 1000 pieces and is water resistant to 100 meters. <br> <br> The Vanguard Racing is a chronograph watch with a stainless steel case and a black dial. It is a limited edition of 1000 pieces and is water resistant to 100 meters. ",
  },
];

export const fakeSearchResults = {
  test: [items[0]],
};

export const fakeItemById = items.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<number, Item>,
);
