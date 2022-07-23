/**
 * Returns formated product price.
 *
 * @param {string} currency_id Currency code. Format:AAA.
 * @param {number} price Product price. Format: 99999.99
 * @return {string} Formated product price. Format: AAA 99.999,99 - Eg: ARS 10.566,50
 *                                                  AAA 99.999    - Eg: ARS 10.566
 */
export function priceFormat (currency_id, price) {
  if (price.toString().indexOf('.') !== -1) {

    price = Number(price).toFixed(2)
    price = price.toString().replaceAll('.', ',')
  }
  return currency_id + " " + price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
}