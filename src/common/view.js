'use strict'

/**
 * @class View
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class View {
  /** @public @string */
  view

  /** @constructor */
  constructor() {
    this.view = ''
  }

  /** @public @return {void} */
  main() {}

  /**
   * @public
   * @param {string} [template='']
   * @return {void}
   */
  setView(template = '') {
    this.view = template.trim()
  }

  /**
   * @public
   * @return {string}
   */
  get getView() {
    return this.view
  }
}
