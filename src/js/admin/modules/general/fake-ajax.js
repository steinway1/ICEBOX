import { getFakePtwData } from './fake-data'
export function fakeAjaxGetPtwData(itemID) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getFakePtwData(itemID)
      // const data = false
      resolve(data)
    }, 500)
  })
}

export function fakeFetchSuccess() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeResponse = {
        ok: true,
        statusText: 'OK',
        json: async () => ({}),
      };
      resolve(fakeResponse)
    }, 1000)
  })
}