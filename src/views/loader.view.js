'use strict'

// Common
import View from '../common/view.js'

// Components
import Loader from './../components/loader.js'

/**
 * @class Loader View
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
  }

  /** @public @return {void} */
  main() {
    const loader = new Loader({
      loaderType: this.#loaderType,
      height: this.#height,
      width: this.#width
    })

    // Push View
    const mainElement = document.createElement('main')
    mainElement.innerHTML = this.getView
    document.body.insertBefore(mainElement, document.body.children[1])

    const loaderContainer = mainElement.querySelector('div')
    loaderContainer.appendChild(loader.getElement)
  }
}
