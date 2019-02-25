import { ZOME_NAME, hcInstanceCall } from '.'

export async function hcProductCreate (product) {
  return hcInstanceCall(`${ZOME_NAME}/create_product`, product)
}

export async function hcProductUpdate (product) {
  return hcInstanceCall(`${ZOME_NAME}/update_product`, product)
}

export async function hcProductGetAll () {
  try {
    const result = await hcInstanceCall(`${ZOME_NAME}/get_all_products`, {})

    if (result) {
      const json = JSON.parse(result)

      const products = json.Ok.map(({ address, entry }) => {
        return {
          id: address,
          name: entry.name,
          description: entry.description,
          image_url: entry.image_url,
          price: entry.price
        }
      })
      return products
    }
  } catch (err) {
    console.log(err)
  }  
  return {}
}


