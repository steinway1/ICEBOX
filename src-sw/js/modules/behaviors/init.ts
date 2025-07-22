import { InputTel } from "./input-tel";
import { Login } from "./login";
import { InputDigits } from "./input-digits";
import { InputOtp } from "./input-otp";
import { PassToggle } from "./pass-toggle";

interface BehaviorDefinition {
  selector: string;
  BehaviorClass: new (el: any) => any;
}

const behaviors: BehaviorDefinition[] = [
  {
    selector: "[data-input='tel']",
    BehaviorClass: InputTel,
  },
  {
    selector: "[data-sign-form]",
    BehaviorClass: Login,
  },
  {
    selector: "[data-input-digits]",
    BehaviorClass: InputDigits,
  },
  {
    selector: "[data-input-otp]",
    BehaviorClass: InputOtp,
  },
  {
    selector: ".pass-toggle-btn",
    BehaviorClass: PassToggle,
  },
];

export const initBehaviors = () => {
  behaviors.forEach(({ selector, BehaviorClass }) => {
    const elementsArr = document.querySelectorAll(selector);
    elementsArr.forEach((el) => new BehaviorClass(el));
  });
};
