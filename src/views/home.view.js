'use strict'

// Common
import View from './../common/view.js'
import HtmlElement from './../common/htmlElement.js'

// Components
import Modal from './../components/modal.js'
import Nav from './../components/nav.js'
// import Loader from '../components/loader.js'

// Models
import PagoMovilModel from './../models/pagoMovil.model.js'

// Store
import Store from './../store/index.js'

// Validations
import PagoMovilValidation from './../validations/pagoMovil/index.js'

// Helpers
import { handleInput } from './../helpers/index.js'

// Data
import { banksData } from './../data/bank.js'

/**
 * ## Home View
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class HomeView extends View {
  /** @constructor */
  constructor() {
    super()
    this.#showHtmlView()
    document.title = '$ Pay2m | Resumen'
  }

  /**
   * @private
   * @return {{
   *   showModalComponent: (modalElement: Modal) => Promise<void>
   * }}
   */
  get #components() {
    return {
      /**
       * @async
       * @param {Modal} modalElement
       * @return {Promise<void>}
       */
      showModalComponent: async modalElement => {
        modalElement.setHtml(/*html*/ `
          <!-- <form method="dialog" class="form form__cancel">
            <button class="btn btn__cancel">x</button>
          </form> -->
          <h1>Agregar Beneficiario</h1>
          <hr class="line" />

          <form
            class="form new__person__form"
            id="new__person__form"
            autocomplete="off"
          >
            <input
              type="text"
              class="input"
              name="document"
              id="document"
              placeholder="Documento"
              maxlength="8"
              required
            />
            <span class="error__message__of__pagoMovil" id="error__message__of__document"></span>

            <input
              type="tel"
              class="input"
              name="numberPhone"
              id="numberPhone"
              placeholder="Teléfono"
              maxlength="11"
              required
            />
            <span class="error__message__of__pagoMovil" id="error__message__of__numberPhone"></span>

            <input
              type="text"
              class="input"
              name="bank"
              id="bank"
              list="banks"
              placeholder="Banco"
              maxlength="48"
              required
            />
            <span class="error__message__of__pagoMovil" id="error__message__of__bank"></span>

            <input
              type="text"
              class="input"
              name="alias"
              id="alias"
              placeholder="Alias"
              maxlength="35"
              required
            />
            <span class="error__message__of__pagoMovil" id="error__message__of__alias"></span>
          </form>

          <div class="dialog__buttons__container">
            <form method="dialog" class="form form__dialog__buttons">
              <button type="submit" class="btn btn__modal btn__gray--outline">Cancelar</button>
            </form>
            <button
              type="button"
              id="form__submit__btn__modal"
              class="btn btn__modal btn__dark btn__dark--disabled"
              disabled
            >
              Guardar
            </button>
          </div>
        `)

        let banksTemplate = ''
        const banksData = await this.#actions.getBanks()
        const banksDataList = document.createElement('datalist')

        banksDataList.setAttribute('id', 'banks')

        banksData.forEach(({ code, name }) => {
          banksTemplate += `
            <option value="${code} - ${name.toUpperCase()}"></option>
          `
        })

        banksDataList.innerHTML = banksTemplate
        document.body.querySelector('main').appendChild(banksDataList)
      }
    }
  }

  /**
   * @private
   * @return {{
   *   getBanks:           () => Promise<Array.<{code: string, name: string}>>,
   *   clickBtnModalEvent: (mainElement: HTMLElement) => void,
   *   onSubmit:           () => void,
   *   handleDocument: (
   *     event: Event &
   *       {currentTarget: EventTarget & HTMLInputElement} &
   *       {target: HTMLInputElement} & InputEvent,
   *     inputElement: HTMLInputElement
   *   ) => void,
   *   handleNumberPhone: (
   *     event: Event &
   *       {currentTarget: EventTarget & HTMLInputElement} &
   *       {target: HTMLInputElement} & InputEvent,
   *     inputElement: HTMLInputElement
   *   ) => void,
   *   handleBank: (
   *     event: Event &
   *       {currentTarget: EventTarget & HTMLInputElement} &
   *       {target: HTMLInputElement} & InputEvent,
   *     inputElement: HTMLInputElement
   *   ) => void,
   *   handleAlias: (
   *     event: Event &
   *       {currentTarget: EventTarget & HTMLInputElement} &
   *       {target: HTMLInputElement} & InputEvent,
   *     inputElement: HTMLInputElement
   *   ) => void,
   *   isValidForm: () => boolean,
   *   showDataInTable: (isFirstPagoMovil?: boolean) => void
   * }}
   */
  get #actions() {
    return {
      /**
       * @async
       * @return {Promise<Array.<{code: string, name: string}>>}
       */
      async getBanks() {
        try {
          const response = (await import('./../data/json/banks.json')).default
          return response
        } catch (error) {
          console.log(error)
        }
      },

      /**
       * @async
       * @param {HTMLElement} mainElement
       * @return {void}
       */
      clickBtnModalEvent: async mainElement => {
        // Modal config
        const modal = new Modal()

        await this.#components.showModalComponent(modal)
        mainElement.appendChild(modal.getElement)

        modal.show(true)
        modal.deleteOfDOM(mainElement, 'form[method="dialog"]')

        // ---------------------------------------------------------------------

        // Elements
        const classNameOfSaveBtn = '.dialog__buttons__container>button'
        const saveBtn = document.querySelector(classNameOfSaveBtn)

        // Inputs
        const documentInput = document.getElementById('document')
        const numberPhoneInput = document.getElementById('numberPhone')
        const bankInput = document.getElementById('bank')
        const aliasInput = document.getElementById('alias')

        // Events
        documentInput.addEventListener(
          'keyup',
          event => this.#actions.handleDocument(event, documentInput),
          false
        )

        numberPhoneInput.addEventListener(
          'keyup',
          event => this.#actions.handleNumberPhone(event, numberPhoneInput),
          false
        )

        bankInput.addEventListener(
          'keyup',
          event => this.#actions.handleBank(event, bankInput),
          false
        )

        aliasInput.addEventListener(
          'keyup',
          event => this.#actions.handleAlias(event, aliasInput),
          false
        )

        saveBtn.addEventListener('click', () => this.#actions.onSubmit(), false)
      },

      /** @return {boolean} */
      isValidForm() {
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

        return isValidForm
      },

      /**
       * @param {
       *   Event &
       *   {currentTarget: EventTarget & HTMLInputElement} &
       *   {target: HTMLInputElement} & InputEvent
       * } event
       *
       * @param {HTMLInputElement} inputElement
       * @return {void}
       */
      handleDocument: (event, inputElement) => {
        event.preventDefault()

        /** @type {string} */
        const value = event.currentTarget.value

        handleInput(value, inputElement, {
          entityName: 'documento',
          errorMessageId: 'error__message__of__document',
          submitBtnId: 'form__submit__btn__modal',
          validations: new PagoMovilValidation(value).getValidations.document
        })
      },

      /**
       * @param {
       *   Event &
       *   {currentTarget: EventTarget & HTMLInputElement} &
       *   {target: HTMLInputElement} & InputEvent
       * } event
       *
       * @param {HTMLInputElement} inputElement
       * @return {void}
       */
      handleNumberPhone: (event, inputElement) => {
        event.preventDefault()

        /** @type {string} */
        const value = event.currentTarget.value

        /** @type {HTMLInputElement} */
        const numberPhoneInput = document.getElementById('numberPhone')

        handleInput(value, inputElement, {
          entityName: 'teléfono',
          errorMessageId: 'error__message__of__numberPhone',
          submitBtnId: 'form__submit__btn__modal',
          validations: new PagoMovilValidation(value).getValidations
            .numberPhone,
          callback() {
            const pattern = /(412|424|251|414|426|416|414)\d{7}/

            numberPhoneInput.setAttribute(
              'maxlength',
              pattern.test(value) ? '10' : '11'
            )
          }
        })
      },

      /**
       * @param {
       *   Event &
       *   {currentTarget: EventTarget & HTMLInputElement} &
       *   {target: HTMLInputElement} & InputEvent
       * } event
       *
       * @param {HTMLInputElement} inputElement
       * @return {void}
       */
      handleBank: (event, inputElement) => {
        event.preventDefault()

        /** @type {string} */
        const value = event.currentTarget.value

        // Elements
        const errorMessage = document.getElementById('error__message__of__bank')
        const btn = document.getElementById('form__submit__btn__modal')
        const theme = document.head.querySelector('meta[name="theme-color"]')

        handleInput(value, inputElement, {
          entityName: 'banco',
          errorMessageId: 'error__message__of__bank',
          submitBtnId: 'form__submit__btn__modal',
          validations: new PagoMovilValidation(value).getValidations.bank,
          callback() {
            if (
              !banksData.some(
                bank => value.toUpperCase() === bank.toUpperCase()
              )
            ) {
              errorMessage.textContent = 'El banco no es correcto.'
              inputElement.classList.add('input--error')
              btn.setAttribute('disabled', '')
              btn.classList.add('btn__dark--disabled')
              theme.setAttribute('content', '#c53030')
            }
          }
        })
      },

      /**
       * @param {
       *   Event &
       *   {currentTarget: EventTarget & HTMLInputElement} &
       *   {target: HTMLInputElement} & InputEvent
       * } event
       *
       * @param {HTMLInputElement} inputElement
       * @return {void}
       */
      handleAlias: (event, inputElement) => {
        event.preventDefault()

        /** @type {string} */
        const value = event.currentTarget.value

        handleInput(value, inputElement, {
          entityName: 'alias',
          errorMessageId: 'error__message__of__alias',
          submitBtnId: 'form__submit__btn__modal',
          validations: new PagoMovilValidation(value).getValidations.alias,
          callback() {
            const whitespacesPattern = /\s{2}/.test(value)
            const charactersPattern = !/^[a-z\s\d]+$/i.test(value)

            if ([charactersPattern, whitespacesPattern].includes(true)) {
              inputElement.value = ''
            }
          }
        })
      },

      /** @return {void} */
      onSubmit() {
        /** @type {HTMLFormElement} */
        const form = document.getElementById('new__person__form')

        /** @type {HTMLButtonElement} */
        const savedBtnElement = document.getElementById(
          'form__submit__btn__modal'
        )

        /** @type {{document: string, numberPhone: string, bank: string, alias: string}} */
        const data = Object.fromEntries(new FormData(form).entries())

        // Bank Information
        const bank = data.bank.toUpperCase().trim()
        const code = bank.substring(0, 4)
        const bankName = bank.substring(7, bank.length)
        let numberPhone = data.numberPhone.trim()

        if (numberPhone[0] !== '0') {
          numberPhone = `0${numberPhone}`
        }

        const pagoMovil = new PagoMovilModel({
          document: data.document.trim(),
          numberPhone,
          bank: { code, name: bankName },
          alias: data.alias.trim()
        })

        const lastActivity = new Intl.DateTimeFormat('es-VE', {
          minute: '2-digit'
        }).format(new Date())

        Store.set('last_activity', lastActivity)

        Store.setPagoMovil({
          document: pagoMovil.getDocument,
          numberPhone: pagoMovil.getNumberPhone,
          bank: pagoMovil.getBankInfo,
          alias: pagoMovil.getAlias,
          createdAt: pagoMovil.getCreatedAt
        })

        savedBtnElement.setAttribute('disabled', '')
        savedBtnElement.classList.add('btn__dark--disabled')

        form.reset()
        this.showDataInTable(true)
      },

      /**
       * @param {boolean} [isFirstPagoMovil=false]
       * @return {void}
       */
      showDataInTable(isFirstPagoMovil = false) {
        if (!Store.is('pago_movil')) return

        /**
         * @type {Array.<{
         *   document:    string,
         *   numberPhone: string,
         *   bank:        string,
         *   alias:       string,
         *   createdAt:   string
         * }>}
         */
        const pagosMoviles = Store.getParsedJson(Store.get('pago_movil'))

        if (isFirstPagoMovil) {
          const section = document.body.querySelector('main>section')
          section.removeChild(section.lastElementChild)

          const divElement = document.createElement('div')
          divElement.setAttribute('class', 'table__container')

          divElement.innerHTML = /*html*/ `
            <table class="table">
              <thead>
                <tr>
                  <th>Teléfono</th>
                  <th>Banco</th>
                  <th>Alias</th>
                  <th>Documento</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          `

          section.appendChild(divElement)
        }

        const tbody = document.querySelector('tbody')
        let template = ''

        pagosMoviles.forEach(
          ({ document, numberPhone, bank, alias, createdAt }) => {
            template += /*html*/ `
              <tr>
                <td>${numberPhone.substring(0, 4)}***${numberPhone.substring(7, numberPhone.length)}</td>
                <td>${bank.split(' - ')[1]}</td>
                <td>${alias}</td>
                <td>${document[0]}${document.length === 8 ? document[1] : ''}***${document.substring(document.length === 8 ? 5 : 4, document.length)}</td>
                <td>${createdAt}</td>
                <td>
                  <div class="actions__buttons__container">
                    <span draggable="false"><svg height="28px" width="28px" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1d1e24"><path d="M216-216h51l375-375-51-51-375 375v51Zm-35.82 72q-15.18 0-25.68-10.3-10.5-10.29-10.5-25.52v-86.85q0-14.33 5-27.33 5-13 16-24l477-477q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L318-165q-11 11-23.95 16t-27.24 5h-86.63ZM744-693l-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg></span>
                    <span draggable="false"><svg width="28px" height="28px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#1d1e24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#1d1e24" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></g></svg></span>
                  </div>
                </td>
              </tr>
            `
          }
        )

        tbody.innerHTML = template
      }
    }
  }

  /**
   * @public
   * @return {void}
   */
  main() {
    const nav = new Nav('nav')

    const mainElement = HtmlElement.createBaseElement({
      type: 'main',
      attributes: [{ qualifiedName: 'class', value: 'main' }],
      isNav: true,
      navComponent: nav.getElement,
      view: this.getView
    })

    // Show Main Element
    HtmlElement.insertElementOn({
      newElement: mainElement,
      referenceNode: document.body.children[2]
    })

    // ------------------------------------------------------------------------
    const welcomeMessageElement = document.getElementById('welcome__message')

    const lastActionMessage = new Intl.RelativeTimeFormat('es-VE', {
      numeric: 'auto'
    })

    const ONE_SECOND = 1000

    let currentTime = +new Date().toLocaleTimeString().split(':')[1]
    let lastActivity = +Store.get('last_activity')

    welcomeMessageElement.innerHTML = /*html*/ `
      Bienvenido ${Store.get('name')} |
      ${
        !Store.is('last_activity') ?
          'No hay actividad reciente.'
        : /*html*/ `
          <span>
            Última actividad:
            ${lastActionMessage.format(
              -(currentTime - lastActivity),
              'minutes'
            )}.
          </span>
        `
      }
    `

    setInterval(() => {
      currentTime = +new Date().toLocaleTimeString().split(':')[1]
      lastActivity = +Store.get('last_activity')

      welcomeMessageElement.innerHTML = /*html*/ `
      Bienvenido ${Store.get('name')} |
      ${
        !Store.is('last_activity') ?
          'No hay actividad reciente.'
        : /*html*/ `
          <span>
            Última actividad:
            ${lastActionMessage.format(-(currentTime - lastActivity), 'minutes')}.
          </span>
        `
      }
    `
    }, ONE_SECOND)

    this.#actions.showDataInTable()

    /** @type {HTMLButtonElement} */
    const modalBtn = mainElement.querySelector('button#btn__modal')

    modalBtn.addEventListener(
      'click',
      () => this.#actions.clickBtnModalEvent(mainElement),
      false
    )
  }

  /**
   * @private
   * @return {void}
   */
  #showHtmlView() {
    this.setView(/*html*/ `
      <small class="welcome_message" id="welcome__message"></small>
      <h1 class="title">Pago Móvil <strong>|</strong> Beneficiarios</h1>

      <section class="container">
        <form class="header__form__container" autocomplete="off">
          <div class="search__input__container">
            <div class="search__icon__container">
              <svg
                height="22px"
                width="22px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    stroke="#1d1e24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>

            <input
              type="text"
              class="input search__input"
              name="search_p2p"
              placeholder="Buscar"
              maxlength="40"
            />
          </div>

          <button type="button" class="btn" id="btn__modal">
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#1d1e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></g></svg>
            Nuevo
          </button>
        </form>

        ${
          !Store.is('pago_movil') || Store.get('pago_movil') === null ?
            `<h2>No hay elementos para mostrar.</h2>`
          : `
            <div class="table__container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Teléfono</th>
                    <th>Banco</th>
                    <th>Alias</th>
                    <th>Documento</th>
                    <th>Fecha de registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          `
        }
      </section>
    `)
  }
}
