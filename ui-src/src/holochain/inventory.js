import { ZOME_NAME, hcInstanceCall } from '.'

export async function hcInventoryGetAll() {
  try {
    const result = await hcInstanceCall(`${ZOME_NAME}/get_all_inventory`, {})

    if (result) {
      const json = JSON.parse(result)

      const inventory = json.Ok.map(({ address, entry }) => ({
        id: address,
        product_address: entry.product_address,
        org_address: entry.org_address,
        stocked_units: entry.stocked_units
      }))
      return inventory
    }
  } catch (err) {
    console.log(err)
  }
  return {}
}

export async function hcInventoryCreate(item) {
  return hcInstanceCall(`${ZOME_NAME}/create_inventory`, item)
}
