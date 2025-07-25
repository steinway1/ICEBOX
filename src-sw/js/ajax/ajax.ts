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


export function AjaxGetSearchResults(query): Promise<Item> {
    return new Promise(function (resolve, reject) {
        fetch('/ajax/search-suggestions?query=' + encodeURIComponent(query))
            .then(response => {
                if (!response.ok) {
                    reject(new Error('Request failed with status ' + response.status));
                } else {
                    return response.json(); // or response.text() depending on expected format
                }
            })
            .then(data => {
                resolve(data.itemsArr);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function AjaxCreateWatches(n: number): Promise<Item> {
    return new Promise((resolve) => {
        fetch('admin/ajax/create-watches-bulk/' + n)
            .then(response => response.json())
            .then(result => {
                if (!result.error) {
                    resolve(result);
                }
            })
            .catch(error => {
                console.error('Error creating bulk watches:', error);
            });
    });
}