import type { Item, SearchResults } from "../types/items";
import { fakeItemById, fakeSearchResults } from "./fake-data";

export function fakeAjaxGetSearchResults(
  query: string,
): Promise<SearchResults> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeSearchResults[query]);
    }, 1000);
  });
}

export function fakeAjaxGetItemById(id: number): Promise<Item> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeItemById[id]);
    }, 1000);
  });
}
