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
      const form = $(this.$element[0]);
      const url = form.attr("action");

      if (form.hasClass("otp-registration")) {
        const loginPhoneInput = form.find('input[name="phone"]')[0];

        if (!loginPhoneInput) {
          console.warn("Phone input not found in form");
          return;
        }

        const iti = intlTelInputGlobals.getInstance(loginPhoneInput);
        if (!iti) {
          console.warn("intlTelInput instance not found for loginPhoneInput");
          return;
        }

        const fullPhone = iti.getNumber();
        const selectedCountryData = iti.getSelectedCountryData();
        const countryCode = "+" + selectedCountryData.dialCode;
        const phone = fullPhone.replace(countryCode, "");

        const ensureHiddenInput = (name, value) => {
          let input = form.find(`input[name="${name}"]`);
          if (!input.length) {
            input = $(`<input type="hidden" name="${name}">`).appendTo(form);
          }
          input.val(value);
        };

        ensureHiddenInput("country_code", countryCode);
        ensureHiddenInput("phone_number", phone);
      }

      setLoading(true);
      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (data) {
          setLoading(false);
          const r = $.parseJSON(data);

          if (!r.error) {
            showMsg(r.msg, false);
            if (r.ask_otp != null) {
              setTimeout(() => {
                hideMsg();
              }, 3000);
              if(!r.error){
                signModalStore.set({ view: "otp" })
                $('#otp_country').val(r.country_code);
                $('#otp_phone').val(r.phone);
              }
            } else {
              window.setTimeout(function () {
                if (r.link !== undefined && r.link !== "") {
                  window.location.href = r.link;
                } else {
                  window.location.reload();
                }
              }, 3000);
            }
          } else {
            showMsg(r.msg,true);
            setTimeout(() => {
              hideMsg();
            }, 3000);
          }
        },
        error: function () {
          showMsg("An error occurred. Please try again.", true);
          setLoading(false);
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
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          country_code: country,
          phone_number: phone,
        }),
      });

      if (!res.ok) {
        this.showMsg("Failed to send OTP", true);
        throw new Error("Failed to send OTP");
      }
      const data = await res.json();
      if(!data.error){
        this.showMsg("OTP sent successfully", false);
        setTimeout(() => {
          this.hideMsg();
        }, 3000);
      }else{
        this.showMsg(data.msg,true);
      }


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
     * Fetch the OTP from the server
     */
    try {
      this.setLoading(true);

      const res = await fetch("/confirm-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          country_code: countryCodeInput.value,
          phone_number: phoneInput.value,
          otp_code: otpValue
        }),
      });
      if (!res.ok) {
        this.showMsg("Failed to verify OTP", true);
        throw new Error("Failed to verify OTP");
      }
      const data = await res.json();
      if(!data.error){
        this.showMsg(data.msg, false);
        setTimeout(() => {
          this.hideMsg();
          location.reload();
        }, 3000);
      }else{
        this.showMsg(data.msg,true);
      }
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
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
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
      if(data.msg != ''){
        this.showMsg(data.msg, MsgClass);
      }
      if(!data.error){
        signModalStore.set({ view: "otp" })
      }
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
