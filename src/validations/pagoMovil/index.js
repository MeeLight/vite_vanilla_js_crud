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
      alias: [
        UserValidation.getNameValidations(value)[1],
        {
          pattern: UserValidation.getNameValidations(value)[1].pattern,
          errorMessage: UserValidation.getNameValidations(
            value
          )[1].errorMessage.replace('nombre', 'alias')
        },
        {
          pattern: !/^[a-z\s\d]+$/i.test(value),
          errorMessage: `Los caracteres especiales no son permitidos.`
        },
        {
          pattern: UserValidation.getNameValidations(value)[0].pattern,
          errorMessage: UserValidation.getNameValidations(
            value
          )[0].errorMessage.replace('Hay', 'Hubo')
        }
      ],
      document: [{}],
      numberPhone: [{}],
      bank: [
        {
          pattern: /\s{2}/.test(value),
          errorMessage: 'El banco no es correcto.'
        },
        {
          pattern: !/^\d{4} - [a-zA-Z\s1058%]{1,48}$/i.test(value),
          errorMessage: 'El banco no es correcto.'
        },
        {
          errorMessage: 'El banco no es correcto.',
          pattern:
            !/(0102 - Banco de Venezuela)|(0156 - 100% Banco)|(0172 - Bancamiga Banco Microfinanciero C A)|(0114 - Bancaribe)|(0171 - Banco Activo)|(0166 - Banco Agricola de Venezuela)|(0175 - Banco Bicentenario del Pueblo)|(0128 - Banco Caroni)|(0163 - Banco Del Tesoro)|(0115 - Banco Exterior)|(0151 - Banco Fondo Comun)|(0173 - Banco Internacional de Desarrollo)|(0105 - Banco Mercantil)|(0104 - Banco Venezolano de Credito)|(0138 - Banco Plaza)|(0137 - Banco Sofitasa)|(0191 - Banco Nacional de Credito)|(0168 - Bancrecer)|(0134 - Banesco)|(0177 - Banfanb)|(0146 - Bangente)|(0174 - Banplus)|(0108 - BBVA Provincial)|(0157 - DelSur Banco Universal)|(0169 - Mi Banco)|(0178 - N58 Banco Digital Banco Microfinciero S A)/i.test(
              value
            )
        }
      ],
      ...othersValidations
    }
  }

  /**
   * @public
   * @return {{
   *   document:    Array.<{pattern: RegExp, errorMessage: string}>,
   *   numberPhone: Array.<{pattern: RegExp, errorMessage: string}>,
   *   bank:        Array.<{pattern: RegExp, errorMessage: string}>,
   *   alias:       Array.<{pattern: RegExp, errorMessage: string}>
   * }}
   */
  get getValidations() {
    return this.#validations
  }
}
