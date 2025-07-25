import { AddWatchesModal } from "./addWatchesModal";
import { AdminProductCard } from "./adminProductCard";

export class AdminBehaviors {
  constructor() {
    this.init();
  }
  private init() {
    new AddWatchesModal();
    new AdminProductCard();
  }
}
