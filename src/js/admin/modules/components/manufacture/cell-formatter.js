export default class Formatter {
  constructor() {
    this.categories = [
      { value: "100", name: "diamond engagement rings" },
      { value: "110", name: "diamond wedding bands" },
      { value: "130", name: "diamond fashion rings - women" },
      { value: "135", name: "diamond fashion rings - men" },
      { value: "150", name: "diamond earrings" },
      { value: "160", name: "diamond pendants" },
      { value: "165", name: "diamond necklaces" },
      { value: "170", name: "diamond bracelets" },
      { value: "185", name: "miscellaneous" },
      { value: "430", name: "gold chains" },
      { value: "500", name: "watches" },
      { value: "505", name: "watch bezels and dials" },
    ];

    this.statuses = [
      { value: "Stock", name: "Stock" },
      { value: "Special Order", name: "Special Order" },
    ];

    this.vendors = [
      { value: "evique", name: "Evique" },
      { value: "recieved", name: "Received Orders" },
      { value: "veda", name: "Veda" },
      { value: "gs", name: "GS" },
      { value: "premier", name: "Premier" },
      { value: "shipped", name: "shipped" },
      { value: "in-house", name: "In-house" },
      { value: "americas-gold", name: "Americas Gold" },
      { value: "alessi", name: "Alessi" },
      { value: "fancy-chains", name: "Fancy Chains" },
      { value: "melano", name: "Melano" },
      { value: "daniel-jewelry", name: "Daniel Jewelry" },
      { value: "haimov", name: "Haimov" },
      { value: "deco", name: "Deco" },
    ];
  }

  number(params) {
    return `<strong class="m-tag --blank">${params.value}</strong>`;
  }

  type(params) {
    const typeClass = `--${params.value.toLowerCase()}`;
    return `<span class="m-tag ${typeClass}">${params.value}</span>`;
  }

  pic(params) {
    return `<div class="m-media-box"><img src="${params.value}" alt=""></div>`;
  }

  title(params) {
    const { href, value } = params.value;
    let html =
      href && href !== ""
        ? `<a class="m-title" href="${href}" target="_blank">${value}</a>`
        : `<span class="m-title">${value}</span>`;
    return `<div>${html}</div>`;
  }

  category(params) {
    const { orderID, name } = params.value;
    return `
    <div class="panel-ps">
        <select class="panel__input for_select" id="category_id_select_${orderID}" onchange="UpdateCategoryId(${orderID})">
        ${this.categories
          .map((category) => {
            return category.name === name
              ? `<option value="${category.value}" selected>${category.name}</option>`
              : `<option value="${category.value}">${category.name}</option>`;
          })
          .join()}
        </select>
    </div>
    `;
  }

  date(params) {
    return `
    <div class="m-details-box">
      <span class="--icon --date"></span>
      <span class="--text">${params.value}</span>
    </div>`;
  }

  receipt(params) {
    const { href, value } = params.value;
    return `
    <div class="m-details-box">
      <span class="--icon --receipt"></span>
      <span class="--text"><a href="${href}" target="_blank">${value}</a></span>
    </div>`;
  }

  po(params) {
    return `
    <div class="m-details-box">
      <span class="--icon --po"></span>
      <span class="--text">${params.value}</span>
    </div>`;
  }

  style(params) {
    return `
    <div class="m-details-box">
      <span class="--icon --style"></span>
      <span class="--text"><strong>${params.value}</strong></span>
    </div>`;
  }

  info(params) {
    return `
    <div class="m-info">
      ${params.value
        .map(
          (info) => `<span>${info.title}: <strong>${info.value}</strong></span>`
        )
        .join("")}
    </div>`;
  }

  status(params) {
    const { orderID, name } = params.value;
    return `
    <div class="panel-ps">
      <select class="panel__input for_select" id="order_type_${orderID}" onchange="updateInstoreOrderType(${orderID});">
        ${this.statuses
          .map((status) => {
            return status.name === name
              ? `<option value="${status.value}" selected>${status.name}</option>`
              : `<option value="${status.value}">${status.name}</option>`;
          })
          .join()}
      </select>
    </div>
    `;
  }

  price(params) {
    const { cost, price } = params.value;
    return `
    <div class="m-info">
      <span class="typo_price">Price: ${price}</span>
      <span class="typo_cost">Cost: ${cost}</span>
    </div>
    `;
  }

  vendor(params) {
    const { orderID, name } = params.value;
    return `
    <div class="panel-ps">
      <select class="panel__input for_select" id="mfg_${orderID}" onchange="updateMfg(${orderID});">
        ${this.vendors
          .map((vendor) => {
            return vendor.name === name
              ? `<option value="${vendor.value}" selected>${vendor.name}</option>`
              : `<option value="${vendor.value}">${vendor.name}</option>`;
          })
          .join()}
      </select>
    </div>
    `;
  }

  manage(params) {
    const { orderID, isWaiting, allowExport, allowRemove } = params.value;
    return `
    <div class="m-btn-group">
      ${allowRemove ? `<button class="m-btn --red" onclick="removeOrder(${orderID});">Remove Order</button>` : ""}
      ${
        isWaiting
          ? `<button class="m-btn --waiting">Waiting</button>`
          : `<button class="m-btn --green" onclick="OrderRecieved(${orderID});">Received</button>`
      }
      ${allowExport ? `<button class="m-btn" onclick="exportAsana(${orderID});">Export To Asana</button>` : ""}
    </div>
    `;
  }
}
