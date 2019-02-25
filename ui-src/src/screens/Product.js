import { ProductCreateForm } from '../components/product/CreateForm'
import { ProductHistory } from '../components/product/History'
import { ProductView } from '../components/product/View'
import React from 'reactn'

import _ from 'lodash'
import { hcProductUpdate } from '../holochain/product'
import { loadProduct } from '../state/product'
import queryString from 'query-string'

function submitForm(options) {
  const product = {
    product_address: options.address,
    name: options.name,
    description: options.description,
    image_url: options.image_url,
    price: parseInt(options.price)
  }
  hcProductUpdate(product)
}

class ScreensProduct extends React.Component {
  constructor(props) {
    super(props)
    const values = queryString.parse(props.location.search)

    this.state = {
      address: values.address
    }
  }

  componentDidMount() {
    const { address } = this.state

    loadProduct(address)
  }

  uiProduct() {
    const { address } = this.state
    const { product } = this.global

    return (
      <>
        <h1 className="f1 lh-copy">{product.name}</h1>

        <p>
          <button
            onClick={() => {
              loadProduct(address)
            }}
          >
            Update
          </button>
        </p>

        <ProductView />

        <h1 className="f3 lh-copy">Edit product</h1>
        <ProductCreateForm
          submit={options => {
            submitForm(options)
          }}
          product={product}
        />

        <h1 className="f3 lh-copy">History</h1>
        <ProductHistory />
      </>
    )
  }

  render() {
    const { address } = this.state
    const { product } = this.global

    return (
      <main>
        <section>
          {!_.isEmpty(product) && product.address === address ? (
            this.uiProduct()
          ) : (
            <p>Loading product…</p>
          )}
        </section>
      </main>
    )
  }
}

export default ScreensProduct
