'use strict'

/**
 * @class Component
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Component {
  /**
   * @public
   * @type {HTMLElementTagNameMap[keyof HTMLElementTagNameMap]|null}
   */
  node

  /**
   * @constructor
   * @param {keyof HTMLElementTagNameMap} type
   * @param {Document|null} [parentElement=null]
   */
  constructor(type, parentElement = null) {
    if (parentElement === null) {
      this.node = document.createElement(type)
    } else {
      this.node = parentElement.createElement(type)
    }
  }

  /**
   * @public
   * @return {HTMLElement|null}
   */
  get getElement() {
    return this.node
  }

  /**
   * @public
   * @param {string} qualifiedName
   * @param {string} value
   * @return {void}
   */
  setAttribute(qualifiedName, value) {
    this.node.setAttribute(qualifiedName, value)
  }

  /**
   * @public
   * @param {string|null} value
   * @return {void}
   */
  setText(value) {
    if (value === null || value === '') return
    this.node.textContent = value
  }

  /**
   * @public
   * @param {string} value
   * @return {void}
   */
  setHtml(value) {
    if (!value || value === '') return
    this.node.innerHTML = value
  }

  /**
   * @public
   * @param {Document} parentElement
   * @return {void}
   */
  deleteOfDOM(parentElement) {
    parentElement.removeChild(this.node)
  }
}
