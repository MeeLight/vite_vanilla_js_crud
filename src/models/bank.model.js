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

  /** @private @type {string} */
  #rif

  /**
   * @constructor
   * @param {{code: string, name: string, rif: string}}
   */
  constructor({ code, name, rif }) {
    this.#code = code
    this.#name = name
    this.#rif = rif
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

  /**
   * @public
   * @param {string} rif
   */
  set rif(rif) {
    this.#rif = rif
  }
  /**
   * @public
   * @return {string}
   */
  get getRif() {
    return this.#rif
  }
}
