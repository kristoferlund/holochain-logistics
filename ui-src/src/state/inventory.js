import { getGlobal, setGlobal } from 'reactn'

import _ from 'lodash'
import { hcInventoryGetAll } from '../holochain/inventory'

export async function loadInventory(loadFromApi) {
  let { inventory } = getGlobal()
  if (_.isEmpty(inventory) || loadFromApi) {
    inventory = await hcInventoryGetAll()
    setGlobal({ inventory })
  }
  return inventory
}
