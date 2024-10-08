'use strict'

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
