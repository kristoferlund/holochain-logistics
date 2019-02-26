import React, { useGlobal } from 'reactn'

import { P } from '../../styles/styledHtml'

export const ProductView = () => {
  const [product] = useGlobal('product')

  return (
    <>
      <img
        src={product.image_url}
        className="br4 h5 w5 dib"
        style={{ objectFit: 'cover' }}
        alt="product"
      />

      <P.std>Description: {product.description}</P.std>

      <P.std>Price: {product.price}</P.std>
    </>
  )
}
