import { getEntry, getEntryHistory } from '../holochain/index'
import { getGlobal, setGlobal } from 'reactn'

import _ from 'lodash'
import { hcProductGetAll } from '../holochain/product'

export async function loadProduct(address) {
  let result = await getEntry(address)
  let json = JSON.parse(result)
  const product = JSON.parse(json.Ok.App[1])

  result = await getEntryHistory(address)
  json = JSON.parse(result)
  const productHistory = json.Ok

  setGlobal({
    product: {
      address,
      ...product,
      history: productHistory
    }
  })
  return product
}

export async function loadProducts(loadFromApi) {
  let { products } = getGlobal()
  if (_.isEmpty(products) || loadFromApi) {
    products = await hcProductGetAll()
    setGlobal({ products })
  }
  return products
}

export function getProductName(id) {
  const { products } = getGlobal()
  const index = _.findIndex(products, { id })
  if (index >= 0) {
    return products[index].name
  }
  return null
}

export function getProductImageUrl(id) {
  const { products } = getGlobal()
  const index = _.findIndex(products, { id })
  if (index >= 0) {
    return products[index].image_url
  }
  return null
}
