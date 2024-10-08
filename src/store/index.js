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
}
