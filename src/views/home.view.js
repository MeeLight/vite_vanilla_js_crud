'use strict'

// Common
import View from './../common/view.js'
import HtmlElement from './../common/htmlElement.js'

// Components
import Modal from './../components/modal.js'
import Nav from './../components/nav.js'
// import Loader from '../components/loader.js'

/**
 * @class Home View
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class HomeView extends View {
  /** @constructor */
  constructor() {
    super()
    this.#showHtmlView()
  }

  /**
   * @private
   * @return {{
   *   navComponent:       () => HTMLElement
   *   infoModalComponent: (modal: Modal) => void
   *   formModalComponent: (modal: Modal) => void
   * }}
   */
  get #components() {
    /**
     * @param {Modal} modal
     * @return {void}
     */
    const infoModalComponent = modal => {
      modal.setHtml(
        /*html*/ `
        <h1>Title</h1>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem incidunt corporis quos laborum perferendis velit quae,
          tempore ratione debitis dolorem cumque beatae mollitia minus facilis
          corrupti! Tempore vero ex repellat.
        </p>

        <form class="form form__dialog__buttons" method="dialog">
          <button type="submit" class="btn btn__modal btn__gray--outline">Cancel</button>
          <button type="submit" class="btn btn__modal btn__dark">Ok</button>
        </form>
        `.trim()
      )
    }

    /**
     * @param {Modal} modal
     * @return {void}
     */
    const formModalComponent = modal => {
      modal.setHtml(
        /*html*/ `
        <h1>Afiliar un Pago Móvil</h1>

        <form class="form form__dialog__buttons" method="dialog">
          <button type="submit" class="btn btn__modal btn__gray--outline">Cancel</button>
          <button type="submit" class="btn btn__modal btn__dark">Ok</button>
        </form>
        `.trim()
      )
    }

    return { navComponent, infoModalComponent, formModalComponent }
  }

  /**
   * @private
   * @return {{
   *   clickBtnModalEvent: (mainElement: HTMLElement) => void
   * }}
   */
  get #actions() {
    /** @param {HTMLElement} mainElement */
    const clickBtnModalEvent = mainElement => {
      const modal = new Modal()

      this.#components.formModalComponent(modal)
      mainElement.appendChild(modal.getElement)

      modal.show(true)
      modal.deleteOfDOM(mainElement, '.form__dialog__buttons')
    }

    return {
      clickBtnModalEvent
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

    /** @type {HTMLButtonElement} */
    const btn = mainElement.querySelector('button#btn__modal')

    btn.addEventListener(
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
      <h1 class="title">Pago Móvil</h1>

      <small class="small">
        Gestionar los pagos móviles nunca había sido tan sencillo.
        <strong>$ Pay2m</strong> es la mejor opción. 😎🤑
      </small>

      <button type="button" class="btn" id="btn__modal">
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#1d1e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></g></svg>
        Afiliar
      </button>
    `)
  }
}
