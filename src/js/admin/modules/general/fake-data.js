function getFakePtwData(itemID) {
  return {
    sku: "1234567890",
    price: "$24,500",
    imgSrc: "",
    colorOptions: [
      { active: true, value: "Yellow" },
      { active: false, value: "White" },
      { active: false, value: "Rose" },
      { active: false, value: "Green" },
      { active: false, value: "Blue" },
    ],
    category: "Watches",
  };
}

function getFakeItem() {
  return {
    title: "Jesus Of Nazareth Diamond Pendant 14k Solid Gold 9.25ctw",
    img_src:
      "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/4d230c2794eea92434c287905a3da1ef.jpg",
    id: 23721,
    price: "32,590.50",
    salePrice: "14,590.50",
    options: [
      {
        name: "Color",
        type: "goldColor",
        hidden: false,
        set: [
          {
            color: "Yellow",
            active: true,
            caption: "Yellow",
            class: "Yellow",
          },
        ],
      },
      {
        name: "Diamonds",
        type: "diamonds_quality",
        default_value: "VS",
        set: [
          {
            value: "VS",
            caption: "VS",
            active: true,
          },
        ],
      },
      {
        id: "97",
        name: "Length",
        type: "dropdown",
        selected_value: "8.5",
        show_inches: true,
        set: [
          {
            value: "6.5",
            caption: "6.5",
          },
          {
            value: "7",
            caption: "7",
          },
          {
            value: "7.5",
            caption: "7.5",
          },
          {
            value: "8",
            caption: "8",
          },
          {
            value: "8.5",
            caption: "8.5",
            active: true,
          },
        ],
        chuncks: false,
      },
    ],
  };
}

function getFakeItemsArr() {
  return [
    {
      title: "Jesus Of Nazareth Diamond Pendant 14k Solid Gold 9.25ctw",
      img_src:
        "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/4d230c2794eea92434c287905a3da1ef.jpg",
      id: 23721,
      price: "32,590.50",
    },
    {
      title:
        "0.55ctw Double Halo Round Solitaire Miracle - Diamond Engagement Ring - All Natural",
      img_src:
        "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/24847fddc2e5b43a51764b6266009e7a.jpg",
      id: 23721,
      price: "990",
    },
    {
      title:
        "Double Baguette Square Halo Diamond Engagement Ring 14k Solid Gold - All Natural - 1.10ctw",
      img_src:
        "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/e662310abce6eff77ed5f31c8519662d.jpg",
      id: 23721,
      price: "1,690.75",
    },
    {
      title: "Goat Head Diamond Pendant 14k Solid Gold 1.25ctw",
      img_src:
        "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/7998fbdc0f99db2654ff77aa1c21fa81.jpg",
      id: 23721,
      price: "1,690.75",
    },
    {
      title: "Gypsy Set Diamond Cluster Band Ring 14k Solid Gold 0.33ctw",
      img_src:
        "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/6466b54ad54d1daf8a549aca989417bc.jpg",
      id: 23721,
      price: "1,690.75",
    },
    {
      title:
        "Graduated Border Scattered Gypset Set Diamond Band 14k Solid Gold 0.75ctw",
      img_src:
        "https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/419cc1fd99d75e6b92dd2d9ed59302cc.jpg",
      id: 23721,
      price: "1,690.75",
    },
  ];
}

function getFakeCustomersArr() {
  return [
    {
      id: 2052,
      last_name: "Smith",
      email: "8n0X0@example.com",
      phone: "404-555-1212",
      img_src:
        "https://www.icebox.com/unsafe/300x300/icebox-jewelry.s3.amazonaws.com/whales/8064aee9ea24ccd862f9a6b29b743f8f.png",
    },
    {
      id: 2053,
      first_name: "John",
      last_name: "Green",
      email: "johngreeen01@gmail.com",
    },
    {
      id: 2054,
      first_name: "John",
      last_name: "Doe",
    },
    {
      id: 2052,
      first_name: "Andrew",
      last_name: "Smith",
      email: "8n0X0@example.com",
      phone: "404-555-1212",
    },
    {
      id: 2053,
      first_name: "John",
      last_name: "Green",
      email: "johngreeen01@gmail.com",
      phone: "250-014-0022",
    },
    {
      id: 2054,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe01@gmail.com",
      phone: "250-014-0022",
    },
    {
      id: 2052,
      first_name: "Andrew",
      last_name: "Smith",
      email: "8n0X0@example.com",
      phone: "404-555-1212",
    },
    {
      id: 2053,
      first_name: "John",
      last_name: "Green",
      email: "johngreeen01@gmail.com",
      phone: "250-014-0022",
    },
    {
      id: 2054,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe01@gmail.com",
      phone: "250-014-0022",
    },
  ];
}

function getFakeCustomer(id) {
  return getFakeCustomersArr()[0];
}

function getFakeManulOrder(id) {
  const customer = getFakeCustomer(id);
  const item = getFakeItem(id);
  return {
    customer: customer,
    item: item,
    items: [item],
    other_details: {
      sale_store: "flagship",
      order_date: "01/29/2025",
      edge_sync: "no",
      gift_wrap: "yes",
      picked_up_today: "no",
      paid_in_full: "no",
      tracking: "555",
      today_payment: "251",
      balance: "500",
      paid_method: ["paid_zelle", "paid_paypal", "paid_check"],
      payment_type: "Cash",
    },
  };
}

function getFakeOrderDetails(id) {
  return {
    customer: "Zahir Jooma",
    payment_type: "Cash",
    total: "$1000",
    paid_today: "$500",
    discount: "No",
    items_purchased: [
      {
        title: "Jesus Of Nazareth Diamond",
        price: "32,590.50",
        quantity: "1",
        total: "32,590.50",
      },
    ],
    balance: "$750",
  };
}

export {
  getFakePtwData,
  getFakeItem,
  getFakeItemsArr,
  getFakeCustomer,
  getFakeManulOrder,
  getFakeCustomersArr,
  getFakeOrderDetails,
};
