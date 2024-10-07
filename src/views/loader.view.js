'use strict'

// Common
import View from './../common/view.js'
import HtmlElement from './../common/htmlElement.js'

// Components
import Loader from './../components/loader.js'

/**
 * ## Loader View
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class LoaderView extends View {
  /** @private @type {'default'|'ellipsis'} */
  #loaderType

  /** @private @type {string} */
  #height

  /** @private @type {string} */
  #width

  /**
   * @constructor
   * @param {{
   *   loaderType: 'default'|'ellipsis',
   *   height:     string,
   *   width:      string
   * }}
   */
  constructor({ loaderType, height, width } = {}) {
    super()
    this.#loaderType = loaderType ? loaderType : 'default'
    this.#height = height ? height : '1rem'
    this.#width = width ? width : '1rem'
    this.#showHtmlView()
  }

  /** @public @return {void} */
  main() {
    const loader = new Loader({
      loaderType: this.#loaderType,
      height: this.#height,
      width: this.#width
    })

    // Show Main Element
    const mainElement = HtmlElement.createBaseElement({
      type: 'main',
      view: this.getView
    })

    const loaderContainer = mainElement.querySelector('div')
    loaderContainer.appendChild(loader.getElement)
  }

  /**
   * @private
   * @return {void}
   */
  #showHtmlView() {
    this.setView(/*html*/ `<div class="loader__container"></div>`)
  }
}
