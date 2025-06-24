export interface Item {
  img_src: string;
  brand?: string;
  model?: string;
  meta?: string;
  price: string;
  url: string;
}

export type SearchResults = Array<Item>;
