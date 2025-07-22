import { CLASSNAMES } from "../../utils/constants";
import { signModalStore } from "../../store/sign-modal-store";
import intlTelInput, { Iti } from "intl-tel-input";
import { Country } from "intl-tel-input/data";
import intlTelInputGlobals from "intl-tel-input";

import $ from "jquery";
(window as any).$ = (window as any).jQuery = $;
import "parsleyjs";

/**
 * USAGE
 * To show message:
 * this.showMsg("Message", false -- success, true -- error);
 *
 * To hide message:
 * this.hideMsg();
 *
 * To set loading:
 * this.setLoading(true);
 *
 * To change Sign modal view
 * signModalStore.set({ view: "phone" });
 * signModalStore.set({ view: "email" });
 * signModalStore.set({ view: "reg" });
 * signModalStore.set({ view: "reset" });
 * signModalStore.set({ view: "otp" });
 */

export class Login {
  private rootEl: HTMLElement | null;
  private formsArr: Array<HTMLElement> = [];
  private phoneInput: HTMLInputElement | null;
  private countryCodeInput: HTMLInputElement | null;
  private confirmOtpBtn: HTMLElement | null;
  private resendOtpBtn: HTMLElement | null;
  private loginOtpForm: HTMLFormElement | null;
  private loginPhoneInput: HTMLInputElement | null;

  constructor(rootEl: HTMLElement) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.formsArr = Array.from(this.rootEl.querySelectorAll("form"));
    this.phoneInput = this.rootEl.querySelector("#otp_phone");
    this.loginPhoneInput = this.rootEl.querySelector("#phone_input_Login");
    this.countryCodeInput = this.rootEl.querySelector("#otp_country");
    this.confirmOtpBtn = this.rootEl.querySelector("#btn_confirm_otp");
    this.resendOtpBtn = this.rootEl.querySelector("#resend-otp-btn");
    this.loginOtpForm = this.rootEl.querySelector("#frm_login_otp");
    this.init();
  }

  init() {
    this.initValidators();
    this.bindWindowParsleySubmit();
    this.bindFormsSubmit();
    this.bindOtp();
  }

  /**
   * -------- PRIVATE METHODS --------
   */
  private initValidators() {
    ($(".needs-validation") as any).parsley({
      errorClass: "is-invalid text-danger",
      successClass: "is-valid",
      errorsWrapper: '<div class="invalid-feedback"></div>',
      errorTemplate: "<span></span>",
      trigger: "change",
    });
  }

  private bindWindowParsleySubmit() {
    const showMsg = this.showMsg;
    const hideMsg = this.hideMsg;
    const setLoading = this.setLoading;

    (window as any).Parsley.on("form:submit", function () {
      var form = $(this.$element[0]);
      var url = form.attr("action");
      setLoading(true);
      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (data) {
          var r = $.parseJSON(data);
          if (!r.error) {
            //show success state on button and return message in r.msg
            showMsg(r.msg, false);
            window.setTimeout(function () {
              if (r.link != undefined && r.link != "") {
                window.location.href = r.link;
              } else {
                window.location.reload();
              }
            }, 3000);
          } else {
            //show failed state on button and return message in r.msg
            showMsg(r.msg, true);
            setTimeout(() => {
              hideMsg();
            }, 3000);
          }
        },
      });
      return false;
    });
  }

  private bindFormsSubmit() {
    this.formsArr.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (($(form) as any).parsley().isValid()) {
          this.setLoading(true);
        }
      });
    });
  }

  /**
   * -------- OTP--------
   */
  private bindOtp() {
    this.confirmOtpBtn?.addEventListener("click", () => {
      this.verifyOtp();
    });

    this.resendOtpBtn?.addEventListener("click", () => {
      this.resendOtp();
    });

    this.loginOtpForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.sendOtp();
    });
  }

  private async resendOtp() {
    const { rootEl } = this;
    if (!rootEl) return;

    const { phoneInput, countryCodeInput } = this;

    if (!phoneInput || !countryCodeInput) {
      console.warn(
        "Phone or country code input not found. Selectors: ",
        "#otp_phone",
        "#otp_country",
      );
      return;
    }

    try {
      this.setLoading(true);
      const phone = phoneInput.value;
      const country = countryCodeInput.value;
      
      const res = await fetch("/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: country,
          phone_number: phone,
        }),
      });

      if (!res.ok) {
        this.showMsg("Failed to send OTP", true);
        throw new Error("Failed to send OTP");
      }

      this.showMsg("OTP sent successfully", false);
      setTimeout(() => {
        this.hideMsg();
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  private async verifyOtp() {
    const { rootEl } = this;
    if (!rootEl) return;

    const otp1: HTMLInputElement | null = rootEl.querySelector("#otp_1");
    const otp2: HTMLInputElement | null = rootEl.querySelector("#otp_2");
    const otp3: HTMLInputElement | null = rootEl.querySelector("#otp_3");
    const otp4: HTMLInputElement | null = rootEl.querySelector("#otp_4");

    /**
     * Throw error if any of the OTP inputs are missing
     */
    if (!otp1 || !otp2 || !otp3 || !otp4) {
      console.warn(
        "OTP inputs not found or some of them are missing. Selectors: ",
        "#otp_1",
        "#otp_2",
        "#otp_3",
        "#otp_4",
      );
      return;
    }

    const { phoneInput, countryCodeInput } = this;
    const otpValue = `${otp1.value}${otp2.value}${otp3.value}${otp4.value}`;

    /**
     * Throw error if OTP is not 4 digits or contains spaces
     */
    if (otpValue.length !== 4 || otpValue.includes(" ")) {
      this.showMsg("Invalid OTP", true);
      return;
    }

    /**
     * Throw error if phone or country code input is missing
     */
    if (!phoneInput || !countryCodeInput) {
      console.warn(
        "Phone or country code input not found. Selectors: ",
        "#otp_phone",
        "#otp_country",
      );
      return;
    }

    /**
     * Fetch the OTP from the server
     */
    try {
      this.setLoading(true);

      const res = await fetch("/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: countryCodeInput.value,
          phone_number: phoneInput.value,
          otp: otpValue,
        }),
      });

      if (!res.ok) {
        this.showMsg("Invalid OTP", true);
        throw new Error("Invalid OTP");
      }

      this.showMsg("OTP verified successfully", false);
      setTimeout(() => {
        this.hideMsg();
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  private async sendOtp() {
    const { rootEl, loginPhoneInput, countryCodeInput, phoneInput } = this;
    if (!rootEl) return;

    /**
     * Throw error if login phone input is missing
     */
    if (!loginPhoneInput) {
      console.warn(
        "Login phone input not found. Selector: ",
        "#phone_input_Login",
      );
      return;
    }

    /**
     * Get the intlTelInput instance for the phone input
     */
    const iti = intlTelInputGlobals.getInstance(loginPhoneInput);
    if (!iti) {
      console.warn("intlTelInput instance not found for loginPhoneInput");
      return;
    }

    /**
     * Get the full phone number and country code
     */
    const fullPhone = iti.getNumber();
    const selectedCountryData = iti.getSelectedCountryData();
    const countryCode = "+" + selectedCountryData.dialCode;
    const phone = fullPhone.replace(countryCode, "");

    /**
     * Throw error if phone or country code input is missing
     */
    if (!phoneInput || !countryCodeInput) {
      console.warn(
        "Phone or country code input not found. Selectors: ",
        "#otp_phone",
        "#otp_country",
      );
      return;
    }

    /**
     * Set the hidden input values
     */
    phoneInput.value = phone;
    countryCodeInput.value = countryCode;

    /**
     * Send the OTP request to the server
     */
    try {
      this.setLoading(true);
      const res = await fetch("/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: countryCode,
          phone_number: phone,
        }),
      });

      if (!res.ok) {
        this.showMsg("Failed to send OTP", true);
        throw new Error("Failed to send OTP");
      }

      const data = await res.json();
      const MsgClass = data.error ? true : false;
      this.showMsg(data.msg, MsgClass);
    } catch (err) {
      this.showMsg("Failed to send OTP", true);
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * -------- UTILS--------
   */
  public showMsg(text: string, isErr?: boolean) {
    signModalStore.set({
      isShowMsg: true,
      msgText: text,
      isErr: isErr || false,
    });
  }

  public hideMsg() {
    signModalStore.set({
      isShowMsg: false,
    });
  }

  public setLoading(bool: boolean) {
    signModalStore.set({
      isLoading: bool,
    });
  }
}
