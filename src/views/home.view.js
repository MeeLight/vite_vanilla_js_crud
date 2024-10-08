'use strict'

// Common
import View from './../common/view.js'
import HtmlElement from './../common/htmlElement.js'

// Components
import Modal from './../components/modal.js'
import Nav from './../components/nav.js'
// import Loader from '../components/loader.js'

// Store
import Store from './../store/index.js'

// Validations
import PagoMovilValidation from './../validations/pagoMovil/index.js'

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
   *   handleBank: (
   *     event: Event &
   *       {currentTarget: EventTarget & HTMLInputElement} &
   *       {target: HTMLInputElement} & InputEvent,
   *     inputElement: HTMLInputElement
   *   )
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
        const modal = new Modal()

        await this.#components.showModalComponent(modal)
        mainElement.appendChild(modal.getElement)

        modal.show(true)
        modal.deleteOfDOM(mainElement, 'form[method="dialog"]')

        // ---------------------------------------------------------------------

        /** @type {HTMLButtonElement} */
        const saveBtn = document.querySelector(
          '.dialog__buttons__container>button'
        )

        /** @type {HTMLInputElement} */
        const inputElement = document.getElementById('bank')

        inputElement.addEventListener(
          'keyup',
          (event) => this.#actions.handleBank(event, inputElement),
          false
        )

        saveBtn.addEventListener('click', () => this.#actions.onSubmit(), false)
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
        let value = event.currentTarget.value

        /** @type {HTMLSpanElement} */
        const errorMessageElement = document.getElementById(
          'error__message__of__bank'
        )

        const themeColor = document.head.querySelector(
          'meta[name="theme-color"]'
        )

        /** @type {HTMLButtonElement} */
        const savedBtnElement = document.getElementById(
          'form__submit__btn__modal'
        )

        if (value === '') {
          errorMessageElement.textContent = 'El banco es requerido.'
          inputElement.classList.add('input--error')
          savedBtnElement.setAttribute('disabled', '')
          savedBtnElement.classList.add('btn__dark--disabled')
          themeColor.setAttribute('content', '#c53030')
        } else {
          savedBtnElement.removeAttribute('disabled')
          savedBtnElement.classList.remove('btn__dark--disabled')
          errorMessageElement.textContent = ''
          inputElement.classList.remove('input--error')
          themeColor.setAttribute('content', '#101015')

          // For each validation of "bank"
          new PagoMovilValidation(value).getValidations.bank.forEach(
            ({ pattern, errorMessage }) => {
              if (pattern) {
                errorMessageElement.textContent = errorMessage
                inputElement.classList.add('input--error')
                savedBtnElement.setAttribute('disabled', '')
                savedBtnElement.classList.add('btn__dark--disabled')
                themeColor.setAttribute('content', '#c53030')
              }
            }
          )

          if (
            !banksData.some(bank => value.toUpperCase() === bank.toUpperCase())
          ) {
            errorMessageElement.textContent = 'El Banco no es correcto.'
            inputElement.classList.add('input--error')
            savedBtnElement.setAttribute('disabled', '')
            savedBtnElement.classList.add('btn__dark--disabled')
            themeColor.setAttribute('content', '#c53030')
          }
        }
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
        let data = Object.fromEntries(new FormData(form).entries())

        data = {
          document: data.document.trim(),
          alias: data.alias.trim(),
          numberPhone: data.numberPhone.trim(),
          bank: data.bank.toUpperCase()
        }

        savedBtnElement.setAttribute('disabled', '')
        savedBtnElement.classList.add('btn__dark--disabled')

        form.reset()
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

    welcomeMessageElement.innerHTML = /*html*/ `
      Bienvenido ${Store.get('name')} |
      ${
        !Store.is('last_activity') ?
          'No hay actividad reciente.'
        : /*html*/ `
          <span>
            Última actividad:
            ${lastActionMessage.format(Store.get('last_activity'), 'minutes')}.
          </span>
        `
      }
    `

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
    const currentDate = new Intl.DateTimeFormat('es-VE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date())

    this.setView(/*html*/ `
      <small class="welcome_message" id="welcome__message"></small>
      <h1 class="title">P2P <strong>|</strong> Pago Móvil</h1>

      <!-- <small class="small">
        Gestionar los pagos móviles nunca había sido tan sencillo.
        <strong>$ Pay2m</strong> es la mejor opción. 😎🤑
      </small> -->

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
          !Store.is('pago_movil') || Store.get('pago_movil') === '[]' ?
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
                <tbody>
                  <tr>
                    <td>0412***4567</td>
                    <td>BANCO DE VENEZUELA</td>
                    <td>John Doe</td>
                    <td>12***678</td>
                    <td>${currentDate}</td>
                    <td>
                      <div class="actions__buttons__container">
                        <span draggable="false"><svg height="28px" width="28px" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1d1e24"><path d="M216-216h51l375-375-51-51-375 375v51Zm-35.82 72q-15.18 0-25.68-10.3-10.5-10.29-10.5-25.52v-86.85q0-14.33 5-27.33 5-13 16-24l477-477q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L318-165q-11 11-23.95 16t-27.24 5h-86.63ZM744-693l-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg></span>
                        <span draggable="false"><svg width="28px" height="28px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#1d1e24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#1d1e24" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></g></svg></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        }
      </section>
    `)
  }
}
