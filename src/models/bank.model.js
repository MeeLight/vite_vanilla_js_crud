'use strict'

/**
 * ## Bank Model
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class BankModel {
  /** @private @type {string} */
  #code

  /** @private @type {string} */
  #name

  /**
   * @constructor
   * @param {{code: string, name: string}}
   */
  constructor({ code, name }) {
    this.#code = code
    this.#name = name
  }

  /**
   * @public
   * @param {string} code
   */
  set code(code) {
    this.#code = code
  }
  /**
   * @public
   * @return {string}
   */
  get getCode() {
    return this.#code
  }

  /**
   * @public
   * @param {string} name
   */
  set name(name) {
    this.#name = name
  }
  /**
   * @public
   * @return {string}
   */
  get getName() {
    return this.#name
  }
}
