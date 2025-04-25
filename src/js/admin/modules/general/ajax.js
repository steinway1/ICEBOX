import { showMessage } from "./utils";
import { getFakeCatalogCollection, getFakeOrderDetails } from "./fake-data";

function SaveToInventoryCollection(itemsArray, collectionName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/ajax/inventory-to-collection",
      method: "POST",
      dataType: "json",
      data: { items: itemsArray, name: collectionName },
      success: function (data) {
        resolve(data);
      },
      error: function (xhr, status, error) {
        console.error("Error occurred:", error);
        reject(error); // Reject the promise if an error occurs
      },
    });
  });
}
function AjaxGetCustomer(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/ajax/get-customer/" + id,
      method: "GET", // HTTP method
      dataType: "json", // Expected data type of the response
      success: function (data) {
        if (!data.error) {
          resolve(data.item);
        } else {
          showMessage("error", "Error", data.msg);
          resolve([]);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error occurred:", error);
        reject(error); // Reject the promise if an error occurs
      },
    });
  });
}

function AjaxGetCustomersArray(query) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/ajax/search-customers",
      method: "GET", // HTTP method
      data: { query: query }, // Data sent to the server
      dataType: "json", // Expected data type of the response
      success: function (data) {
        if (!data.error) {
          resolve(data.customers);
        } else {
          showMessage("error", "Error", data.msg);
          resolve([]);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error occurred:", error);
        reject(error); // Reject the promise if an error occurs
      },
    });
  });
}

function AjaxGetItemsArray(query) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/ajax/search-product",
      method: "GET", // HTTP method
      data: { query: query }, // Data sent to the server
      dataType: "json", // Expected data type of the response
      success: function (data) {
        if (!data.error) {
          resolve(data.items);
        } else {
          showMessage("error", "Error", data.msg);
          resolve([]);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error occurred:", error);
        reject(error); // Reject the promise if an error occurs
      },
    });
  });
}

function AjaxGetItem(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/ajax/get-item/" + id,
      method: "GET", // HTTP method
      dataType: "json", // Expected data type of the response
      success: function (data) {
        if (!data.error) {
          resolve(data.item);
        } else {
          showMessage("error", "Error", data.msg);
          resolve([]);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error occurred:", error);
        reject(error); // Reject the promise if an error occurs
      },
    });
  });
}

function submitOrderData(data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/ajax/submit-order",
      method: "POST",
      data: data,
      dataType: "json",
      success: function (data) {
        resolve(data);
      },
      error: function (xhr, status, error) {
        console.error("Error occurred:", error);
        reject(error); // Reject the promise if an error occurs
      },
    });
  });
}

function AjaxGetOrderDetails(id) {
  return new Promise((resolve) => {
    $.ajax({
      url: "/admin/ajax/get-clipboard-order/" + id,
      type: "GET",
      success: function (data) {
        resolve(data);
      },
    });
  });
}

function AjaxGetCatalogCollection(id) {
  return new Promise((resolve) => {
    $.ajax({
      url: "/admin/ajax/get-collection-items/" + id,
      type: "POST",
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
export {
  AjaxGetCustomer,
  AjaxGetCustomersArray,
  AjaxGetItemsArray,
  AjaxGetItem,
  submitOrderData,
  AjaxGetOrderDetails,
  SaveToInventoryCollection,
  AjaxGetCatalogCollection,
};
