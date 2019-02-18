const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "../../dna/logistics.hcpkg"
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
  const register_result = await alice.callSync('event', 'register', {name: 'alice', avatar_url: ''})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const get_profile_result = await alice.callSync('event', 'get_member_profile', {agent_address: register_result.Ok})
  console.log(get_profile_result)
})

scenario.runTape('Can create some products and retrieve them', async (t, {alice}) => {
  const register_result = await alice.callSync('event', 'register', {name: 'alice', avatar_url: ''})
  console.log(register_result)
  t.true(register_result.Ok.includes('alice'))

  const create_product = await alice.callSync('event', 'create_product', testProduct)
  console.log(create_product)
  t.deepEqual(create_product.Ok.length, 46)

  const create_product2 = await alice.callSync('event', 'create_product', testProduct2)
  console.log(create_product2)
  t.deepEqual(create_product2.Ok.length, 46)

  // const get_result = await alice.callSync('event', 'get_all_products', {})
  // console.log('all products: ', get_result)
  // t.deepEqual(get_result.Ok.length, 2)

})

scenario.runTape('Can create a public event with no other members and retrieve it', async (t, {alice}) => {
 
  const register_result = await alice.callSync('event', 'register', {name: 'alice', avatar_url: ''})
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

scenario.runTape('Can post a message to the event and retrieve', async (t, {alice}) => {

  const register_result = await alice.callSync('event', 'register', {name: 'alice', avatar_url: ''})
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

  const register_result = await alice.callSync('event', 'register', {name: 'alice', avatar_url: ''})
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


