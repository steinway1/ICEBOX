import type {Item} from "../types/items";
import {fakeItemById} from "./fake-data";

export function AjaxGetItemById(id: number): Promise<Item> {
    return new Promise((resolve) => {
        fetch('/json/product-quick-view/' + id)
            .then(response => response.json())
            .then(result => {
                if (!result.error) {
                    resolve(result.item);
                }
            })
            .catch(error => {
                console.error('Error fetching product quick view:', error);
            });
    });
}