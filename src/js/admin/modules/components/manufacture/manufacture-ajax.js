import { getFakeManualData, getFakeSaksData, getFakeAutoData, getFakeOnlineData } from "./manufacture-fake-data";

function fakeAjaxGetManualData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeManualData();
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetSaksData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeSaksData();
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetAutoData() {	
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeAutoData();
      resolve(data);
    }, 1500);
  });
}

function fakeAjaxGetOnlineData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakeOnlineData();
      resolve(data);
    }, 1500);
  });
}

export { fakeAjaxGetManualData, fakeAjaxGetSaksData, fakeAjaxGetAutoData, fakeAjaxGetOnlineData };
