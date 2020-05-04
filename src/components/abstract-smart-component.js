import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  _recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();

    const newElement = this.getElement();

    oldElement.replaceWith(newElement);

    this._recoveryListeners();
  }
}
