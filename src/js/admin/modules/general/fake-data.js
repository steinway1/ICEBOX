export function getFakePtwData(itemID) {
  return {
    sku: '1234567890',
    price: '$24,500',
    imgSrc: "",
    colorOptions: [
      {active: true, value: "Yellow"},
      {active: false, value: "White"},
      {active: false, value: "Rose"},
      {active: false, value: "Green"},
      {active: false, value: "Blue"}
    ],
    category: 'Watches'
  }
}