import { Button, H, P } from '../styles/styledHtml'

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
        <H.h1>{product.name}</H.h1>

        <P.std>
          <Button.icon
            onClick={() => {
              loadProduct(address)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z"
                style={{ fill: '#FFF' }}
              />
            </svg>
          </Button.icon>
        </P.std>
        <ProductView />

        <H.h3>Edit product</H.h3>
        <ProductCreateForm
          submit={options => {
            submitForm(options)
          }}
          product={product}
        />

        <H.h3>History</H.h3>
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
            <P.std>Loading product…</P.std>
          )}
        </section>
      </main>
    )
  }
}

export default ScreensProduct
