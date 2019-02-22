import { CreateInventoryForm } from '../CreateInventoryForm'
import React from 'react'
import { connect } from '@holochain/hc-web-client'

// --------------------------------------
// Application
// --------------------------------------

class ProductListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      holochainConnection: connect('ws://localhost:3400'),
      connected: false,
      user: {},
      inventory: {}
    }

    this.actions = {

      getAllInventory: () => {
        this.makeHolochainCall('events-goer-4000/event/get_all_inventory', {}, (result) => {
          const inventory = result.Ok.map(({ address, entry }) => ({
            id: address,
            product_address: entry.product_address,
            org_address: entry.org_address,
            stocked_units: entry.stocked_units
          }))
          this.setState({
            inventory
          })
        })
      },

      createInventory: options => {
        const { user } = this.state
        const item = {
          product_address: options.product_address,
          org_address: user.id,
          stocked_units: parseInt(options.stocked_units)
        }
        this.makeHolochainCall('events-goer-4000/event/create_inventory', item, (result) => {
          console.log('created inventory', result)
        })
      }

    }
  }

  componentDidMount () {
    this.state.holochainConnection.then(({ call }) => {
      call('events-goer-4000/event/get_my_member_profile')({}).then((result) => {
        const profile = JSON.parse(result).Ok
        if (profile) {
          this.setState({ user: { id: profile.address } })
        }
        this.setState({ connected: true })
      })
    })

    this.uiUpdate()
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  makeHolochainCall (callString, params, callback) {
    this.state.holochainConnection.then(({ call }) => {
      call(callString)(params).then((result) => callback(JSON.parse(result)))
    })
  }

  uiUpdate () {
    const { getAllInventory } = this.actions

    getAllInventory()

    this.timeout = setTimeout(() => this.uiUpdate(), 1000) // hack for now
  }

  uiInventoryList () {
    const { inventory } = this.state
    if (inventory.length > 0) {
      return (
        <table className='collapse ba br2 b--black-10 pv2 ph3'>
          <tbody>
            <tr class='striped--light-gray '>
              <th class='pv2 ph3 tl f6 fw6 ttu'>Product</th>
              <th class='tr f6 ttu fw6 pv2 ph3'>Stocked units</th>
            </tr>
            {
              inventory.map((item) => {
                return (
                  <tr className='striped--light-gray' key={item.id}>

                    <td className='pv2 ph3'><a href={`/product?address=${item.product_address}`}>{item.product_address.substring(0, 30)}…</a></td>

                    <td className='pv2 ph3 tc'>{item.stocked_units}</td>

                  </tr>

                )
              })
            }
          </tbody>
        </table>
      )
    } else {
      return <div>So much empty here..</div>
    }
  }

  render () {
    const { createInventory } = this.actions
    return (
      <main>
        <section>
          <h1 className='f1 lh-copy'>Inventory</h1>

          {this.uiInventoryList()}

          <h1 className='f3 lh-copy'>Add product to inventory</h1>

          <CreateInventoryForm submit={createInventory} />
        </section>
      </main>
    )
  }
}

export default ProductListScreen
