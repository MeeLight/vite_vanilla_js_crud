'use strict'

// Common
import View from './../common/view.js'
import HtmlElement from './../common/htmlElement.js'

// Router
import Router from './../router/index.js'

// Components
import Modal from './../components/modal.js'

// Validations
import UserValidation from './../validations/user/index.js'

// Helpers
import { getRandomNumber, handleInput } from './../helpers/index.js'

// Store
import Store from './../store/index.js'

/**
 * ## Index View
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class IndexView extends View {
  /** @type {Router} */
  #router

  /** @constructor */
  constructor() {
    super()
    this.#router = new Router()
    this.#showHtmlView()
    document.title = '$ Pay2m | ¡Bienvenido(a)!'
  }

  /**
   * @private
   * @return {{
   *   showModalComponent: (modalElement: Modal) => void
   * }}
   */
  get #components() {
    return {
      /**
       * @param {Modal} modalElement
       * @return {void}
       */
      showModalComponent: modalElement => {
        modalElement.setHtml(/*html*/ `
          <h1>$ Pay2m</h1>
          <h2>¡Bienvenido(a)!</h2>

          <hr class="line" />

          <p>
            Para comenzar a gestionar los pagos móviles en
            <span>$ Pay2m</span>, necesitamos saber cual es
            su nombre.
          </p>

          <form
            class="form new__person__form"
            id="new__person__form"
            autocomplete="off"
          >
            <input
              type="text"
              class="input"
              name="name"
              placeholder="Nombre"
              maxlength="35"
              required
            />

            <span class="error__message" id="error__message__of__name"></span>

            <button
              type="submit"
              id="submit__btn"
              class="btn btn__modal btn__dark btn__dark--disabled"
              disabled
            >
              <span class=""></span>
              <span>Continuar</span>
            </button>
          </form>
        `)
      }
    }
  }

  /**
   * @private
   * @return {{
   *   saveName: (event: SubmitEvent, formElement: HTMLFormElement) => void,
   *   handleName: (
   *     event: Event &
   *     {currentTarget: EventTarget & HTMLInputElement} &
   *     {target: HTMLInputElement} &
   *     InputEvent,
   *     inputElement: HTMLInputElement
   *   )
   * }}
   */
  get #actions() {
    return {
      /**
       * @param {
       *   Event &
       *   {currentTarget: EventTarget & HTMLInputElement} &
       *   {target: HTMLInputElement} &
       *   InputEvent
       * } event
       * @param {HTMLInputElement} inputElement
       * @return {void}
       */
      handleName: (event, inputElement) => {
        event.preventDefault()

        /** @type {string} */
        let value = event.currentTarget.value

        handleInput(value, inputElement, {
          entityName: 'nombre',
          errorMessageId: 'error__message__of__name',
          submitBtnId: 'submit__btn',
          validations: new UserValidation(value).getValidations.name
        })
      },

      /**
       * @param {SubmitEvent} event
       * @param {HTMLFormElement} formElement
       * @return {void}
       */
      saveName: (event, formElement) => {
        event.preventDefault()

        /** @type {HTMLButtonElement} */
        const submitBtnElement = document.querySelector('button[type="submit"]')
        submitBtnElement.setAttribute('disabled', '')
        submitBtnElement.classList.add('btn__dark--disabled')

        /** @type {HTMLSpanElement} */
        const loaderElement = submitBtnElement.querySelectorAll('span')[0]
        loaderElement.classList.add('loader')
        loaderElement.classList.add('loader__submit__btn')

        /** @type {HTMLSpanElement} */
        const lastSpanElement = submitBtnElement.querySelectorAll('span')[1]
        lastSpanElement.style.textTransform = 'none'
        lastSpanElement.textContent = 'Cargando...'

        /** @type {{ name: string }} */
        const { name } = Object.fromEntries(new FormData(event.currentTarget))

        Store.set('name', name.trim())
        formElement.reset()

        /**
         * ### Possible values: 2000 - 3000 - 4000
         * @type {number}
         */
        const RANDOM_MILLISECONDS = getRandomNumber(2, 4) * 1000

        setTimeout(() => {
          this.#router.removeView(1)
          this.#router.showHomeView()
        }, RANDOM_MILLISECONDS)
      }
    }
  }

  /**
   * @public
   * @return {void}
   */
  main() {
    const mainElement = HtmlElement.createBaseElement({
      type: 'main',
      isNav: false,
      view: this.getView
    })

    // Show Main Element
    HtmlElement.insertElementOn({
      newElement: mainElement,
      referenceNode: document.body.children[1]
    })

    // ------------------------------------------------------------------------
    const modal = new Modal()

    modal.setAttribute('class', 'modal welcome__modal')
    mainElement.appendChild(modal.getElement)
    this.#components.showModalComponent(modal)
    modal.show(true)

    // ------------------------------------------------------------------------
    /** @type {HTMLFormElement} */
    const formElement = document.querySelector('form#new__person__form')

    /** @type {HTMLFormElement} */
    const inputElement = document.querySelector('form#new__person__form>input')

    // Events
    inputElement.addEventListener(
      'keyup',
      event => this.#actions.handleName(event, inputElement),
      false
    )

    formElement.addEventListener(
      'submit',
      event => this.#actions.saveName(event, formElement),
      false
    )
  }

  /**
   * @private
   * @return {void}
   */
  #showHtmlView() {
    this.setView(/*html*/ `&nbsp;`)
  }
}
