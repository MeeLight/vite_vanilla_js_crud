'use strict'

/**
 * @class Html Element
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class HtmlElement {
  /** @constructor */
  constructor() {}

  /**
   * @public
   * @static
   * @param {{
   *   type?:        keyof HTMLElementTagNameMap,
   *   isNav?:       boolean,
   *   attributes?:  {qualifiedName: string, value: string}[],
   *   navComponent: HTMLElement,
   *   view:         string
   * }}
   * @return {HTMLElement|null}
   */
  static createBaseElement({
    type = 'div',
    view,
    attributes = [],
    navComponent,
    isNav = false
  }) {
    if (!view || view === '') throw new Error('Oops! The View is not valid.')

    try {
      const element = document.createElement(type)
      element.innerHTML = view

      if (attributes.length === 1) {
        element.setAttribute(attributes[0].qualifiedName, attributes[0].value)
      } else if (attributes.length > 1) {
        attributes.forEach(({ qualifiedName, value }) => {
          element.setAttribute(qualifiedName, value)
        })
      }

      if (isNav) {
        document.body.insertBefore(navComponent, document.body.children[1])
        document.body.insertBefore(element, document.body.children[2])
        return element
      }

      document.body.insertBefore(element, document.body.children[1])
      return element
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @public
   * @static
   * @param {{
   *   newElement:     HTMLElement,
   *   referenceNode:  HTMLElement,
   *   parentElement?: Document|HTMLElement
   * }}
   * @return {void}
   */
  static insertElementOn({
    newElement,
    referenceNode = null,
    parentElement = document.body
  }) {
    parentElement.insertBefore(newElement, referenceNode)
  }
}
