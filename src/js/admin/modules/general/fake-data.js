function getFakePtwData(itemID) {
  return {
    sku: '1234567890',
    price: '$24,500',
    imgSrc: '',
    colorOptions: [
      { active: true, value: 'Yellow' },
      { active: false, value: 'White' },
      { active: false, value: 'Rose' },
      { active: false, value: 'Green' },
      { active: false, value: 'Blue' },
    ],
    category: 'Watches',
  };
}

function getFakeItem() {
  return {
    title: 'Jesus Of Nazareth Diamond Pendant 14k Solid Gold 9.25ctw',
    img_src:
      'https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/4d230c2794eea92434c287905a3da1ef.jpg',
    id: 23721,
    price: '32,590.50',
    salePrice: '14,590.50',
    options: [
      {
        name: 'Color',
        type: 'goldColor',
        hidden: false,
        set: [
          {
            color: 'Yellow',
            active: true,
            caption: 'Yellow',
            class: 'Yellow',
          },
        ],
      },
      {
        name: 'Diamonds',
        type: 'diamonds_quality',
        default_value: 'VS',
        set: [
          {
            value: 'VS',
            caption: 'VS',
            active: true,
          },
        ],
      },
      {
        id: '97',
        name: 'Length',
        type: 'dropdown',
        selected_value: '8.5',
        show_inches: true,
        set: [
          {
            value: '6.5',
            caption: '6.5',
          },
          {
            value: '7',
            caption: '7',
          },
          {
            value: '7.5',
            caption: '7.5',
          },
          {
            value: '8',
            caption: '8',
          },
          {
            value: '8.5',
            caption: '8.5',
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
      title: 'Jesus Of Nazareth Diamond Pendant 14k Solid Gold 9.25ctw',
      img_src:
        'https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/4d230c2794eea92434c287905a3da1ef.jpg',
      id: 23721,
      price: '32,590.50',
    },
    {
      title: '0.55ctw Double Halo Round Solitaire Miracle - Diamond Engagement Ring - All Natural',
      img_src:
        'https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/24847fddc2e5b43a51764b6266009e7a.jpg',
      id: 23721,
      price: '990',
    },
    {
      title: 'Double Baguette Square Halo Diamond Engagement Ring 14k Solid Gold - All Natural - 1.10ctw',
      img_src:
        'https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/e662310abce6eff77ed5f31c8519662d.jpg',
      id: 23721,
      price: '1,690.75',
    },
    {
      title: 'Goat Head Diamond Pendant 14k Solid Gold 1.25ctw',
      img_src:
        'https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/7998fbdc0f99db2654ff77aa1c21fa81.jpg',
      id: 23721,
      price: '1,690.75',
    },
    {
      title: 'Gypsy Set Diamond Cluster Band Ring 14k Solid Gold 0.33ctw',
      img_src:
        'https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/6466b54ad54d1daf8a549aca989417bc.jpg',
      id: 23721,
      price: '1,690.75',
    },
    {
      title: 'Graduated Border Scattered Gypset Set Diamond Band 14k Solid Gold 0.75ctw',
      img_src:
        'https://www.icebox.com/unsafe/400x0/icebox-jewelry.s3.amazonaws.com/products/419cc1fd99d75e6b92dd2d9ed59302cc.jpg',
      id: 23721,
      price: '1,690.75',
    },
  ];
}

function getFakeCustomersArr() {
  return [
    {
      id: 2052,
      last_name: 'Smith',
      email: '8n0X0@example.com',
      phone: '404-555-1212',
      img_src:
        'https://www.icebox.com/unsafe/300x300/icebox-jewelry.s3.amazonaws.com/whales/8064aee9ea24ccd862f9a6b29b743f8f.png',
    },
    {
      id: 2053,
      first_name: 'John',
      last_name: 'Green',
      email: 'johngreeen01@gmail.com',
    },
    {
      id: 2054,
      first_name: 'John',
      last_name: 'Doe',
    },
    {
      id: 2052,
      first_name: 'Andrew',
      last_name: 'Smith',
      email: '8n0X0@example.com',
      phone: '404-555-1212',
    },
    {
      id: 2053,
      first_name: 'John',
      last_name: 'Green',
      email: 'johngreeen01@gmail.com',
      phone: '250-014-0022',
    },
    {
      id: 2054,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe01@gmail.com',
      phone: '250-014-0022',
    },
    {
      id: 2052,
      first_name: 'Andrew',
      last_name: 'Smith',
      email: '8n0X0@example.com',
      phone: '404-555-1212',
    },
    {
      id: 2053,
      first_name: 'John',
      last_name: 'Green',
      email: 'johngreeen01@gmail.com',
      phone: '250-014-0022',
    },
    {
      id: 2054,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe01@gmail.com',
      phone: '250-014-0022',
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
      sale_store: 'flagship',
      order_date: '01/29/2025',
      edge_sync: 'no',
      gift_wrap: 'yes',
      picked_up_today: 'no',
      paid_in_full: 'no',
      tracking: '555',
      today_payment: '251',
      balance: '500',
      paid_method: ['paid_zelle', 'paid_paypal', 'paid_check'],
      payment_type: 'Cash',
    },
  };
}

function getFakeOrderDetails(id) {
  return {
    customer: 'Zahir Jooma',
    payment_type: 'Cash',
    total: '$1000',
    paid_today: '$500',
    discount: 'No',
    items_purchased: [
      {
        title: 'Jesus Of Nazareth Diamond',
        price: '32,590.50',
        quantity: '1',
        total: '32,590.50',
      },
    ],
    balance: '$750',
  };
}

function getFakeSeoPage() {
  return {
    id: '1',
    url: 'https://www.icebox.com/terms-and-conditions',
    title: 'Icebox Jewelry Return & Exchange Policy - Diamond & Gold Jewelry',
    keywords:
      'jewelry return policy, diamond jewelry exchange, gold chain returns, luxury jewelry warranty, custom jewelry policy, Icebox guarantees, jewelry satisfaction policy',
    description:
      "Understand Icebox's comprehensive return and exchange policies for diamond jewelry, gold chains, and custom pieces. Our commitment to customer satisfaction includes clear guidelines for returns, exchanges, and warranty information.",
    heading: 'Icebox Return & Exchange Policy',
    subheading:
      '<p>Our <strong>customer satisfaction guarantee</strong> ensures your complete confidence when purchasing <strong>luxury diamond jewelry</strong> and <strong>premium gold chains</strong>. Icebox provides a <strong>30-day return period</strong> for eligible items, along with <strong>detailed exchange options</strong> and <strong>warranty protection</strong> for your valuable purchases. Please review our <strong>return eligibility requirements</strong> and <strong>exchange procedures</strong> below, as <strong>custom-designed pieces</strong> and certain items may have specific policies. All <strong>refund transactions</strong> are processed according to the <strong>original payment method</strong> used during purchase.</p>',
    structured_data:
      '{"@context":"https://schema.org","@type":"WebPage","mainEntityOfPage":{"@type":"WebPage","@id":"https://www.icebox.com/return-policy/"},"name":"Icebox Return & Exchange Policy","description":"Understand Icebox\'s comprehensive return and exchange policies for diamond jewelry, gold chains, and custom pieces. Our commitment to customer satisfaction includes clear guidelines for returns, exchanges, and warranty information.","publisher":{"@type":"JewelryStore","name":"Icebox","logo":{"@type":"ImageObject","url":"https://www.icebox.com/assets/public-2022/v4/favicons/new/favicon-32x32.png?v=641530abd62e8"},"address":{"@type":"PostalAddress","streetAddress":"3255 Peachtree Road NE","addressLocality":"Atlanta","addressRegion":"GA","postalCode":"30305","addressCountry":"US"},"telephone":"+1-404-555-1234","email":"sales@icebox.com","url":"https://www.icebox.com"},"specialty":["Luxury Jewelry Returns","Diamond Jewelry Exchange","Gold Chain Warranty"],"about":{"@type":"Thing","name":"Jewelry Return Policy","description":"Comprehensive information about returning and exchanging luxury jewelry items at Icebox, including timeframes, conditions, and processes for returns and exchanges."},"offers":{"@type":"Offer","itemOffered":{"@type":"Service","name":"Jewelry Return & Exchange Service","description":"Icebox offers a customer-friendly return and exchange policy for eligible jewelry purchases within 30 days, with special considerations for custom pieces."},"seller":{"@type":"JewelryStore","name":"Icebox"}}}',
  };
}

function getFakeCatalogCollection(collectionName) {
  function getRandomZoom() {
    return Math.floor(Math.random() * 20 + 1) / 10;
  }
  const renderItems = () => {
    return Array(15)
      .fill()
      .map(() => ({
        id: 20912,
        src: 'https://image.icebox.com/unsafe/0x0/icebox-jewelry.s3.amazonaws.com/products/b572c3fcc605e3a3fbc9ed48edaa8227.jpg',
        title: 'Pear Ruby With Diamond Halo Pendant 14k Solid Gold 0.10ctw',
        price: '5,550',
        description: 'Item is available in yellow, white, rose colors. Made with solid 14k gold.',
        zoom: getRandomZoom(),
      }));
  };

  const collections = {
    'pearl-gold-statement-necklaces': {
      title: 'Pearl Gold Statement Necklaces',
      items: renderItems(),
    },
    'sapphire-eternity-bands': {
      title: 'Sapphire Eternity Bands',
      items: renderItems(),
    },
  };

  return collections[collectionName];
}

function getFakeDiamondItem(url) {
  const items = {
    good: {
      shape: 'RND',
      quality: 'FG-VVS',
      metal: '14K',
      ctw: '0.50',
      weight: '12',
    },
    bad: {
      shape: undefined,
      quality: 'CL',
      metal: '22K',
      ctw: null,
      weight: 0,
    },
  };

  return items[url];
}

function getFakeChainItem(url) {
  const items = {
    good: {
      length: '18',
      metal: '14K',
      weight: '30',
    },
    bad: {
      length: undefined,
      metal: '22K',
      weight: 0,
    },
  };

  return items[url];
}

function getFakeSubcategoryItems(category, subcategory) {
  let items = [];
  let obj = {
    title: 'Jesus Of Nazareth Diamond Pendant 14k Solid Gold 9.25ctw',
    shape: 'RND',
    quality: 'FG-VVS',
    metal: '14K',
    ctw: 0.5,
    weight: 12,
  };
  let chainsObj = {
    title: '14k Solid Gold Rope Chain',
    length: 18,
    metal: '14K',
    weight: 30,
  };
  const renderItems = () => {
    items = Array(8).fill(obj);
    items.push({ ...obj, title: 'Some item with corrupted data', shape: undefined, quality: null });
    return items;
  };

  const renderChains = () => {
    let items = Array(3).fill(chainsObj);
    items.push({ ...chainsObj, title: 'Some item with corrupted data', length: undefined });
    items.push(
      { ...chainsObj, title: '14k Gold Cuban Link Chain', length: 20, metal: '14K', weight: 45 },
      { ...chainsObj, title: '14k Gold Box Chain', length: 22, metal: '14K', weight: 25 },
      { ...chainsObj, title: '18k Gold Snake Chain', length: 16, metal: '18K', weight: 20 },
      { ...chainsObj, title: '14k Gold Figaro Chain', length: 24, metal: '14K', weight: 50 },
      { ...chainsObj, title: '18k Gold Mariner Chain', length: 20, metal: '18K', weight: 35 },
      { ...chainsObj, title: '14k Gold Wheat Chain', length: 18, metal: '14K', weight: 28 },
      { ...chainsObj, title: '14k Gold Singapore Chain', length: 16, metal: '14K', weight: 15 },
    );
    return items;
  };

  const results = {
    pendants: {
      jesus: renderItems(),
    },
    necklaces: {
      miracle: renderItems(),
    },
    goldChains: {
      rope: renderChains(),
    },
  };

  return results[category]?.[subcategory];
}

function getFakeSubcategories(category) {
  let subcategories = {};
  subcategories = {
    pendants: [{ label: 'Jesus', value: 'jesus' }],
    necklaces: [{ label: 'Miracle', value: 'miracle' }],
    goldChains: [{ label: 'Rope', value: 'rope' }],
  };

  return subcategories[category];
}

export {
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
};
