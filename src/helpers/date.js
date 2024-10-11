/**
 * @param {Date|number} lastDate
 * @return {string}
 */
export const getElapsedTime = lastDate => {
  const currentDate = new Date()
  const differenceInMilliseconds = currentDate - lastDate

  const seconds = Math.floor(differenceInMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(months / 12)

  if (minutes < 1) return 'un momento'
  else if (hours < 1) return `${minutes} minuto${getInPlural(minutes)}`
  else if (days < 1) return `${hours} hora${getInPlural(hours)}`
  else if (weeks < 1) return `${days} día${getInPlural(days)}`
  else if (months < 1) return `${weeks} semana${getInPlural(weeks)}`
  else if (years < 1) return `${months} mes${getInPlural(months, true)}`
  return `${years} año${getInPlural(years)}`
}

/**
 * @param {string} value
 * @param {boolean} [isMonth = false]
 * @return {'es'|''|'s'}
 */
const getInPlural = (value, isMonth = false) => {
  if (isMonth) return value > 1 ? 'es' : ''
  return value > 1 ? 's' : ''
}
