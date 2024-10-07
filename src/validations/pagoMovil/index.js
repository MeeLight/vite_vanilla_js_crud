'use strict'

// Validations
import UserValidation from './../user/index.js'

/**
 * ## PagoMovil Validation
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class PagoMovilValidation {
  /** @private @type {{[entity: string]: Array.<{pattern: RegExp, errorMessage: string}>}} */
  #validations

  /**
   * @constructor
   * @param {string} value
   * @param {{[entity: string]: Array.<{pattern: RegExp, errorMessage: string}>}} [othersValidations={}]
   */
  constructor(value, othersValidations = {}) {
    this.#validations = {
      alias: [...UserValidation.getNameValidations(value)],
      document: [{}],
      ...othersValidations
    }
  }

  /**
   * @public
   * @return {Array.<{pattern: RegExp, errorMessage: string}>}
   */
  get getValidations() {
    return this.#validations
  }
}
