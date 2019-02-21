const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/bundle.json"
const dna = Config.dna(dnaPath, 'happs')
const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

/*----------  Events  ----------*/

const testNewChannelParams = {
  name: "test new event",
  description: "for testing...",
  initial_members: [],
  public: true
}

const testMessage = {
  timestamp: 0,
  message_type: "text",
  payload: "I am the message payload",
  meta: "{}",
}

const testProduct = {
  name: "Prodname", 
  description: "Description", 
  image_url: "url", 
  price: 1000			    
}

const testProduct2 = {
  name: "Prodname 2", 
  description: "Description", 
  image_url: "url", 
  price: 1000			    
}


scenario.runTape('Can register a profile and retrieve', async (t, {alice}) => {
  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const get_profile_result = await alice.callSync('event', 'get_member_profile', {agent_address: register_result.Ok})
  console.log(get_profile_result)
})

scenario.runTape('Can create some products and retrieve them', async (t, {alice}) => {
  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const create_product = await alice.callSync('event', 'create_product', testProduct)
  console.log(create_product)
  t.deepEqual(create_product.Ok.length, 46)

  const create_product2 = await alice.callSync('event', 'create_product', testProduct2)
  console.log(create_product2)
  t.deepEqual(create_product2.Ok.length, 46)

  const get_result = await alice.callSync('event', 'get_all_products', {})
  console.log('all products: ', get_result)
  t.deepEqual(get_result.Ok.length, 2)

})

scenario.runTape('Can create product, update it and retreive history', async (t, {alice}) => {
  
  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const create_product = await alice.callSync('event', 'create_product', testProduct)
  console.log(create_product)
  t.deepEqual(create_product.Ok.length, 46)

  const testProductUpdate = Object.assign(testProduct, {name: 'Updated product', product_address: create_product.Ok})

  console.log(JSON.stringify(testProductUpdate, null, 2))

  const updated_product = await alice.call('event', 'update_product', testProductUpdate)
  console.log(updated_product)
  t.deepEqual(updated_product.Ok.length, 46)

  const get_entry_history = await alice.callSync('event', 'get_entry_history', {entry_address: create_product.Ok})
  console.log(JSON.stringify(get_entry_history, null, 2))

})

scenario.runTape('Can create inventory items and retrieve them', async (t, {alice}) => {
  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result.Ok)
  t.true(register_result.Ok.includes('alice'))

  const create_product = await alice.callSync('event', 'create_product', testProduct)
  console.log(create_product)
  t.deepEqual(create_product.Ok.length, 46)

  const create_product2 = await alice.callSync('event', 'create_product', testProduct2)
  console.log(create_product2)
  t.deepEqual(create_product2.Ok.length, 46)

  const create_inventory = await alice.callSync('event', 'create_inventory', {product_address: create_product.Ok, org_address: register_result.Ok, stocked_units: 100})
  console.log(create_inventory)
  t.deepEqual(create_inventory.Ok.length, 46)

  const create_inventory2 = await alice.callSync('event', 'create_inventory', {product_address: create_product2.Ok, org_address: register_result.Ok, stocked_units: 30})
  console.log(create_inventory2)
  t.deepEqual(create_inventory2.Ok.length, 46)

  const get_result = await alice.callSync('event', 'get_all_inventory', {})
  console.log('all inventory: ', get_result)
  t.deepEqual(get_result.Ok.length, 2)
})
/*
scenario.runTape('Can update inventory item', async (t, {alice}) => {
  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result.Ok)
  t.true(register_result.Ok.includes('alice'))

  const create_product = await alice.callSync('event', 'create_product', testProduct)
  console.log(create_product)
  t.deepEqual(create_product.Ok.length, 46)

  const create_inventory = await alice.callSync('event', 'create_inventory', {product_address: create_product.Ok, org_address: register_result.Ok, stocked_units: 100})
  console.log(create_inventory)
  t.deepEqual(create_inventory.Ok.length, 46)

  const update_inventory = await alice.callSync('event', 'update_inventory_qty', {inventory_address: create_inventory.Ok, new_stock_qty: 10000})
  console.log(update_inventory)
  t.deepEqual(update_inventory.Ok.length, 46)

  const get_result = await alice.callSync('event', 'get_all_inventory', {})
  console.log('all inventory: ', get_result)
  t.deepEqual(get_result.Ok.length, 1)
})

*/




// Further dev.
// need to create two different orgs, how? not using Agent_address?
// need to start updating inventory quantity of same product + supply_org combination
//
scenario.runTape('Can create create an order and update invetory of ordered product', async (t, {alice}) => {
  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result.Ok)
  t.true(register_result.Ok.includes('alice'))

  const register_result2 = await alice.callSync('event', 'register', {name: 'Food hub 2', avatar_url: '', description: "we are a little further away"})
  console.log(register_result2.Ok)
  t.true(register_result2.Ok.includes('alice'))

  const create_product = await alice.callSync('event', 'create_product', testProduct)
  console.log(create_product)
  t.deepEqual(create_product.Ok.length, 46)

  const create_product2 = await alice.callSync('event', 'create_product', testProduct2)
  console.log(create_product2)
  t.deepEqual(create_product2.Ok.length, 46)

  const create_inventory = await alice.callSync('event', 'create_inventory', {product_address: create_product.Ok, org_address: register_result.Ok, stocked_units: 100})
  console.log(create_inventory)
  t.deepEqual(create_inventory.Ok.length, 46)

  const create_inventory2 = await alice.callSync('event', 'create_inventory', {product_address: create_product2.Ok, org_address: register_result.Ok, stocked_units: 30})
  console.log(create_inventory2)
  t.deepEqual(create_inventory2.Ok.length, 46)

  const created_inventory = await alice.callSync('event', 'get_all_inventory', {})
  console.log('pre-order inventory: ', created_inventory)
  t.deepEqual(created_inventory.Ok.length, 2)

  const create_order = await alice.callSync('event', 'create_order', {
    inventory_address: create_inventory.Ok,
    supply_organisation: register_result.Ok,
    recieving_organisation: register_result2.Ok,
    product_address: create_product.Ok,
    order_quantity: 23,
    transport: "Weekly truck",
    comment: "looks like good beans!",
    is_sent: false,
    is_recieved: false})
  console.log(create_order)
  t.deepEqual(create_order.Ok.length, 46)

  const create_order2 = await alice.callSync('event', 'create_order', {
    inventory_address: create_inventory2.Ok,
    supply_organisation: register_result.Ok,
    recieving_organisation: register_result2.Ok,
    product_address: create_product2.Ok,
    order_quantity: 5,
    transport: "Special delivery",
    comment: "package carefully!",
    is_sent: false,
    is_recieved: false})
  console.log(create_order2)
  t.deepEqual(create_order2.Ok.length, 46)

  const get_result = await alice.callSync('event', 'get_all_orders', {})
  console.log('all orders: ', get_result)
  t.deepEqual(get_result.Ok.length, 2)

  //should instead check stocked_quantity_after = stock_quantity_before - order_quantity
  //test now relies on comparing "pre- and post-order inventory" printout in logs.
  const updated_inventory = await alice.callSync('event', 'get_all_inventory', {})
  console.log('post-order inventory: ', updated_inventory)
  t.deepEqual(updated_inventory.Ok.length, 2)
})


/*
scenario.runTape('Can create a public event with no other members and retrieve it', async (t, {alice}) => {
 
  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const create_result = await alice.callSync('event', 'create_event', testNewChannelParams)
  console.log(create_result)
  t.deepEqual(create_result.Ok.length, 46)

  const get_all_members_result = await alice.callSync('event', 'get_members', {event_address: create_result.Ok})
  console.log('all members:', get_all_members_result)
  let allMembers = get_all_members_result.Ok
  t.true(allMembers.length > 0, 'gets at least one member')
  
  const get_result = await alice.callSync('event', 'get_all_public_events', {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.length, 1)

})
*/
scenario.runTape('Can post a message to the event and retrieve', async (t, {alice}) => {

  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const create_result = await alice.callSync('event', 'create_event', testNewChannelParams)
  console.log(create_result)
  const event_addr = create_result.Ok
  t.deepEqual(event_addr.length, 46)

  const get_result = await alice.callSync('event', 'get_all_public_events', {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.length, 1)

  const post_result = await alice.callSync('event', 'post_message', {event_address: event_addr, message: testMessage})
  console.log(post_result)
  t.notEqual(post_result.Ok, undefined, 'post should return Ok')

  const get_message_result = await alice.callSync('event', 'get_messages', {address: event_addr})
  console.log(get_message_result)
  t.deepEqual(get_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')
})

scenario.runTape('Can create a public event with some members', async (t, {alice}) => {

  const register_result = await alice.callSync('event', 'register', {name: 'Food hub', avatar_url: '', description: "we are just around the corner"})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const create_result = await alice.callSync('event', 'create_event', {...testNewChannelParams, public: false, initial_members: [register_result.Ok]})
  console.log(create_result)
  t.deepEqual(create_result.Ok.length, 46)

  const get_all_members_result = await alice.callSync('event', 'get_members', {event_address: create_result.Ok})
  console.log('all members:', get_all_members_result)
  let allMemberAddrs = get_all_members_result.Ok
  t.true(allMemberAddrs.length > 0, 'gets at least one member')
})


