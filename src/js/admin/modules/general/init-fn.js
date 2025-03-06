import {
  inputAllowOnlyDecimals,
  applyOverloader,
  removeOverloader,
  delay,
  appendPageLoader,
  removePageLoader,
} from "./utils";
import bodymovin from "../../lib/lottie";
import AirDatepicker from "../../lib/air-datepicker";
import PageMsg from "../dynamic/page-msg";
import { AjaxGetOrderDetails } from "./ajax.js";
import { fakeFetchRemoveNote } from "./fake-ajax.js";

function updateInputsAllowOnlyDecimals() {
  const onlyDecimalsInputs = document.querySelectorAll(
    "input[data-allow-decimals]"
  );
  for (const input of onlyDecimalsInputs) {
    inputAllowOnlyDecimals(input);
  }
}

function initLottieElements() {
  const lottieContainers = [
    ...document.querySelectorAll('[data-lottie="score"]'),
  ];
  lottieContainers.forEach((container) => {
    const animation = bodymovin.loadAnimation({
      container: container,
      path: "https://gist.githubusercontent.com/steinway1/e4c3c198b9f2fc369dd72a38f3c22c73/raw/5c7af07965df5f07684b619936285a7e64b57069/toolbar-score.json",
      autoplay: true,
      renderer: "svg",
      loop: true,
    });
  });
}

function attachDatePickers() {
  const arr = [...document.querySelectorAll("[data-datepicker]")];
  for (const input of arr) {
    const options = {
      autoClose: false,
      timepicker: false,
      onSelect({ date }) {
        const datePart = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        input.value = datePart;
      },
    };

    // Если есть атрибут data-date-today, устанавливаем текущую дату
    if (input.hasAttribute("data-date-today")) {
      options.date = new Date(); // Устанавливаем текущую дату как выбранную

      // Форматируем дату сразу для input.value
      const today = new Date();
      const datePart = today.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      input.value = datePart;
    }

    new AirDatepicker(input, options);
  }
}

function bindToggleCustomerRows() {
  const arr = [
    ...document.querySelectorAll(['[data-evt="toggleCustomerRow"]']),
  ];
  for (const elem of arr) {
    elem.addEventListener("click", () => {
      const row = elem.closest(".limit-form__row");
      const text = elem.dataset.text || "More Details";

      if (row) {
        if (row.classList.contains("--collapsed")) {
          row.classList.remove("--collapsed");
          elem.textContent = "Hide";
        } else {
          row.classList.add("--collapsed");
          elem.textContent = text;
        }
      }
    });
  }
}

function bindFingerSizeInput() {
  const arr = [...document.querySelectorAll("[data-finger-input]")];
  const validateValue = (value) => {
    const num = parseFloat(value);
    return /^(\d+(\.5?)?)?$/.test(value) && num <= 25;
  };

  for (const input of arr) {
    input.addEventListener("input", () => {
      // Resrtict Numeric Value
      const value = input.value;
      if (!validateValue(value)) {
        input.value = value.slice(0, -1);
      }
    });
  }
}

function updateLiveDateTime() {
  const elemArr = [...document.querySelectorAll("[data-time-now]")];
  elemArr.forEach((el) => {
    let counter = 0;
    setInterval(() => {
      counter += 1;

      const date = new Date();
      const dateFormatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const timeFormatted = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      el.textContent = `${dateFormatted}, ${timeFormatted}`;
    }, counter * 60000);
  });
}

async function bindCopyOrderDetails() {
  document.addEventListener("click", async (e) => {
    const target = e.target;
    const copyBtn = target.closest("[data-copy-details]");

    if (copyBtn) {
      const orderId = copyBtn.dataset.copyDetails;

      if (!orderId) {
        new PageMsg({ heading: "Error", msg: "No order ID Found" });
        return;
      }

      try {
        applyOverloader(copyBtn);
        /**
         * @Chou Setup here
         */
        const orderDetails = await AjaxGetOrderDetails(orderId);

        if (!orderDetails) {
          throw new Error("Order not found");
        }

        const {
          customer = "",
          payment_type = "Unknown",
          total = "Unknown",
          paid_today = "Unknown",
          discount = "No",
          items_purchased = [],
          balance = "$0.00",
        } = orderDetails;

        let textToCopy = [
          `Customer: ${customer}`,
          `Payment Type: ${payment_type}`,
          `Total: ${total}`,
          `Paid Today: ${paid_today}`,
          `Discount: ${discount}`,
          `Items Purchased: ${items_purchased
            .map((item) => item.title)
            .join(", ")}`,
          `Balance: ${balance}`,
        ].join("\n");

        navigator.clipboard.writeText(textToCopy);

        new PageMsg({
          heading: "Copied!",
          msg: "Order details copied to clipboard",
        });
      } catch (error) {
        new PageMsg({ heading: "Error", msg: error.message });
      } finally {
        removeOverloader(copyBtn);
      }
    }
  });
}

function initSelectStates() {
  const arr = [...document.querySelectorAll("[data-select-states]")];

  const states = [
    { value: "AL", text: "Alabama" },
    { value: "AK", text: "Alaska" },
    { value: "AZ", text: "Arizona" },
    { value: "AR", text: "Arkansas" },
    { value: "CA", text: "California" },
    { value: "CO", text: "Colorado" },
    { value: "CT", text: "Connecticut" },
    { value: "DE", text: "Delaware" },
    { value: "FL", text: "Florida" },
    { value: "GA", text: "Georgia" },
    { value: "HI", text: "Hawaii" },
    { value: "ID", text: "Idaho" },
    { value: "IL", text: "Illinois" },
    { value: "IN", text: "Indiana" },
    { value: "IA", text: "Iowa" },
    { value: "KS", text: "Kansas" },
    { value: "KY", text: "Kentucky" },
    { value: "LA", text: "Louisiana" },
    { value: "ME", text: "Maine" },
    { value: "MD", text: "Maryland" },
    { value: "MA", text: "Massachusetts" },
    { value: "MI", text: "Michigan" },
    { value: "MN", text: "Minnesota" },
    { value: "MS", text: "Mississippi" },
    { value: "MO", text: "Missouri" },
    { value: "MT", text: "Montana" },
    { value: "NE", text: "Nebraska" },
    { value: "NV", text: "Nevada" },
    { value: "NH", text: "New Hampshire" },
    { value: "NJ", text: "New Jersey" },
    { value: "NM", text: "New Mexico" },
    { value: "NY", text: "New York" },
    { value: "NC", text: "North Carolina" },
    { value: "ND", text: "North Dakota" },
    { value: "OH", text: "Ohio" },
    { value: "OK", text: "Oklahoma" },
    { value: "OR", text: "Oregon" },
    { value: "PA", text: "Pennsylvania" },
    { value: "RI", text: "Rhode Island" },
    { value: "SC", text: "South Carolina" },
    { value: "SD", text: "South Dakota" },
    { value: "TN", text: "Tennessee" },
    { value: "TX", text: "Texas" },
    { value: "UT", text: "Utah" },
    { value: "VT", text: "Vermont" },
    { value: "VA", text: "Virginia" },
    { value: "WA", text: "Washington" },
    { value: "WV", text: "West Virginia" },
    { value: "WI", text: "Wisconsin" },
    { value: "WY", text: "Wyoming" },
  ];

  arr.forEach((select) => {
    // Keep existing options
    const existingOptions = select.innerHTML;

    // Add state options
    const stateOptions = states
      .map((state) => `<option value="${state.value}">${state.text}</option>`)
      .join("");

    select.innerHTML = existingOptions + stateOptions;
  });
}

function bindRemoveNote() {
  document.addEventListener("click", async (e) => {
    const target = e.target;
    const removeBtn = target.closest("[data-remove-note]");

    if (removeBtn) {
      const noteId = removeBtn.dataset.removeNote;
      if (!noteId) {
        console.warn("No note ID Found. Expected data-remove-note");
        return;
      }

      try {
        applyOverloader(removeBtn);

        /**
         * @Chou Setup here
         */
        const response = await fakeFetchRemoveNote(noteId);

        if (!response.ok) {
          throw new Error("Failed note remove.");
        }

        new PageMsg({
          type: "success",
          heading: "Success!",
          msg: "Note removed successfully.",
        });
        target.closest(".am-item-note")?.remove();
      } catch (err) {
        console.error(`Error removing note: ${err.message}`);
      } finally {
        removeOverloader(removeBtn);
      }
    }
  });
}

export {
  updateInputsAllowOnlyDecimals,
  initLottieElements,
  bindToggleCustomerRows,
  bindFingerSizeInput,
  attachDatePickers,
  updateLiveDateTime,
  bindCopyOrderDetails,
  initSelectStates,
  bindRemoveNote,
};
