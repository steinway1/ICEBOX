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

export function fakeAjaxPost(url: string, data: any): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data === false) {
        resolve({ success: false });
      } else {
        resolve({ success: true });
      }
    }, 1000);
  });
}
