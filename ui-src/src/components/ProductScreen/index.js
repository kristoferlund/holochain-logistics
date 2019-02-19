import React from 'react'
import { connect } from '@holochain/hc-web-client'

// --------------------------------------
// Application
// --------------------------------------

class ProductScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      holochainConnection: connect('ws://localhost:3400'),
      products: {}
    }

    this.actions = {

      getAllProducts: () => {
        this.makeHolochainCall('events-goer-4000/event/get_all_products', {}, (result) => {
          console.log('retrieved all products', result)
          const products = result.Ok.map(({ address, entry }) => {
            return {
              id: address,
              private: !entry.public,
              name: entry.name,
              description: entry.description,
              users: []
            }
          })
          this.setState({
            products
          })
        })
      }

    }
  }

  componentDidMount () {
    const { getAllProducts } = this.actions

    getAllProducts()
  }

  makeHolochainCall (callString, params, callback) {
    this.state.holochainConnection.then(({ call }) => {
      call(callString)(params).then((result) => callback(JSON.parse(result)))
    })
  }

  uiProductList () {
    const { products } = this.state
    if (products.length > 0) {
      return <div>Here are products.</div>
    } else {
      return <div>No products yet.</div>
    }
  }

  render () {
    return (
      <main>
        <section>
          <h1>Products</h1>
          {this.uiProductList()}
        </section>
      </main>
    )
  }
}

export default ProductScreen
