import {
  getFakePtwData,
  getFakeItem,
  getFakeItemsArr,
  getFakeCustomer,
  getFakeManulOrder,
  getFakeCustomersArr,
  getFakeOrderDetails,
  getFakeSeoPage,
  getFakeCatalogCollection,
  getFakeDiamondItem,
  getFakeChainItem,
  getFakeSubcategoryItems,
  getFakeSubcategories,
} from './fake-data';

function fakeAjaxGetPtwData(itemID) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakePtwData(itemID);
      // const data = false
      resolve(data);
    }, 500);
  });
}

function fakeFetchSuccess() {
  return new Promise(resolve => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: 'OK',
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 1000);
  });
}

function fakeAjaxGetOrder(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeManulOrder(id);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetOrderDetails(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeOrderDetails(id);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetCustomer(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeCustomer(id);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetCustomers(query) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeCustomersArr(query);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetItemsArray(query) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeItemsArr();
      // const data = []
      resolve(data);
    }, 2000);
  });
}

function fakeAjaxGetItem(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeItem();
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeFetchPost(url, options) {
  return new Promise(resolve => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: 'OK',
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 1500);
  });
}

function fakeFetchRemoveOrder(url, options) {
  return new Promise(resolve => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: 'OK',
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 2500);
  });
}

function fakeFetchRemoveNote(url, options) {
  return new Promise(resolve => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: 'OK',
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 2000);
  });
}

function fakeFetchSaveToCollection(url, options) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ ok: true });
    }, 2000);
  });
}

function fakeFetchSaveItemTitle(url, options) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ ok: true });
    }, 2000);
  });
}

function fakeFetchSaveSeoPage(url, options) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ ok: true });
    }, 2000);
  });
}

function fakeAjaxGetSeoPage(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeSeoPage();
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetCatalogCollection(collectionName) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeCatalogCollection(collectionName);
      resolve(data);
    }, 2000);
  });
}

function fakeAjaxGetDiamondItem(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeDiamondItem(url);
      resolve(data);
    }, 2000);
  });
}

function fakeAjaxGetChainItem(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeChainItem(url);
      resolve(data);
    }, 2000);
  });
}

function fakeAjaxGetSubcategoryItems(category, subcategory) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeSubcategoryItems(category, subcategory);
      resolve(data);
    }, 500);
  });
}

function fakeAjaxGetSubcategories(category) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = getFakeSubcategories(category);
      resolve(data);
    }, 500);
  });
}
export {
  fakeAjaxGetPtwData,
  fakeFetchSuccess,
  fakeAjaxGetOrder,
  fakeAjaxGetCustomer,
  fakeAjaxGetCustomers,
  fakeAjaxGetItemsArray,
  fakeAjaxGetItem,
  fakeFetchPost,
  fakeFetchRemoveOrder,
  fakeAjaxGetOrderDetails,
  fakeFetchRemoveNote,
  fakeFetchSaveToCollection,
  fakeFetchSaveItemTitle,
  fakeAjaxGetSeoPage,
  fakeFetchSaveSeoPage,
  fakeAjaxGetCatalogCollection,
  fakeAjaxGetDiamondItem,
  fakeAjaxGetChainItem,
  fakeAjaxGetSubcategoryItems,
  fakeAjaxGetSubcategories,
};
