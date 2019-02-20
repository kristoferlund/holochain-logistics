import { CreateProductForm } from '../CreateProductForm'
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
      products: {}
    }

    this.actions = {

      getAllProducts: () => {
        this.makeHolochainCall('events-goer-4000/event/get_all_products', {}, (result) => {
          console.log('retrieved all products', result)
          const products = result.Ok.map(({ address, entry }) => {
            return {
              id: address,
              name: entry.name,
              description: entry.description,
              image_url: entry.image_url,
              price: entry.price
            }
          })
          this.setState({
            products
          })
        })
      },

      createProduct: options => {
        const product = {
          name: options.name,
          description: options.description,
          image_url: options.image_url,
          price: parseInt(options.price)
        }
        this.makeHolochainCall('events-goer-4000/event/create_product', product, (result) => {
          console.log('created product', result)
          this.actions.getAllProducts()
        })
      }

    }
  }

  componentDidMount () {
    this.uiUpdate()
  }

  makeHolochainCall (callString, params, callback) {
    this.state.holochainConnection.then(({ call }) => {
      call(callString)(params).then((result) => callback(JSON.parse(result)))
    })
  }

  uiUpdate () {
    const { getAllProducts } = this.actions

    getAllProducts()

    setTimeout(() => this.uiUpdate(), 1000) // hack for now
  }

  uiProductList () {
    const { products } = this.state
    if (products.length > 0) {
      return (
        <table className='collapse ba br2 b--black-10 pv2 ph3'>
          <tbody>
            {
              products.map((product) => {
                return (
                  <tr className='striped--light-gray' key={product.id}>
                    <td className='pv2 ph3'><img src={product.image_url} className='br4 h3 w3 dib' style={{ objectFit: 'cover' }} /></td>
                    <td className='pv2 ph3'><a href={`/product?address=${product.id}`}>{product.name}</a></td>
                    <td className='pv2 ph3'>{product.description}</td>
                    <td className='pv2 ph3'>{product.price}</td>
                    <td className='pv2 ph3' width='24'><svg width='24' height='24'><path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' /><path d='M0 0h24v24H0z' fill='none' /></svg></td>
                    <td className='pv2 ph3' width='24'><svg width='24' height='24'><path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' /><path d='M0 0h24v24H0z' fill='none' /></svg></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )
    } else {
      return <div>No products yet.</div>
    }
  }

  render () {
    const { createProduct } = this.actions
    return (
      <main>
        <section>
          <h1 className='f1 lh-copy'>Products</h1>

          {this.uiProductList()}

          <h1 className='f3 lh-copy'>Create product</h1>

          <CreateProductForm submit={createProduct} />
        </section>
      </main>
    )
  }
}

export default ProductListScreen
