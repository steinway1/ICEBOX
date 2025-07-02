export interface Item {
  id: number;
  img_src: string;
  cover: string;
  brand?: string;
  model?: string;
  meta?: string;
  name?: string;
  price: string;
  msrp?: string;
  less_msrp?: boolean;
  above_msrp?: boolean;
  material?: string;
  papers?: boolean;
  box?: boolean;
  description?: string;
  condition?: string;
  price_msrp_diff_percentage?: number;
  url: string;
}

export type SearchResults = Array<Item>;
