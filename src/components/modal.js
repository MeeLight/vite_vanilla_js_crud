/**
 * @class Modal (dialog)
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Modal {
  /** @type {HTMLDialogElement} */
  #node

  /**
   * @constructor
   * @param {Document|null} [parentElement=null]
   */
  constructor(parentElement = null) {
    if (parentElement === null) {
      this.#node = document.createElement('dialog')
    } else {
      this.#node = parentElement.createElement('dialog')
    }
  }

  get getModal() {
    return this.#node
  }

  /**
   * @param {string} qualifiedName
   * @param {string} value
   * @return {void}
   */
  setAttribute(qualifiedName, value) {
    this.#node.setAttribute(qualifiedName, value)
  }

  /**
   * @param {string|null} value
   * @return {void}
   */
  setText(value) {
    if (value === null || value === '') return
    this.#node.textContent = value
  }

  /**
   * @param {string} value
   * @return {void}
   */
  setHtml(value) {
    if (!value || value === '') return
    this.#node.innerHTML = value
  }
}
