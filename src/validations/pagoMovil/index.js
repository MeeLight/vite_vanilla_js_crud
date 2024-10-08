'use strict'

// Validations
import UserValidation from './../user/index.js'

/**
 * ## PagoMovil Validation
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class PagoMovilValidation {
  /** @private @type {{[entity: string]: Array.<{pattern: boolean, errorMessage: string}>}} */
  #validations

  /**
   * @constructor
   * @param {string} value
   * @param {{[entity: string]: Array.<{pattern: boolean, errorMessage: string}>}} [othersValidations={}]
   */
  constructor(value, othersValidations = {}) {
    this.#validations = {
      alias: [
        {
          pattern: value.length === 0,
          errorMessage: 'El alias es requerido.'
        },
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
      document: [
        {
          pattern: value.length === 0,
          errorMessage: 'El documento es requerido.'
        },
        {
          pattern: !/^[\d]{7,8}$/.test(value),
          errorMessage: 'El documento no es correcto.'
        }
      ],
      numberPhone: [
        {
          pattern: value.length === 0,
          errorMessage: 'El teléfono es requerido.'
        },
        {
          pattern: !/(0412|0424|0251|0414|0426|0416|0414|412|424|251|414|426|416|414)\d{7}/.test(value),
          errorMessage: 'El teléfono no es correcto.'
        }
      ],
      bank: [
        {
          pattern: value.length === 0,
          errorMessage: 'El banco es requerido.'
        },
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
   *   document:    Array.<{pattern: boolean, errorMessage: string}>,
   *   numberPhone: Array.<{pattern: boolean, errorMessage: string}>,
   *   bank:        Array.<{pattern: boolean, errorMessage: string}>,
   *   alias:       Array.<{pattern: boolean, errorMessage: string}>
   * }}
   */
  get getValidations() {
    return this.#validations
  }
}
