'use strict'

import PagoMovilValidation from './../validations/pagoMovil/index.js'

/**
 * @param {string} value
 * @param {HTMLInputElement} inputElement
 * @param {{
 *   entityName:     string,
 *   errorMessageId: string,
 *   submitBtnId:    string,
 *   validations:    Array.<{ pattern: string, errorMessage: string }>,
 *   callback?:      () => void | null
 * }}
 * @return {void}
 */
export const handleInput = (
  value,
  inputElement,
  { entityName, errorMessageId, submitBtnId, validations, callback = null } = {}
) => {
  // Elements
  const errorMessageElement = document.getElementById(errorMessageId)
  const themeColor = document.head.querySelector('meta[name="theme-color"]')
  const submitBtn = document.getElementById(submitBtnId)

  if (value === '') {
    errorMessageElement.textContent = `El ${entityName} es requerido.`
    inputElement.classList.add('input--error')
    submitBtn.setAttribute('disabled', '')
    submitBtn.classList.add('btn__dark--disabled')
    themeColor.setAttribute('content', '#c53030')
  } else {
    submitBtn.removeAttribute('disabled')
    submitBtn.classList.remove('btn__dark--disabled')
    errorMessageElement.textContent = ''
    inputElement.classList.remove('input--error')
    themeColor.setAttribute('content', '#101015')

    // For each validation of the entity
    if (validations.length > 0) {
      validations.forEach(({ pattern, errorMessage }) => {
        if (pattern) {
          errorMessageElement.textContent = errorMessage
          inputElement.classList.add('input--error')
          submitBtn.setAttribute('disabled', '')
          submitBtn.classList.add('btn__dark--disabled')
          themeColor.setAttribute('content', '#c53030')
        }
      })
    }

    if (callback !== null) callback()

    const allInputsElement = document.querySelectorAll('input[required]')
    const inputValues = []
    allInputsElement.forEach(input => inputValues.push(input.value))

    const isNotValidDocument = new PagoMovilValidation(
      inputValues[0]
    ).getValidations.document.some(({ pattern }) => pattern === true)

    const isNotValidNumberPhone = new PagoMovilValidation(
      inputValues[1]
    ).getValidations.numberPhone.some(({ pattern }) => pattern === true)

    const isNotValidBank = new PagoMovilValidation(
      inputValues[2]
    ).getValidations.bank.some(({ pattern }) => pattern === true)

    const isNotValidAlias = new PagoMovilValidation(
      inputValues[3]
    ).getValidations.alias.some(({ pattern }) => pattern === true)

    const isValidForm = [
      isNotValidDocument,
      isNotValidNumberPhone,
      isNotValidBank,
      isNotValidAlias
    ].every(value => value === false)

    if (!isValidForm) {
      submitBtn.setAttribute('disabled', '')
      submitBtn.classList.add('btn__dark--disabled')
      themeColor.setAttribute('content', '#c53030')
    } else {
      submitBtn.removeAttribute('disabled')
      submitBtn.classList.remove('btn__dark--disabled')
      themeColor.setAttribute('content', '#101015')
    }
  }
}
