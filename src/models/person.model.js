'use strict'

/**
 * ## Person Model
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class PersonModel {
  /** @private @type {string} */
  #document

  /** @private @type {string} */
  #numberPhone

  /**
   * @constructor
   * @param {{
   *   document:    string,
   *   numberPhone: string
   * }}
   */
  constructor({ document, numberPhone }) {
    this.#document = document
    this.#numberPhone = numberPhone
  }

  /**
   * @public
   * @param {string} document
   */
  set document(document) {
    this.#document = document
  }
  /**
   * @public
   * @return {string}
   */
  get getDocument() {
    return this.#document
  }

  /**
   * @public
   * @param {string} numberPhone
   */
  set numberPhone(numberPhone) {
    this.#numberPhone = numberPhone
  }
  /**
   * @public
   * @return {string}
   */
  get getNumberPhone() {
    return this.#numberPhone
  }
}
