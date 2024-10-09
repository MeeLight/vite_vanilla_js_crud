'use strict'

// Models
import PersonModel from './person.model.js'
import BankModel from './bank.model.js'

/**
 * ## PagoMovil Model
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class PagoMovilModel extends PersonModel {
  /** @private @type {string} */
  #alias

  /** @private @type {BankModel} */
  #bank

  /** @private @type {string} */
  #createdAt

  /**
   * @constructor
   * @param {{
   *   alias:       string,
   *   document:    string,
   *   numberPhone: string,
   *   bank:        {code: string, name: string}
   * }}
   */
  constructor({ document, alias, numberPhone, bank }) {
    super({ document, numberPhone })
    this.#alias = alias
    this.#bank = new BankModel({ ...bank })

    /** @type {Intl.DateTimeFormatOptions} */
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }

    this.#createdAt = new Intl.DateTimeFormat('es-VE', options).format(
      new Date()
    )
  }

  /**
   * @public
   * @param {string} alias
   */
  set alias(alias) {
    this.#alias = alias
  }
  /**
   * @public
   * @return {string}
   */
  get getAlias() {
    return this.#alias
  }

  /**
   * @public
   * @return {{ code: string, name: string }}
   */
  get getBank() {
    return this.#bank
  }

  /**
   * @public
   * @example '0102 - BANCO DE VENEZUELA'
   * @return {string}
   */
  get getBankInfo() {
    return `${this.#bank.getCode} - ${this.#bank.getName}`
  }

  /**
   * @public
   * @return {string}
   */
  get getCreatedAt() {
    return this.#createdAt
  }
}
