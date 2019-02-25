import React, { useGlobal } from 'reactn'

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

      <p className="lh-copy pv1">Description: {product.description}</p>

      <p className="lh-copy pv1">Price: {product.price}</p>
    </>
  )
}
