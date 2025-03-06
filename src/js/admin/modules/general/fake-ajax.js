import {
  getFakePtwData,
  getFakeItem,
  getFakeItemsArr,
  getFakeCustomer,
  getFakeManulOrder,
  getFakeCustomersArr,
  getFakeOrderDetails,
} from "./fake-data";

function fakeAjaxGetPtwData(itemID) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakePtwData(itemID);
      // const data = false
      resolve(data);
    }, 500);
  });
}

function fakeFetchSuccess() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: "OK",
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 1000);
  });
}

function fakeAjaxGetOrder(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeManulOrder(id);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetOrderDetails(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeOrderDetails(id);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetCustomer(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeCustomer(id);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetCustomers(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeCustomersArr(query);
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetItemsArray(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeItemsArr();
      // const data = []
      resolve(data);
    }, 2000);
  });
}

function fakeAjaxGetItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeItem();
      // const data = false
      resolve(data);
    }, 1500);
  });
}

function fakeFetchPost(url, options) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: "OK",
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 1500);
  });
}

function fakeFetchRemoveOrder(url, options) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: "OK",
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 2500);
  });
}

function fakeFetchRemoveNote(url, options) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: "OK",
        json: async () => ({}),
      };
      resolve(fakeResponse);
    }, 2000);
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
};
