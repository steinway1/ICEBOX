export function getFakeOnlineData() {
	let rows = [];
	for (let i = 0; i < 30; i++) {
		rows.push(
			{
				number: 142509 + i,
				pic: "https://www.icebox.com/unsafe/100x100/icebox-jewelry.s3.amazonaws.com/products/09384c640da8c5a4c3e9ee7fc9b7ac97.jpg",
				title: {
					value: "14KY 1/20ctw VS Eve Moon XS 0.7"
				},
				info: [
					{ title: "QTY", value: "1" },
					{ title: "Weight", value: "1.00ct" },
					{ title: "Color", value: "G" },
					{ title: "Clarity", value: "VS2" },
				],
				receipt: {
					value: "Empty",
				},
				po: "Empty",
				style: "CST-JVTSS1.4-W",
				status: {
					orderID: 13802,
					name: "Special Order",
				},
				price: {
					cost: "$2,500.00",
					price: `$${3500 + i * 100}.00`,
				},
				vendor: {
					orderID: 13802,
					name: "Veda",
				},
				manage: {
					orderID: 13802,
					isWaiting: false,
					allowExport: true,
					allowRemove: false
				}
			}
		)
	}
	return rows;
}

export function getFakeAutoData() {
	let rows = [];
	for (let i = 0; i < 30; i++) {
		rows.push(
			{
				pic: "https://www.icebox.com/unsafe/100x100/icebox-jewelry.s3.amazonaws.com/products/09384c640da8c5a4c3e9ee7fc9b7ac97.jpg",
				title: {
					value: "14KY 1/20ctw VS Eve Moon XS 0.7"
				},
				info: [
					{ title: "QTY", value: "1" },
					{ title: "Weight", value: "1.00ct" },
					{ title: "Color", value: "G" },
				],
				date: `February ${i + 1}, 2025`,
				style: "CST-JVTSS1.4-W",
				po: "001-492802",
				vendor: {
					orderID: 13802,
					name: "Veda",
				},
				manage: {
					orderID: 13802,
					isWaiting: false,
					allowExport: false,
					allowRemove: false
				}
			}
		)
	}
	return rows;
}

export function getFakeSaksData() {
  let rows = [];
  for (let i = 0; i < 30; i++) {
    rows.push({
      "#": 142509 + i,
      type: "Saks",
      pic: "https://www.icebox.com/unsafe/100x100/icebox-jewelry.s3.amazonaws.com/products/dada1e0d17a0321858c21b1e1a995793.jpg",
      title: {
        href: "#",
        value: "Custom Large Number Nameplate Pendant",
      },
      status: {
        orderID: 13802,
        name: "Special Order",
      },
      date: ``,
      receipt: {
        href: "#",
        value: "#001-105909",
      },
      po: "001-492802",
      style: "CST-JVTSS1.4-W",
      info: [
        { title: "QTY", value: "1" },
        { title: "Weight", value: "1.00ct" },
        { title: "Color", value: "G" },
        { title: "Clarity", value: "VS2" },
        { title: "Cut", value: "Very Good" },
      ],
      price: {
        cost: "$2,500.00",
        price: `$${3500 + i * 100}.00`,
      },
      vendor: {
        orderID: 14092,
        name: "Evique",
      },
      manage: {
        orderID: 13802,
        isWaiting: false,
				allowExport: true,
				allowRemove: false
      },
    });
  }
  return rows;
}

export function getFakeManualData() {
  let rows = [];
  for (let i = 0; i < 30; i++) {
    rows.push({
      "#": 142509 + i,
      type: "Asana",
      pic: "https://cdn.prod.website-files.com/673973a838958256e22d8612/6794db819097b958602a3cb4_m5-p-500.webp",
      title: {
        href: "#",
        value:
          "P5605 - CST-JLRBS6.9 - Jesus Of Nazareth Diamond Pendant 14k Solid Gold 9.25ctw",
      },
      category: {
        orderID: 13802,
        name: "diamond earrings",
      },
      date: `February ${i + 1}, 2025`,
      receipt: {
        href: "#",
        value: "#001-105909",
      },
      po: "001-492802",
      style: "CST-JVTSS1.4-W",
      info: [
        { title: "QTY", value: "1" },
        { title: "Weight", value: "1.00ct" },
        { title: "Color", value: "G" },
        { title: "Clarity", value: "VS2" },
        { title: "Cut", value: "Very Good" },
      ],
      status: {
        orderID: 13802,
        name: "Special Order",
      },
      price: {
        cost: "$13,250.00",
        price: `$${18500 + i * 100}.00`,
      },
      vendor: {
        orderID: 13802,
        name: "Evique",
      },
      manage: {
        orderID: 13802,
        isWaiting: false,
				allowRemove: true
      },
    });
  }
  return rows;
}
