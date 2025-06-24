import type { SearchResults } from "../types/items";
import { fakeSearchResults } from "./fake-data";

export function fakeAjaxGetSearchResults(
  query: string,
): Promise<SearchResults> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeSearchResults[query]);
    }, 1000);
  });
}
