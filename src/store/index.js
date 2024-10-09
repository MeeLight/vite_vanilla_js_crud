// Models
import PagoMovilModel from './../models/pagoMovil.model.js'

/** @type {'pay2m'} */
const NAME = 'pay2m'

/**
 * ## Store
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Store {
  /** @constructor */
  constructor() {}

  /**
   * @public
   * @static
   * @param {'name'|'last_activity'|'pago_movil'} key
   * @return {boolean}
   */
  static is(key) {
    return localStorage.getItem(`${NAME}_${key}`) !== null
  }

  /**
   * @public
   * @static
   * @param {'name'|'last_activity'|'pago_movil'} key
   * @return {?string}
   */
  static get(key) {
    return localStorage.getItem(`${NAME}_${key}`) ?? null
  }

  /**
   * @public
   * @static
   * @param {'name'|'last_activity'|'pago_movil'} key
   * @param {?string} [value=null]
   * @return {void}
   */
  static set(key, value = null) {
    localStorage.setItem(`${NAME}_${key}`, value)
  }

  /**
   * @public
   * @static
   * @param {{
   *   document:    string,
   *   numberPhone: string,
   *   bank:        string,
   *   alias:       string,
   *   createdAt:   string
   * }}
   * @return {void}
   */
  static setPagoMovil({ document, numberPhone, bank, alias, createdAt }) {
    let jsonText = ''

    if (Store.is('pago_movil')) {
      const pagosMovilesJson = Store.get('pago_movil')

      /**
       * @type {Array.<{
       *   document:    string,
       *   numberPhone: string,
       *   bank:        string,
       *   alias:       string,
       *   createdAt:   string
       * }>}
       */
      const pagosMoviles = Store.getParsedJson(pagosMovilesJson)

      pagosMoviles.push({
        document,
        numberPhone,
        bank,
        alias,
        createdAt
      })

      jsonText = Store.getJson(pagosMoviles)
      localStorage.setItem(`${NAME}_pago_movil`, jsonText)
      return
    }

    jsonText = `[${Store.getJson({
      document,
      numberPhone,
      bank,
      alias,
      createdAt
    })}]`

    localStorage.setItem(`${NAME}_pago_movil`, jsonText)
  }

  /**
   * @public
   * @static
   * @param {Array<any>|object} value
   * @return {void}
   */
  static getJson(value) {
    return JSON.stringify(value)
  }

  /**
   * @public
   * @static
   * @param {string} jsonValue
   * @return {Array<any>|object}
   */
  static getParsedJson(jsonValue) {
    return JSON.parse(jsonValue)
  }
}
