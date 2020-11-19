export function useCurrency () {
  const currencyFilter = (value, sub = '₽', separator = ' ') => {
    if (!value) return ''
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator) + separator + sub
  }

  return { currencyFilter }
}
