import { CreateProductForm } from '../CreateProductForm'
import React from 'react'

import { connect } from '@holochain/hc-web-client'
import queryString from 'query-string'

// --------------------------------------
// Application
// --------------------------------------

class ProductListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      holochainConnection: connect('ws://localhost:3400'),
      product: undefined,
      productHistory: undefined,
      address: undefined
    }

    this.actions = {
      getProduct: (address) => {
        this.makeHolochainCall('events-goer-4000/event/get_entry', { entry_address: address }, (result) => {
          this.setState({ product: JSON.parse(result.Ok.App[1]) })
        })
      },
      getProductHistory: (address) => {
        this.makeHolochainCall('events-goer-4000/event/get_entry_history', { entry_address: address }, (result) => {
          this.setState({ productHistory: result })
        })
      },
      updateProduct: options => {
        const product = {
          product_address: this.state.address,
          name: options.name,
          description: options.description,
          image_url: options.image_url,
          price: parseInt(options.price)
        }
        this.makeHolochainCall('events-goer-4000/event/update_product', product, (result) => {
          console.log('product updated', result)
        })
      }

    }
  }

  componentDidMount () {
    const values = queryString.parse(this.props.location.search)
    this.setState({ address: values.address })

    this.uiUpdate()
  }

  makeHolochainCall (callString, params, callback) {
    this.state.holochainConnection.then(({ call }) => {
      call(callString)(params).then((result) => callback(JSON.parse(result)))
    })
  }

  uiUpdate () {
    const { getProduct, getProductHistory } = this.actions
    const { address } = this.state

    if (address) {
      getProduct(address)
      getProductHistory(address)
    }

    setTimeout(() => this.uiUpdate(), 1000) // hack for now
  }

  uiProductList () {
    const { product } = this.state

    return (
      <div>
        <h1 className='f1 lh-copy'>{product.name}</h1>

        <img src={product.image_url} className='br4 h5 w5 dib' style={{ objectFit: 'cover' }} />

        <p className='lh-copy pv1'>Description: {product.description}</p>

        <p className='lh-copy pv1'>Price: {product.price}</p>
      </div>
    )
  }

  uiHistory () {
    const { productHistory } = this.state

    if (productHistory.Ok.items) {
      return productHistory.Ok.items.map((item) => (
        <pre key={item.meta.address} className='pa3 bg-light-gray f7 pre'>{JSON.stringify(item, null, 2)}</pre>
      ))
    }
    return null
  }

  render () {
    const { updateProduct } = this.actions
    const { product, productHistory } = this.state
    return (
      <main>
        <section>
          {product ? this.uiProductList() : ''}

          <h1 className='f3 lh-copy'>Edit product</h1>

          <CreateProductForm submit={updateProduct} product={product} />

          <h1 className='f3 lh-copy'>History</h1>

          {productHistory ? <div className='measure'>{this.uiHistory()}</div> : ''}

        </section>
      </main>
    )
  }
}

export default ProductListScreen
