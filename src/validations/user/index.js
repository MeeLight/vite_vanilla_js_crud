'use strict'

/**
 * ## User Validation
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class UserValidation {
  /** @private @type {{[entity: string]: Array.<{pattern: RegExp, errorMessage: string}>}} */
  #validations

  /**
   * @constructor
   * @param {string} value
   * @param {{[entity: string]: Array.<{pattern: RegExp, errorMessage: string}>}} [othersValidations=[]]
   */
  constructor(value, othersValidations = {}) {
    this.#validations = {
      name: [...UserValidation.getNameValidations(value)],
      ...othersValidations
    }
  }

  /**
   * @public
   * @static
   * @param {string} value
   * @return {{pattern: RegExp, errorMessage: string}[]}
   */
  static getNameValidations(value) {
    return [
      {
        pattern: /\s{2}/.test(value),
        errorMessage: 'Hay un error con los espacios en blanco.'
      },
      {
        pattern: /^.?$/.test(value),
        errorMessage: 'El nombre debe tener mínimo 2 caracteres.'
      },
      {
        pattern: !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(value),
        errorMessage: `Los números y caracteres especiales no son permitidos.`
      }
    ]
  }

  /**
   * @public
   * @return {{name: Array.<{pattern: RegExp, errorMessage: string}>}}
   */
  get getValidations() {
    return this.#validations
  }
}
