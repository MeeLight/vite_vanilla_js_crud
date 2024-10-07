'use strict'

import Component from './../common/component.js'

/**
 * @class Loader (span)
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Loader extends Component {
  /**
   * @constructor
   * @param {{
   *   loaderType: 'default'|'ellipsis',
   *   height?:    string,
   *   width?:     string,
   *   bgColor?:   string
   * }} (Optional)
   */
  constructor({ loaderType = 'default', height, width, bgColor } = {}) {
    const loaderTypes = {
      default: 'span,loader',
      ellipsis: 'div,loader__ellipsis__container'
    }

    /** @type {'span'|'div'} */
    const htmlElementType = loaderTypes[loaderType].split(',')[0]
    const className = loaderTypes[loaderType].split(',')[1]

    super(htmlElementType, null)
    this.node.setAttribute('class', className)
    this.node.setAttribute('draggable', 'false')

    if (loaderType === 'default') {
      if (height) this.node.style.height = height
      if (width) this.node.style.width = width
      if (bgColor) this.node.style.borderTop = `2px solid ${bgColor}`
    } else {
      this.node.innerHTML = /*html*/ `
        <div class="loader__ellipsis__child-1"></div>
        <div class="loader__ellipsis__child-2"></div>
        <div class="loader__ellipsis__child-3"></div>
        <div class="loader__ellipsis__child-4"></div>
      `
    }
  }
}
